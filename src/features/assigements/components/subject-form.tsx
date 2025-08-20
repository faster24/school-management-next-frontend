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
import { createSubject, editSubject } from '@/services/subject.services';
import { Subjects } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Subject name must be at least 2 characters.'
  }),
  code: z.string().min(2, {
    message: 'Subject code must be at least 2 characters.'
  }),
  is_active: z.string().transform(Number),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  })
});

export default function AssignmentForm({
  initialData,
  pageTitle
}: {
  initialData: Subjects | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const defaultValues = {
    name: initialData?.name || '',
    code: initialData?.code || '',
    is_active: initialData?.is_active || 0,
    description: initialData?.description || ''
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (initialData) {
      const isSuccess = await editSubject({
        id: initialData.id,
        subject: values
      });
      if (isSuccess) {
        form.reset();
        router.push('/subjects');
      }
    } else {
      const isSuccess = await createSubject(values);
      if (isSuccess) {
        form.reset();
        router.push('/subjects');
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
                name='is_active'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Active</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        step='1'
                        placeholder='1 is active, 0 is inactive'
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
            <Button type='submit'>Add Subject</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
