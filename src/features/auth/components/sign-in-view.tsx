'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/icons';
import { useSearchParams } from 'next/navigation';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';

const formSchema = z.object({
  email: z.string().email({ message: 'Enter a valid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
});

export default function SignInViewPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  async function onSubmit() {
    setIsLoading(true);
    try {
      const res = await signIn('credentials', {
        email: form.getValues('email'),
        password: form.getValues('password'),
        redirect: false
      });
      if (res?.ok) {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className='flex h-screen items-center justify-center'>
      <Card className='w-[400px] p-5'>
        <CardHeader className='space-y-1'>
          <CardTitle className='text-center text-2xl'>Admin Login</CardTitle>
          <CardDescription className='text-center'>
            Enter your credentials to access the dashboard
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-5'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email'
                      {...field}
                      type='email'
                      className='ring-primary/30 border-primary/30 h-10 rounded-lg focus:ring-1!'
                    />
                  </FormControl>
                  <FormDescription>
                    Email should be a valid email address.
                  </FormDescription>
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
                      placeholder='Enter your password'
                      {...field}
                      type='password'
                      className='ring-primary/30 border-primary/30 h-10 rounded-lg focus:ring-1!'
                    />
                  </FormControl>
                  <FormDescription>
                    Password should be at least 6 characters.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' className='bg-primary w-full'>
              {isLoading ? (
                <Icons.spinner className='size-5 animate-spin' />
              ) : (
                <span>Sign In</span>
              )}
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
