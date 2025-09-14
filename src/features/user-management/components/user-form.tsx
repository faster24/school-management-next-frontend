'use client';

import { useState, useEffect } from 'react';
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
import { getYears } from '@/services/year.services';
import { Years, User, CreateUser } from '@/types/school-index';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createUser, editUser } from '@/services/user.services';
import { DatePicker } from '@/components/date-picker';
import { formatDate } from '@/lib/utils';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Subject name must be at least 2 characters.'
  }),
  phone: z.string().min(2, {
    message: 'Phone number must be at least 2 characters.'
  }),
  email: z.string().email({
    message: 'Email must be a valid email.'
  }),
  password: z.string().optional(),
  confirm_password: z.string().optional(),
  quallification: z.string().nullable(),
  birth_date: z.string({
    message: 'Birth date is required.'
  }),
  address: z.string().nullable(),
  user_image: z.any().nullable(),
  role: z.string().min(2, {
    message: 'Role must be at least 2 characters.'
  }),
  year_id: z.number().nullable()
});

export default function UserForm({
  initialData,
  pageTitle
}: {
  initialData: User | null;
  pageTitle: string;
}) {
  const router = useRouter();
  const isEdit = !!initialData;

  const defaultValues = {
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    password: '',
    confirm_password: '',
    quallification: initialData?.qualification || '',
    birth_date: initialData?.birth_date || '',
    address: initialData?.address || '',
    user_image: initialData?.image_url || null,
    role: initialData?.roles[0]?.name || '',
    year_id: initialData?.year_id || 0
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    values: defaultValues
  });

  const [years, setYears] = useState<Years[]>([]);

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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data: CreateUser = {
      name: values.name,
      email: values.email ?? '',
      phone: values.phone ?? '',
      password: values.password ?? '',
      confirm_password: values.confirm_password ?? '',
      qualification: values.quallification ?? '',
      birth_date: values.birth_date ?? '',
      address: values.address,
      user_image: values.user_image,
      role: values.role,
      year_id: values.year_id
    };
    if (isEdit) {
      const isSuccess = await editUser({
        id: initialData.id,
        user: data
      });
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/user-management');
      }
    } else {
      const isSuccess = await createUser(data);
      if (isSuccess) {
        form.reset();
        router.push('/dashboard/user-management');
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
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter user name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter user phone'
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
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter user email'
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
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter user password'
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
                name='confirm_password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Confirm user password'
                        className='resize-none'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* ✅ Updated Birth Date field with DatePicker */}
              <FormField
                control={form.control}
                name='birth_date'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Birth Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        date={field.value ? new Date(field.value) : undefined}
                        onDateChange={(date) => field.onChange(formatDate(date))}
                        text='Select birth date'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='address'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter user address'
                        className='resize-none'
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='user_image'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Image</FormLabel>
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
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <select {...field} className='w-full rounded border p-2'>
                        <option value=''>Select a role</option>
                        <option value='student'>Student</option>
                        <option value='teacher'>Teacher</option>
                        <option value='admin'>Admin</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
              <FormField
                control={form.control}
                name='quallification'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quallification</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter user quallification'
                        className='resize-none'
                        {...field}
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormDescription>
                      This input is optional for student.
                    </FormDescription>
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
                    <FormDescription>
                      This input is optional for teacher and admin.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type='submit' disabled={years.length === 0}>
              {isEdit ? 'Update' : 'Create'} User
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
