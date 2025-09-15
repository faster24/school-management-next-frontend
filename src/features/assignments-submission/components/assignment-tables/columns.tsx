'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { AssignmentSubmissionCellAction } from './cell-action';
import { AssignmentSubmission } from '@/types/school-index';

export const assignmentSubmissionColumns: ColumnDef<AssignmentSubmission>[] = [
  { accessorKey: 'assignment.title', header: 'Title' },
  { accessorKey: 'assignment.description', header: 'Description' },
  { accessorKey: 'submitted_at', header: 'Submitted At' },
  { accessorKey: 'student.name', header: 'Student' },
  { accessorKey: 'assignment.given_marks', header: 'Given Marks' },
  { accessorKey: 'total_mark', header: 'Total Marks' },
  {
    id: 'actions',
    cell: ({ row }) => <AssignmentSubmissionCellAction data={row.original} />
  }
];
