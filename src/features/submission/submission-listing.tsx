import { searchParamsCache } from '@/lib/searchparams';
import { Assignments } from '@/types/school-index';
import { getAssignments } from '@/services/assignment.services';
import { SubmissionTable } from './components/submission-tables';
import { submissionColumns } from './components/submission-tables/columns';
type SubmissionListingPage = {};

export default async function SubmissionListingPage({}: SubmissionListingPage) {
  // Showcasing the use of search params cache in nested RSCs
  const page = searchParamsCache.get('page');
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage');
  const categories = searchParamsCache.get('category');

  const filters = {
    page,
    limit: pageLimit,
    ...(search && { search }),
    ...(categories && { categories: categories })
  };

  const assignments: Assignments[] = await getAssignments();

  return (
    <SubmissionTable
      data={assignments}
      totalItems={assignments.length}
      columns={submissionColumns}
    />
  );
}
