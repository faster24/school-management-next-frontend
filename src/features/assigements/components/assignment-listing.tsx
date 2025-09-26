import { searchParamsCache } from '@/lib/searchparams';
import { assignmentColumns } from './assignment-tables/columns';
import { Subjects, Assignments } from '@/types/school-index';
import { AssignmentTable } from './assignment-tables';
import { getSubjects } from '@/services/subject.services';
import { getAssignments, getAssignmentsByTeacherId, getAssignmentsByStudentId } from '@/services/assignment.services';
type AssignmentsListingPage = {};
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

export default async function AssignmentsListingPage({ }: AssignmentsListingPage) {

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
        <AssignmentTable
            data={assignments}
            totalItems={assignments.length}
            columns={assignmentColumns}
        />
    );
}
