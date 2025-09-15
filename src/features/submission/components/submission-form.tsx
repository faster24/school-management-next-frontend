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
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import * as z from 'zod';

import { getAssignmentById } from '@/services/submission.services';
import { createSubmission, editSubmission } from '@/services/submission.services';
import { getUsers } from '@/services/user.services';
import { Assignments, Submission, User } from '@/types/school-index';

const formSchema = z.object({
  assignment_id: z.string().min(1, { message: 'Assignment is required' }),
  student_id: z.string().min(1, { message: 'Student is required' }),
  submitted_at: z.string().min(1, { message: 'Submission date is required' }),
  total_mark: z
    .string()
    .min(1, { message: 'Total mark is required' }),
  mark_in_percentage: z
    .string()
    .min(1, { message: 'Percentage is required' }),
  graded_by: z.string().min(1, { message: 'Grader is required' }),
  remark: z.string().optional()
});

export default function SubmissionForm({
  initialData,
  pageTitle
}: {
  initialData: Submission | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const assignmentIdFromQuery = searchParams.get('assignment_id');
  const isEdit = !!initialData;

  const defaultValues = {
    assignment_id: initialData?.assignment_id?.toString() || assignmentIdFromQuery || '',
    student_id: initialData?.student_id?.toString() || '',
    submitted_at: initialData?.submitted_at || '',
    total_mark: initialData?.total_mark?.toString() || '',
    mark_in_percentage: initialData?.mark_in_percentage?.toString() || '',
    graded_by: initialData?.graded_by?.toString() || '',
    remark: initialData?.remark || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const [assignment, setAssignment] = useState<Assignments | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchAssignment() {
      if (assignmentIdFromQuery) {
        try {
          const res = await getAssignmentById(Number(assignmentIdFromQuery));
                    console.log(res);
          setAssignment(res);
        } catch (error) {
          console.error('Failed to fetch assignment:', error);
        }
      }
    }

    async function fetchUsers() {
      try {
        const res = await getUsers();
        setUsers(res);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    }

    fetchAssignment();
    fetchUsers();
  }, [assignmentIdFromQuery]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit) {
      const isSuccess = await editSubmission({
        id: initialData!.id,
        submission: values
      });
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/submissions');
      }
    } else {
      const isSuccess = await createSubmission(values);
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/submissions');
      }
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Assignment */}
              <FormField
                control={form.control}
                name="assignment_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assignment</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full rounded border p-2" disabled>
                        <option value="">
                          {assignment ? assignment.title : 'Loading...'}
                        </option>
                        {assignment && (
                          <option value={assignment.id}>{assignment.title}</option>
                        )}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Student */}
              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full rounded border p-2">
                        <option value="">Select a student</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submitted At */}
              <FormField
                control={form.control}
                name="submitted_at"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Submitted At</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Total Mark */}
              <FormField
                control={form.control}
                name="total_mark"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Mark</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Percentage */}
              <FormField
                control={form.control}
                name="mark_in_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mark in %</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Graded By */}
              <FormField
                control={form.control}
                name="graded_by"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Graded By</FormLabel>
                    <FormControl>
                      <select {...field} className="w-full rounded border p-2">
                        <option value="">Select grader</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Remark */}
            <FormField
              control={form.control}
              name="remark"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remark</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter remarks"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={!assignment}>
              {isEdit ? 'Update' : 'Create'} Submission
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
