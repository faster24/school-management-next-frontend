import { searchParamsCache } from '@/lib/searchparams';
import { assignmentColumns } from './assignment-tables/columns';
import { Subjects } from '@/types/school-index';
import { AssignmentTable } from './assignment-tables';
import { getSubjects } from '@/services/subject.services';
type AssignmentsListingPage = {};

export default async function AssignmentsListingPage({}: AssignmentsListingPage) {
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

  const subjects: Subjects[] = await getSubjects();

  return (
    <AssignmentTable
      data={subjects}
      totalItems={subjects.length}
      columns={assignmentColumns}
    />
  );
}
