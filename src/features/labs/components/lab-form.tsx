'use client';

import { createLab, updateLab } from '@/services/lab.services';
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
    file: z
        .any()
        .refine((file) => !file || file.size <= 2_000_000, {
            message: "File size must be less than 2MB",
        })
        .refine(
            (file) =>
                !file ||
                ["application/pdf",
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ].includes(file.type),
            {
                message: "Only PDF or DOCX files are allowed",
            }
        ),
});

type FormValues = z.infer<typeof formSchema>;

export default function LabForm({
    initialData,
    pageTitle
}: {
    initialData: Labs | null;
    pageTitle: string;
}) {
    const router = useRouter();
    const isEdit = !!initialData;

    const defaultValues: FormValues = {
        name: initialData?.name || '',
        description: initialData?.description || '',
        file: initialData?.file || null
    };

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        values: defaultValues
    });

    async function onSubmit(values: FormValues) {
        try {
            let isSuccess = false;

            if (isEdit) {
                isSuccess = await updateLab({
                    id: initialData!.id,
                    lab: values
                });
            } else {
                isSuccess = await createLab(values);
            }

            if (isSuccess) {
                form.reset(defaultValues);
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
                        <Button type='submit' className='cursor-pointer'>
                            {isEdit ? 'Update' : 'Create'} Lab
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
