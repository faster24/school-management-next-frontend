import { searchParamsCache } from '@/lib/searchparams';
import { timetableColumns } from './timetable-tables/columns';
import { TimetableTable } from './timetable-tables';
import { Timetable } from '@/types/school-index';
import { getTimetables } from '@/services/timetable.services';
type TimetableListingPage = {};

export default async function TimetableListingPage({ }: TimetableListingPage) {
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('name');
    const pageLimit = searchParamsCache.get('perPage');

    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
    };

    const timetable: Timetable[] = await getTimetables(filters);

    return (
        <TimetableTable
            data={timetable}
            totalItems={timetable.length}
            columns={timetableColumns}
        />
    );
}
