'use client';

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
import { Textarea } from '@/components/ui/textarea';
import { createTimetable, editTimetable } from '@/services/timetable.services';
import { getYears } from '@/services/year.services';
import { Timetable, Years } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    name: z
        .string()
        .min(2, { message: 'Timeatable name must be at least 2 characters.' }),
    year_id: z.number(),
    description: z.string().min(10, {
        message: 'Description must be at least 10 characters.'
    }),
    file: z
        .any()
        .nullable()
        .refine((file) => !file || file.size <= 2_000_000, {
            message: 'File size must be less than 2MB'
        })
});

export default function TimetableForm({
    initialData,
    pageTitle
}: {
    initialData: Timetable | null;
    pageTitle: string;
}) {
    const router = useRouter();
    const isEdit = !!initialData;
    const [years, setYears] = useState<Years[]>([]);

    const defaultValues = {
        name: initialData?.name || '',
        year_id: initialData?.year_id || 0,
        description: initialData?.description || '',
        file: initialData?.file || null
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (isEdit) {
            const isSuccess = await editTimetable({
                id: initialData.id,
                timetable: values
            });
            if (isSuccess) {
                form.reset();
                router.push('/dashboard/timetables');
            }
        } else {
            const isSuccess = await createTimetable(values);
            if (isSuccess) {
                form.reset();
                router.push('/dashboard/timetables');
            }
        }
    }

    useEffect(() => {
        async function fetchYears() {
            try {
                const res = await getYears();
                setYears(res);
            } catch (error) {
                console.error('Failed to fetch years:', error);
            }
        }

        fetchYears();
    }, []);

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
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Enter Title' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='year_id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Year</FormLabel>
                                        <FormControl>
                                            <select
                                                {...field}
                                                value={field.value ?? ''}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                                className='w-full rounded border p-2'
                                            >
                                                <option value=''>Select a year</option>
                                                {years.map((year) => (
                                                    <option key={year.id} value={year.id}>
                                                        {year.name}
                                                    </option>
                                                ))}
                                            </select>
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
                                            <Textarea
                                                placeholder='Description'
                                                className='resize-none'
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                                                className='h-full'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button type='submit'>
                            {isEdit ? 'Update' : 'Create'} Timetable
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
