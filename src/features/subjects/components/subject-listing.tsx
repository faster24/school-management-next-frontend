import { searchParamsCache } from '@/lib/searchparams';
import { subjectColumns } from './subject-tables/columns';
import { SubjectTable } from './subject-tables';
import { Subjects } from '@/types/school-index';
import { getSubjects } from '@/services/subject.services';
type SubjectListingPage = {};

export default async function SubjectListingPage({}: SubjectListingPage) {
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
    <SubjectTable
      data={subjects}
      totalItems={subjects.length}
      columns={subjectColumns}
    />
  );
}
