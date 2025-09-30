'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Assignments } from '@/types/school-index';
import { SubmissionCellAction } from './cell-action';

export const submissionColumns: ColumnDef<Assignments>[] = [
    { accessorKey: 'title', header: 'Title' },
    { accessorKey: 'description', header: 'Description' },
    { accessorKey: 'assignment_date', header: 'Assignment Date' },
    { accessorKey: 'due_date', header: 'Due Date' },
    { accessorKey: 'given_marks', header: 'Given Marks' },
    {
        id: 'Submit',
        cell: ({ row }) => (
            <SubmissionCellAction
                data={row.original}
            />
        )
    }
];
