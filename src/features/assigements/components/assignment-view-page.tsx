import { notFound } from 'next/navigation';
import { Assignments, Subjects } from '@/types/school-index';
import { getSubjectById } from '@/services/subject.services';
import AssignmentForm from './assignment-form';

type TAssignmentsViewPageProps = {
  assignmentId: string;
};

export default async function AssignmentsViewPage({
  assignmentId
}: TAssignmentsViewPageProps) {
  let subjects: Assignments | null = null;
  let pageTitle = 'Create New Assignment';

  if (assignmentId !== 'new') {
    // const data = await getSubjectById(Number(assignmentId));
    subjects = null;
    if (!subjects) {
      notFound();
    }
    pageTitle = `Edit Assignment`;
  }

  return <AssignmentForm initialData={subjects} pageTitle={pageTitle} />;
}
