import { searchParamsCache } from '@/lib/searchparams';
import { subjectColumns } from './subject-tables/columns';
import { SubjectTable } from './subject-tables';
import { Subjects } from '@/types/school-index';
import { getSubjects, getTeacherSubjects } from '@/services/subject.services';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

type SubjectListingPage = {};

export default async function SubjectListingPage({ }: SubjectListingPage) {
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

    let subjects: Subjects[] = [];

    if (session.role === 'admin') {
        subjects = await getSubjects();
    } else {
        subjects = await getTeacherSubjects(session.id);
    }

    return (
        <SubjectTable
            data={subjects}
            totalItems={subjects.length}
            columns={subjectColumns}
        />
    );
}
