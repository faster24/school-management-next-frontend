'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Input } from './ui/input';
import { createCategory } from '@/services/assignment.services';
import { useRouter } from 'next/navigation';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CategoryModal: React.FC<CategoryModalProps> = ({
    isOpen,
    onClose
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!categoryName) {
            setError('Category name is required.');
            return;
        }
        setError('');

        const isSuccess = await createCategory(categoryName);

        if (isSuccess) {
            // NEW: Clear the input field for good UX
            setCategoryName('');

            // This call triggers the parent's handleModalClose, which re-fetches the data
            onClose();

            // Optionally, you might force a router refresh if the category data is 
            // used elsewhere on the dashboard, but re-fetching state is enough for the Combobox.
            // router.refresh(); 
        }
    };

    return (
        <Modal
            title='Add New Category'
            description='Create a new category.'
            isOpen={isOpen}
            onClose={onClose}
        >
            <form
                className='flex w-full flex-col gap-6 space-x-2 pt-2'
                onSubmit={onSubmit}
            >
                <div>
                    <Input
                        type='text'
                        placeholder='Category name...'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                    {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
                </div>
                <Button type='submit'>Add Category</Button>
            </form>
        </Modal>
    );
};
