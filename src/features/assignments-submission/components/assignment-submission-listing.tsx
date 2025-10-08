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
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

type AssignmentSubmissionListingPage = {};

export default async function AssignmentSubmissionListingPage({ }: AssignmentSubmissionListingPage) {
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('name');
    const pageLimit = searchParamsCache.get('perPage');
    const session = await getServerSession(authOptions) ?? null;

    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
    };

    const assignmentsSubmission: AssignmentSubmission[] = await getAssignmentSubmissions(session?.id || null);

    return (
        <AssignmentSubmissionTable
            data={assignmentsSubmission}
            totalItems={assignmentsSubmission.length}
            columns={assignmentSubmissionColumns}
        />
    );
}
