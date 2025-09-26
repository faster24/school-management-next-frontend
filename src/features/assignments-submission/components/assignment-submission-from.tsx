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
    total_mark: z.number(),
    mark_in_percentage: z.number(),
    remark: z.string({ message: 'Remark is required.' })
});

export default function AssignmentSubmissionForm({
    initialData,
    pageTitle
}: {
    initialData: AssignmentSubmission | null;
    pageTitle: string;
}) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const isEdit = !!initialData;

    console.log('initial data >> ', initialData)

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
            total_mark: values.total_mark
        };
        try {
            if (isEdit) {
                const res = await updateAssigmentSubmission(data, initialData.id);
                if (res) {
                    form.reset();
                    router.push('/dashboard/assignments-submission');
                }
            }
        } catch (error) {
            console.log(error);
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
                                name='total_mark'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Mark</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='Total mark'
                                                {...field}
                                                type='text'
                                                value={field.value ?? ''}
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
                                                type='text'
                                                {...field}
                                                value={field.value ?? ''}
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
                                            <Input type='text' placeholder='Given marks' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button type='submit' className='cursor-pointer'>
                            {isEdit ? 'Update' : 'Create'} Assignment
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CategoryModal isOpen={open} onClose={() => setOpen(false)} />
        </Card>
    );
}
