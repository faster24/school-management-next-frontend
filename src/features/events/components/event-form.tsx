'use client';

import { DatePicker } from '@/components/date-picker';
import { FileUploader } from '@/components/file-uploader';
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
import { createEvent } from '@/services/event.services';
import { Events } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object(
    {
        title: z.string(), description: z.string().min(10, {
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

export default function EventForm({
    initialData,
    pageTitle
}: {
    initialData: Events | null;
    pageTitle: string;
}) {
    const router = useRouter();
    const isEdit = !!initialData;
    const defaultValues = {
        title: initialData?.title || '',
        description: initialData?.description || '',
        start_date: initialData?.start_date || '',
        end_date: initialData?.end_date || '',
        file: null
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            let isSuccess = false;

            if (isEdit) {
                // TODO: implement editAssignment API call
                // isSuccess = await editAssignment(initialData.id, formData);
            } else {
                isSuccess = await createEvent(values);
            }
            if (isSuccess) {
                form.reset();
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
                                            <Input
                                                type='text'
                                                placeholder='Enter event start date - YYYY-MM-DD'
                                                {...field}
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
                                            <Input
                                                type='text'
                                                placeholder='Enter event end date - YYYY-MM-DD'
                                                {...field}
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
