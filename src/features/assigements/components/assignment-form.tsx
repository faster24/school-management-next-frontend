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
import { createAssignment } from '@/services/assignment.services';
import { Assignments } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Assignment title must be at least 2 characters.'
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  assignment_date: z
    .string()
    .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: 'Assignment date should be in the format YYYY-MM-DD'
    }),
  due_date: z.string().refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
    message: 'Due date should be in the format YYYY-MM-DD'
  }),
  given_marks: z.string().min(1, {
    message: 'Given marks must be at least 1 character.'
  }),
  file: z.any().nullable(),
  assignment_category_id: z.string().min(1, {
    message: 'Assignment category must be at least 1 character.'
  }),
  subject_id: z.string().min(1, {
    message: 'Subject must be at least 1 character.'
  }),
  teacher_id: z.string().min(1, {
    message: 'Teacher must be at least 1 character.'
  })
});

export default function AssignmentForm({
  initialData,
  pageTitle
}: {
  initialData: Assignments | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const isEdit = !!initialData;
  const defaultValues = {
    title: initialData?.title || '',
    description: initialData?.description || '',
    assignment_date: initialData?.assignment_date || '',
    due_date: initialData?.due_date || '',
    given_marks: initialData?.given_marks || '',
    file: initialData?.file || null,
    assignment_category_id: initialData?.assignment_category_id || '',
    subject_id: initialData?.subject_id || '',
    teacher_id: initialData?.teacher_id || ''
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
        isSuccess = await createAssignment(values);
      }
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/assignments');
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
                    <FormLabel>Assignment Title</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter assignment title' {...field} />
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
                      <Input
                        placeholder='Enter assignment description'
                        {...field}
                      />
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
                      <Input
                        type='text'
                        placeholder='Enter assignment date'
                        {...field}
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
                      <Input
                        type='text'
                        placeholder='Enter due date'
                        {...field}
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
                      <Input
                        type='text'
                        placeholder='Enter given marks'
                        {...field}
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
                    <FormLabel>Assignment Category ID</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter assignment category id'
                        {...field}
                      />
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
                    <FormLabel>Subject ID</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter subject id'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='teacher_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher ID</FormLabel>
                    <FormControl>
                      <Input
                        type='text'
                        placeholder='Enter teacher id'
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
                      // accept='.pdf,.doc,.docx,.txt'
                      onChange={(e) => {
                        field.onChange(e.target.files?.[0]); // store the file object in RHF
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='cursor-pointer'>
              {isEdit ? 'Update' : 'Create'} Assignment
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
