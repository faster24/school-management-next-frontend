import { searchParamsCache } from '@/lib/searchparams';
import { assignmentColumns } from '@/features/assigements/components/assignment-tables/columns';
import { Assignments, Events } from '@/types/school-index';
import { getAssignments } from '@/services/assignment.services';
import { EventTable } from './event-tables';
import { eventColumns } from './event-tables/columns';
import { getEvents } from '@/services/event.services';

export default async function EventListingPage() {
    // Showcasing the use of search params cache in nested RSCs
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('title');
    const pageLimit = searchParamsCache.get('perPage');

    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
    };

    const events: Events[] = await getEvents(filters);

    return (
        <EventTable
            data={events}
            totalItems={events.length}
            columns={eventColumns}
        />
    );
}
