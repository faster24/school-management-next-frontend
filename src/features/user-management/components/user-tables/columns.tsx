'use client';

import { ColumnDef } from '@tanstack/react-table';

import { User } from '@/types/school-index';
import { UserManagementCellAction } from './cell-action';
import { formatDate } from '@/lib/format';

export const userManagementColumns: ColumnDef<User>[] = [
    { accessorKey: 'name', header: 'Name', id: 'name', enableColumnFilter: true },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'address', header: 'Address' },
    { accessorKey: 'birth_date', header: 'Birth Date' },
    {
        id: 'role',
        header: 'Role',
        enableColumnFilter: true,
        meta: {
            variant: 'select',
            label: 'Role',
            options: [
                { label: 'Admin', value: 'admin' },
                { label: 'Student', value: 'student' },
                { label: 'Teacher', value: 'teacher' },
            ],
        },
        cell: ({ row }) => row.original.roles?.[0]?.name ?? 'No Role',
    },
    {
        accessorKey: 'created_at',
        header: 'Created at',
        cell: ({ cell }) => (
            <div
                className='max-w-sm truncate'
                title={cell.getValue<User['created_at']>()}
            >
                {formatDate(cell.getValue<User['created_at']>())}
            </div>
        )
    },
    {
        id: 'actions',
        cell: ({ row }) => <UserManagementCellAction data={row.original} />
    }
];
