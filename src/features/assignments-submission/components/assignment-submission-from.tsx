'use client';

import { CategoryModal } from '@/components/category-modal';
import { Combobox } from '@/components/combo-box';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { formatDate, formatIds } from '@/lib/utils';
import { getCategory } from '@/services/assignment.services';
import { getClientSubjects } from '@/services/subject.services';
import { updateAssigmentSubmission } from '@/services/submission.services';
import {
    AssignmentSubmission,
    Category,
    Subjects,
    UpdateAssigmentSubmission
} from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
    total_mark: z.number().min(0, 'Total mark cannot be negative.'), // Added simple validation
    mark_in_percentage: z.number().min(0).max(100, 'Percentage must be between 0 and 100.'), // Added simple validation
    remark: z.string().min(1, 'Remark is required.')
});

export default function AssignmentSubmissionForm({
    initialData,
    pageTitle
}: {
    initialData: any;
    pageTitle: string;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const isEdit = !!initialData;

    const assignmentMedia = initialData?.media?.[0];

    const fileUrl = assignmentMedia?.original_url;
    console.log('initial', initialData)
    const fileName = assignmentMedia?.file_name;

    const defaultValues = {
        total_mark: initialData?.total_mark ?? 0,
        mark_in_percentage: initialData?.mark_in_percentage ?? 0,
        remark: initialData?.remark ?? ''
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const data: UpdateAssigmentSubmission = {
            id: initialData?.id!,
            mark_in_percentage: values.mark_in_percentage,
            remark: values.remark,
            total_mark: values.total_mark,
            graded_by: session?.user?.id,
        };
        try {
            if (isEdit) {
                const res = await updateAssigmentSubmission(data, initialData.id!);
                if (res) {
                    form.reset(values);
                    router.push('/dashboard/assignments-submission');
                }
            }
        } catch (error) {
            console.error('Submission update error:', error);
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

                            {fileUrl && (
                                <FormItem className='flex flex-col'>
                                    <FormLabel>Assignment File</FormLabel>
                                    <FormControl>
                                        <a
                                            href={fileUrl}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='block w-fit text-blue-600 underline hover:text-blue-800 transition-colors pt-2'
                                        >
                                            {fileName || 'View Attached File'} 📄
                                        </a>
                                    </FormControl>
                                    {/* <FormDescription>Click to view the original assignment file.</FormDescription> */}
                                </FormItem>
                            )}

                            <FormField
                                control={form.control}
                                name='total_mark'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Mark</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Total mark'
                                                {...field}
                                                type='number' // Changed to number input
                                                value={field.value ?? ''}
                                                // Convert string input back to number for RHF
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='mark_in_percentage'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Mark In Percentage</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Mark in percentage'
                                                type='number' // Changed to number input
                                                {...field}
                                                value={field.value ?? ''}
                                                // Convert string input back to number for RHF
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name='remark'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Remark</FormLabel>
                                        <FormControl>
                                            <Input type='text' placeholder='Add remark/feedback' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='cursor-pointer'>
                            {isEdit ? 'Update Grade' : 'Create'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CategoryModal isOpen={open} onClose={() => setOpen(false)} />
        </Card>
    );
}
