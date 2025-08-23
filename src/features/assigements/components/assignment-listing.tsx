import { searchParamsCache } from '@/lib/searchparams';
import { assignmentColumns } from './assignment-tables/columns';
import { Subjects, Assignments } from '@/types/school-index';
import { AssignmentTable } from './assignment-tables';
import { getSubjects } from '@/services/subject.services';
import { getAssignments } from '@/services/assignment.services';
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

  // const assignments: Assignments[] = [
  //   {
  //     id: 1,
  //     assignment_category_id: '1',
  //     subject_id: '1',
  //     teacher_id: '1',
  //     title: 'Maths',
  //     description: 'Maths',
  //     assignment_date: '2021-01-01',
  //     due_date: '2021-01-01',
  //     given_marks: '10',
  //     file: 'file',
  //     updated_at: '2021-01-01',
  //     created_at: '2021-01-01'
  //   },
  //   {
  //     id: 2,
  //     assignment_category_id: '1',
  //     subject_id: '1',
  //     teacher_id: '1',
  //     title: 'Maths',
  //     description: 'Maths',
  //     assignment_date: '2021-01-01',
  //     due_date: '2021-01-01',
  //     file: 'file',
  //     given_marks: '10',
  //     updated_at: '2021-01-01',
  //     created_at: '2021-01-01'
  //   }
  // ];

  const assignments: Assignments[] = await getAssignments();

  return (
    <AssignmentTable
      data={assignments}
      totalItems={assignments.length}
      columns={assignmentColumns}
    />
  );
}
