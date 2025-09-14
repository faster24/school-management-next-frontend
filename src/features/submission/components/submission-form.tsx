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
import { createSubject, editSubject } from '@/services/subject.services';
import { getTeachers } from '@/services/teacher.services';
import { getYears } from '@/services/year.services';
import { Subjects, Years, Teachers } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Subject name must be at least 2 characters.' }),
  code: z
    .string()
    .min(2, { message: 'Subject code must be at least 2 characters.' }),
  year_id: z.string().min(1, {
    message: 'Please select a year.'
  }),
  teacher_id: z.string().min(1, {
    message: 'Please select a teacher.'
  }),
  is_active: z.number(),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters.' })
});

export default function SubmissionForm({
  initialData,
  pageTitle
}: {
  initialData: Subjects | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const defaultValues = {
    name: initialData?.name || '',
    code: initialData?.code || '',
    is_active: initialData?.is_active || 0,
    year_id: initialData?.year_id || '',
    teacher_id: initialData?.teacher_id || '',
    description: initialData?.description || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const [years, setYears] = useState<Years[]>([]);
  const [teachers, setTeachers] = useState<Teachers[]>([]);

  useEffect(() => {
    async function fetchYears() {
      try {
        const res = await getYears();
        setYears(res);
      } catch (error) {
        console.error('Failed to fetch years:', error);
      }
    }

    async function fetchTeacher() {
      try {
        const res = await getTeachers();
        setTeachers(res);
      } catch (error) {
        console.error('Failed to fetch years:', error);
      }
    }

    fetchYears();
    fetchTeacher();
  }, []);

  console.log(teachers);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (isEdit) {
      const isSuccess = await editSubject({
        id: initialData.id,
        subject: values
      });
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/subjects');
      }
    } else {
      const isSuccess = await createSubject(values);
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/subjects');
      }
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter subject name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='code'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject Code</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter subject code' {...field} />
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
                      <select {...field} className='w-full rounded border p-2'>
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
                name='teacher_id'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Teacher</FormLabel>
                    <FormControl>
                      <select {...field} className='w-full rounded border p-2'>
                        <option value=''>Select a teacher</option>
                        {teachers.map((teacher) => (
                          <option key={teacher.id} value={teacher.id}>
                            {teacher.name}
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
                name='is_active'
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-4'>
                    <FormLabel>Is Active</FormLabel>
                    <FormControl>
                      <input
                        type='checkbox'
                        checked={field.value === 1}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? 1 : 0)
                        }
                        className='h-5 w-5 rounded border-gray-300'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder='Enter subject description'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' disabled={years.length === 0}>
              {isEdit ? 'Update' : 'Create'} Subject
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
