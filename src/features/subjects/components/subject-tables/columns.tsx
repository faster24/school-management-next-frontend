'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { SubjectCellAction } from './cell-action';
import { Subjects } from '@/types/school-index';
import { Column } from '@tanstack/react-table';
import { Text } from 'lucide-react';

export const subjectColumns: ColumnDef<Subjects>[] = [
    {
        id: 'name',
        accessorKey: 'name',
        cell: ({ cell }) => <div>{cell.getValue<Subjects['name']>()}</div>,
        meta: {
            label: 'Name',
            placeholder: 'Search subjects...',
            variant: 'text',
            icon: Text
        },
        enableColumnFilter: true
    },
    {
        accessorKey: 'code',
        header: 'Code'
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ cell }) => (
            <div
                className='max-w-sm truncate'
                title={cell.getValue<Subjects['description']>()}
            >
                {cell.getValue<Subjects['description']>()}
            </div>
        )
    },
    {
        accessorKey: 'is_active',
        header: 'Is active'
    },
    {
        id: 'actions',
        cell: ({ row }) => <SubjectCellAction data={row.original} />
    }
];
