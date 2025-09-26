import { searchParamsCache } from '@/lib/searchparams';
import { Labs } from '@/types/school-index';
import { LabTable } from './lab-tables';
import { labColumns } from './lab-tables/columns';
import { getLabs } from '@/services/lab.services';

export default async function LabListingPage() {
    // Showcasing the use of search params cache in nested RSCs
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('name');
    const pageLimit = searchParamsCache.get('perPage');

    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
    };

    const labs: Labs[] = await getLabs();

    return <LabTable data={labs} totalItems={labs.length} columns={labColumns} />;
}
