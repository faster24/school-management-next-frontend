'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Assignments, Events } from '@/types/school-index';
import { Column } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { EventCellAction } from './cell-action';

export const eventColumns: ColumnDef<Events>[] = [
  {
    id: 'title',
    accessorKey: 'title',
    header: ({ column }: { column: Column<Events, unknown> }) => (
      <DataTableColumnHeader column={column} title='Title' />
    ),
    cell: ({ cell }) => <div>{cell.getValue<Assignments['title']>()}</div>,
    meta: {
      label: 'Title',
      placeholder: 'Search events...',
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
    accessorKey: 'start_date',
    header: 'Start Date',
    cell: ({ cell }) => (
      <div
        className='max-w-sm truncate'
        title={cell.getValue<Events['start_date']>()}
      >
        {cell.getValue<Events['start_date']>().split(' ')[0]}
      </div>
    )
  },
  {
    accessorKey: 'end_date',
    header: 'End Date',
    cell: ({ cell }) => (
      <div
        className='max-w-sm truncate'
        title={cell.getValue<Events['end_date']>()}
      >
        {cell.getValue<Events['end_date']>().split(' ')[0]}
      </div>
    )
  },
  {
    id: 'actions',
    cell: ({ row }) => <EventCellAction data={row.original} />
  }
];
