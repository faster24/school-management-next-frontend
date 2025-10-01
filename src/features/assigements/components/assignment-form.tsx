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
import { createAssignment, getCategory } from '@/services/assignment.services';
import { getClientSubjects, getClientTeacherSubjects } from '@/services/subject.services';
import { Assignments, Category, Subjects } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    title: z.string().min(2, { message: 'Assignment title must be at least 2 characters.' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
    assignment_date: z.string({ message: 'Assignment date is required.' }),
    due_date: z.string({ message: 'Due date is required.' }),
    given_marks: z.string().min(1, { message: 'Given marks must be at least 1 character.' }),
    file: z.any().nullable(),
    assignment_category_id: z.number(),
    subject_id: z.number()
});

export default function AssignmentForm({
    initialData,
    pageTitle
}: {
    initialData: Assignments | null;
    pageTitle: string;
}) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [subjects, setSubjects] = useState<Subjects[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [open, setOpen] = useState(false);

    const formatSubjects = formatIds(subjects);
    const formatCategories = formatIds(categories);

    const isEdit = !!initialData;
    const defaultValues = {
        title: initialData?.title || '',
        description: initialData?.description || '',
        assignment_date: initialData?.assignment_date || '',
        due_date: initialData?.due_date || '',
        given_marks: initialData?.given_marks || '',
        file: initialData?.file || null,
        assignment_category_id: initialData?.assignment_category_id || 0,
        subject_id: initialData?.subject_id || 0
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (!session) return; // safety check

            const data = {
                ...values,
                teacher_id: session.id
            };

            let isSuccess = false;
            if (isEdit) {
                // Logic for editing assignment will go here
            } else {
                isSuccess = await createAssignment(data);
            }

            if (isSuccess) {
                form.reset();
                router.push('/dashboard/assignments');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
        }
    }

    // NEW: Reusable function to fetch categories
    const fetchCategories = async () => {
        try {
            const fetchedCategories = await getCategory();
            setCategories(fetchedCategories);
        } catch (err) {
            console.error('Failed to fetch categories', err);
        }
    };

    // NEW: Handler for closing the modal and re-fetching categories
    const handleModalClose = () => {
        setOpen(false);
        // Re-fetch categories to update the combobox immediately
        fetchCategories();
    };

    useEffect(() => {
        if (status === 'loading') return;
        if (!session) return;

        const fetchData = async () => {
            try {
                let fetchedSubjects: Subjects[] = [];
                if (session.role === 'teacher') {
                    fetchedSubjects = await getClientTeacherSubjects(session.id);
                } else {
                    fetchedSubjects = await getClientSubjects();
                }

                // Initial fetch uses the new reusable function
                await fetchCategories();
                setSubjects(fetchedSubjects);
            } catch (err) {
                console.error('Failed to fetch subjects or categories', err);
            }
        };

        fetchData();
    }, [session, status]);


    return (
        <Card className='mx-auto w-full'>
            <CardHeader>
                <CardTitle className='text-left text-2xl font-bold'>{pageTitle}</CardTitle>
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
                                        <FormLabel>Assignment Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Title' {...field} />
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
                                            <Input placeholder='Description' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='assignment_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assignment Date</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value ? new Date(field.value) : undefined}
                                                onDateChange={(date) => field.onChange(formatDate(date))}
                                                text='Select assignment date'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='due_date'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Due Date</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                date={field.value ? new Date(field.value) : undefined}
                                                onDateChange={(date) => field.onChange(formatDate(date))}
                                                text='Select due date'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='given_marks'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Given Marks</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder='Given marks' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='subject_id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Subject</FormLabel>
                                        <FormControl>
                                            <Combobox
                                                value={String(field.value)}
                                                onChange={(value) => field.onChange(Number(value))}
                                                data={formatSubjects}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='assignment_category_id'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Assignment Category</FormLabel>
                                        <FormControl>
                                            <div>
                                                <Combobox
                                                    value={String(field.value)}
                                                    onChange={(value) => field.onChange(Number(value))}
                                                    data={formatCategories}
                                                />
                                                <Button
                                                    variant='secondary'
                                                    size='sm'
                                                    type='button'
                                                    className='mt-2 text-sm'
                                                    onClick={() => setOpen(true)}
                                                >
                                                    Add New Category
                                                </Button>
                                            </div>
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
                                            onChange={(e) => field.onChange(e.target.files?.[0])}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type='submit'>{isEdit ? 'Update' : 'Create'} Assignment</Button>
                    </form>
                </Form>
            </CardContent>
            {/* UPDATED: Passing handleModalClose to trigger re-fetch on close */}
            <CategoryModal isOpen={open} onClose={handleModalClose} />
        </Card>
    );
}
