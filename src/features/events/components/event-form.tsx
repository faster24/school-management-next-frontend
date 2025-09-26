'use client';

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
import { formatDate } from '@/lib/utils';
import { createEvent, updateEvent } from '@/services/event.services';
import { Events, CreateEvent } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    title: z.string(),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters.'
    }),
    file: z
        .any()
        .nullable()
        .refine((file) => !file || file.size <= 2_000_000, {
            message: 'File size must be less than 2MB'
        }),
    start_date: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Assignment date should be in the format YYYY-MM-DD'
    }),
    end_date: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Due date should be in the format YYYY-MM-DD'
    })
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

    const defaultValues: FormValues = {
        title: initialData?.title || '',
        description: initialData?.description || '',
        start_date: extractDate(initialData?.start_date),
        end_date: extractDate(initialData?.end_date),
        file: null
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    async function onSubmit(values: FormValues) {
        try {
            let isSuccess = false;

            const submittedStartDate = values.start_date || extractDate(initialData?.start_date) || '';
            const submittedEndDate = values.end_date || extractDate(initialData?.end_date) || '';

            const eventData: CreateEvent = {
                title: values.title,
                description: values.description,
                start_date: submittedStartDate,
                end_date: submittedEndDate,
                file: values.file
            };

            if (isEdit) {
                // Update Logic
                isSuccess = await updateEvent({
                    id: initialData!.id,
                    event: eventData
                });
            } else {
                // Create Logic
                isSuccess = await createEvent(eventData);
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
                                    <FormItem>
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
                                                text='Select event start date'
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
                                                text='Select event end date'
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
                        <Button type='submit' className='cursor-pointer'>
                            {isEdit ? 'Update' : 'Create'} Event
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
