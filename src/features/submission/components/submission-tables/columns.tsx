'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Assignments } from '@/types/school-index';
import { SubmissionCellAction } from './cell-action';
import { SubmissionStatus } from '../submission-status';

export const submissionColumns: ColumnDef<Assignments>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'assignment_date', header: 'Assignment Date' },
  { accessorKey: 'due_date', header: 'Due Date' },
  { accessorKey: 'given_marks', header: 'Given Marks' },
  {
    accessorKey: 'Status',
    header: 'Status',
    cell: ({ row }) => (
      <SubmissionStatus
        assignmentId={row.original.id}
        submittedAssignments={row.original.submissions.map(
          (submission) => submission.assignment_id
        )}
      />
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <SubmissionCellAction
        data={row.original}
        submittedAssignments={row.original.submissions.map(
          (submission) => submission.assignment_id
        )}
      />
    )
  }
];
