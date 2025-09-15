import { searchParamsCache } from '@/lib/searchparams';
import { assignmentColumns } from '@/features/assigements/components/assignment-tables/columns';
import {
  Subjects,
  Assignments,
  AssignmentSubmission
} from '@/types/school-index';
import { assignmentSubmissionColumns } from './assignment-tables/columns';
import { AssignmentSubmissionTable } from './assignment-tables';
import { getAssignmentSubmissions } from '@/services/submission.services';

type AssignmentSubmissionListingPage = {};

export default async function AssignmentSubmissionListingPage({}: AssignmentSubmissionListingPage) {
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

  const assignmentsSubmission: AssignmentSubmission[] =
    await getAssignmentSubmissions();

  return (
    <AssignmentSubmissionTable
      data={assignmentsSubmission}
      totalItems={assignmentsSubmission.length}
      columns={assignmentSubmissionColumns}
    />
  );
}
