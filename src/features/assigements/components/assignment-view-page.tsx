import { notFound } from 'next/navigation';
import { Assignments } from '@/types/school-index';
import AssignmentForm from './assignment-form';
import { getAssignmentById } from '@/services/assignment.services';

type TAssignmentsViewPageProps = {
  assignmentId: string;
};

export default async function AssignmentsViewPage({
  assignmentId
}: TAssignmentsViewPageProps) {
  let subjects: Assignments | null = null;
  let pageTitle = 'Create New Assignment';

  if (assignmentId !== 'new') {
    const data = await getAssignmentById(Number(assignmentId));
    subjects = data;
    if (!subjects) {
      notFound();
    }
    pageTitle = `Edit Assignment`;
  }

  return <AssignmentForm initialData={subjects} pageTitle={pageTitle} />;
}
