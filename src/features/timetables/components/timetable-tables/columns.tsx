'use client';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { ColumnDef } from '@tanstack/react-table';
import { TimetableCellAction } from './cell-action';
import { Column } from '@tanstack/react-table';
import { Text } from 'lucide-react';
import { Timetable } from '@/types/school-index';

export const timetableColumns: ColumnDef<Timetable>[] = [
    {
        id: 'name',
        accessorKey: 'name',
        header: ({ column }: { column: Column<Timetable, unknown> }) => (
            <DataTableColumnHeader column={column} title='Name' />
        ),
        cell: ({ cell }) => <div>{cell.getValue<Timetable['name']>()}</div>,
        meta: {
            label: 'Name',
            placeholder: 'Search timetable...',
            variant: 'text',
            icon: Text
        },
        enableColumnFilter: true
    },
    { accessorKey: 'year.name', header: 'Year' },
    {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ cell }) => (
            <div
                className='max-w-sm truncate'
                title={cell.getValue<Timetable['description']>()}
            >
                {cell.getValue<Timetable['description']>()}
            </div>
        )
    },
    {
        accessorKey: 'file',
        header: 'File'
    },
    {
        id: 'actions',
        cell: ({ row }) => <TimetableCellAction data={row.original} />
    }
];
