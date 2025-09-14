'use client';

import { ColumnDef } from '@tanstack/react-table';

import { User } from '@/types/school-index';
import { UserManagementCellAction } from './cell-action';
import { formatDate } from '@/lib/format';

export const userManagementColumns: ColumnDef<User>[] = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'address', header: 'Address' },
  { accessorKey: 'birth_date', header: 'Birth Date' },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ row }) => {
      const roles = row.original.roles;
      return (
        <div className='text-green-400 capitalize'>
          {roles?.length ? roles[0].name : 'No Role'}
        </div>
      );
    }
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
