'use client';

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
import { createLab } from '@/services/lab.services';
import { Labs } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Lab name must be at least 2 characters.'
  }),
  description: z.string().min(10, {
    message: 'Description must be at least 10 characters.'
  }),
  file: z.any().nullable()
});

export default function LabForm({
  initialData,
  pageTitle
}: {
  initialData: Labs | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const isEdit = !!initialData;
  const defaultValues = {
    name: initialData?.name || '',
    description: initialData?.description || '',
    file: initialData?.file || null
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
        isSuccess = await createLab(values);
      }
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/labs');
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lab name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter lab name' {...field} />
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
                    <FormLabel>Lab Description</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter lab description' {...field} />
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
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='cursor-pointer'>
              {isEdit ? 'Update' : 'Create'} Lab
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
