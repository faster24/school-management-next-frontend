'use client';

import { CategoryModal } from '@/components/category-modal';
import { Combobox } from '@/components/combo-box';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatDate, formatIds } from '@/lib/utils';
import { createEvent, updateEvent } from '@/services/event.services';
import { getEventCategories } from '@/services/eventCategory.services';
import { Events, CreateEvent, EventCategory } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    title: z.string().min(1, { message: 'Title is required.' }),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters.'
    }),
    category_id: z.number({ invalid_type_error: 'Category is required.' }).min(1, { message: 'Category is required.' }),
    file: z
        .any()
        .nullable()
        .refine((file) => !file || file.size <= 2_000_000, {
            message: 'File size must be less than 2MB'
        }),
    start_date: z.string().min(1, { message: 'Start date is required.' }),
    end_date: z.string().min(1, { message: 'End date is required.' })
});

type FormValues = z.infer<typeof formSchema>;

const extractDate = (dateTimeString: string | undefined | null) => {
    return dateTimeString ? dateTimeString.substring(0, 10) : '';
};

export default function EventForm({
    initialData,
    pageTitle
}: {
    initialData: Events | null;
    pageTitle: string;
}) {
    const router = useRouter();
    const isEdit = !!initialData;

    const [categories, setCategories] = useState<EventCategory[]>([]);
    const [open, setOpen] = useState(false);

    const formatCategories = formatIds(categories);

    const defaultValues: FormValues = {
        title: initialData?.title || '',
        description: initialData?.description || '',
        category_id: initialData?.category_id || 0,
        start_date: extractDate(initialData?.start_date),
        end_date: extractDate(initialData?.end_date),
        file: null
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    const fetchCategories = async () => {
        try {
            const fetchedCategories = await getEventCategories();
            setCategories(fetchedCategories);
        } catch (error) {
            console.error('Failed to fetch event categories:', error);
        }
    };

    const handleModalClose = () => {
        setOpen(false);
        fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    async function onSubmit(values: FormValues) {
        try {
            let isSuccess = false;

            const payload = {
                ...values,
            };

            if (isEdit) {
                isSuccess = await updateEvent({
                    id: initialData!.id,
                    event: payload as unknown as CreateEvent
                });
            } else {
                const createFormData = new FormData();
                createFormData.append('title', payload.title);
                createFormData.append('description', payload.description);
                createFormData.append('category_id', String(payload.category_id));
                createFormData.append('start_date', payload.start_date);
                createFormData.append('end_date', payload.end_date);
                if (payload.file instanceof File) {
                    createFormData.append('file', payload.file);
                }

                isSuccess = await createEvent(createFormData as unknown as CreateEvent);
            }

            if (isSuccess) {
                form.reset(defaultValues);
                router.push('/dashboard/events');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    }

    return (
        <Card className='mx-auto w-full'>
            <CardHeader>
                <CardTitle className='text-left text-2xl font-bold'>
                    {pageTitle}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>

                            <FormField
                                control={form.control}
                                name='category_id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Category</FormLabel>
                                        <FormControl>
                                            <div>
                                                <Combobox
                                                    value={String(field.value)}
                                                    onChange={(value) => field.onChange(Number(value))}
                                                    data={formatCategories}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='title'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter event title' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className='md:col-span-2'>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter event description' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='start_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Start Date</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value ? new Date(field.value) : undefined}
                                                onDateChange={(date) =>
                                                    field.onChange(formatDate(date))
                                                }
                                                text='Start date'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='end_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event End Date</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value ? new Date(field.value) : undefined}
                                                onDateChange={(date) =>
                                                    field.onChange(formatDate(date))
                                                }
                                                text='End date'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name='file'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>File</FormLabel>
                                    <FormControl>
                                        <Input
                                            type='file'
                                            onChange={(e) => {
                                                field.onChange(e.target.files?.[0] ?? null);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            type='submit'
                            className='cursor-pointer'
                            disabled={form.formState.isSubmitting}
                        >
                            {isEdit ? 'Update' : 'Create'} Event
                        </Button>
                    </form>
                </Form>
            </CardContent>

            <CategoryModal isOpen={open} onClose={handleModalClose} />
        </Card>
    );
}
