'use client';

import { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import * as z from 'zod';

import { getAssignmentById } from '@/services/submission.services';
import { createSubmission } from '@/services/submission.services';
import { Assignments } from '@/types/school-index';
import { DatePicker } from '@/components/date-picker';
import { formatDate } from '@/lib/format';
import { Label } from '@/components/ui/label';

const formSchema = z.object({
  submitted_at: z.string().min(1, { message: 'Submission date is required' }),
  file: z
    .any()
    .nullable()
    .refine((file) => !file || file.size <= 2_000_000, {
      message: 'File size must be less than 2MB'
    })
});

export default function SubmissionForm({
  assgnmentId,
  pageTitle,
  studentId
}: {
  assgnmentId: string;
  pageTitle: string;
  studentId: number;
}) {
  const router = useRouter();

  const defaultValues = {
    assignment_id: '',
    file: null,
    submitted_at: ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const [assignment, setAssignment] = useState<Assignments | null>(null);

  useEffect(() => {
    async function fetchAssignment() {
      if (assgnmentId) {
        try {
          const res = await getAssignmentById(Number(assgnmentId));
          setAssignment(res);
        } catch (error) {
          console.error('Failed to fetch assignment:', error);
        }
      }
    }
    fetchAssignment();
  }, [assgnmentId]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      assignment_id: Number(assgnmentId),
      file: values.file,
      submitted_at: values.submitted_at,
      student_id: studentId
    };
    const isSuccess = await createSubmission(data);
    if (isSuccess) {
      form.reset();
      router.push('/dashboard/submission');
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
              {/* Assignment */}
              <div className='grid w-full items-center gap-3'>
                <Label htmlFor='email'>Assignmen</Label>
                <Input
                  type='text'
                  id='text'
                  placeholder='Assignment'
                  value={assignment?.title ?? ''}
                  readOnly
                />
              </div>

              {/* Submitted At */}
              <FormField
                control={form.control}
                name='submitted_at'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submitted At</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value ? new Date(field.value) : undefined}
                        onDateChange={(date) =>
                          field.onChange(formatDate(date))
                        }
                        text='Select date'
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
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' disabled={!assignment}>
              Submit Assignment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
