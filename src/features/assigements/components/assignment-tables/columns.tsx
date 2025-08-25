'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { AssignmentCellAction } from './cell-action';
import { Assignments } from '@/types/school-index';
import { Column } from '@tanstack/react-table';
import { Text } from 'lucide-react';

export const assignmentColumns: ColumnDef<Assignments>[] = [
    {
        id: 'title',
        accessorKey: 'title',
        header: ({ column }: { column: Column<Assignments, unknown> }) => (
            <DataTableColumnHeader column={column} title='Title' />
        ),
        cell: ({ cell }) => <div>{cell.getValue<Assignments['title']>()}</div>,
        meta: {
            label: 'Title',
            placeholder: 'Search assignments...',
            variant: 'text',
            icon: Text
        },
        enableColumnFilter: true
    },
    { accessorKey: 'assignment_category.name', header: 'Category' },
    { accessorKey: 'subject.name', header: 'Subject' },
    { accessorKey: 'teacher.name', header: 'Teacher' },
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
        accessorKey: 'assignment_date',
        header: 'Assignment Date'
    },
    {
        accessorKey: 'due_date',
        header: 'Due Date'
    },
    {
        accessorKey: 'given_marks',
        header: 'Given Marks'
    },
    {
        id: 'actions',
        cell: ({ row }) => <AssignmentCellAction data={row.original} />
    }
];
