'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { AssignmentCellAction } from '@/features/assigements/components/assignment-tables/cell-action';
import { Assignments, Labs } from '@/types/school-index';
import { Column } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { LabCellAction } from './cell-action';

export const labColumns: ColumnDef<Labs>[] = [
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }: { column: Column<Labs, unknown> }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        cell: ({ cell }) => <div>{cell.getValue<Labs['name']>()}</div>,
        meta: {
            label: 'Name',
            placeholder: 'Search Labs...',
            variant: 'text',
            icon: Text
        },
        enableColumnFilter: true
    },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ cell }) => (
            <div
                className='max-w-sm truncate'
                title={cell.getValue<Assignments['description']>()}
            >
                {cell.getValue<Assignments['description']>()}
            </div>
        )
    },
    {
        accessorKey: 'file',
        header: 'File'
    },
    {
        id: 'actions',
        cell: ({ row }) => <LabCellAction data={row.original} />
    }
];
