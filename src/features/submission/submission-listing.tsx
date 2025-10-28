import { searchParamsCache } from '@/lib/searchparams';
import { Assignments } from '@/types/school-index';
import { SubmissionTable } from './components/submission-tables';
import { submissionColumns } from './components/submission-tables/columns';
import { getAssignments, getAssignmentsByTeacherId, getAssignmentsByStudentId } from '@/services/assignment.services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

type SubmissionListingPage = {};
export default async function SubmissionListingPage({ }: SubmissionListingPage) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return <p>You must be logged in to view subjects</p>;
    }
    const page = searchParamsCache.get('page');
    const search = searchParamsCache.get('name');
    const pageLimit = searchParamsCache.get('perPage');

    const filters = {
        page,
        limit: pageLimit,
        ...(search && { search }),
    };

    let assignments: Assignments[] = [];

    if (session.role === 'admin') {
        assignments = await getAssignments();
    } else if (session.role === 'teacher') {
        assignments = await getAssignmentsByTeacherId(session.id);
    }
    else {
        assignments = await getAssignmentsByStudentId(session.id);
    }

    return (
        <SubmissionTable
            data={assignments}
            totalItems={assignments.length}
            columns={submissionColumns}
        />
    );
}
