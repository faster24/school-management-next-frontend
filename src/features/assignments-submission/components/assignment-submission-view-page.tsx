import { notFound } from 'next/navigation';
import { AssignmentSubmission } from '@/types/school-index';
import AssignmentSubmissionForm from './assignment-submission-from';
import { getAssignmentSubmissionsById } from '@/services/submission.services';

type TAssignmentSubmissionViewPageProps = {
  assignmentId: string;
};

export default async function AssignmentSubmissionViewPage({
  assignmentId
}: TAssignmentSubmissionViewPageProps) {
  let submission: AssignmentSubmission | null = null;
  let pageTitle = 'Update Submission';

  if (assignmentId !== 'new') {
    const data = await getAssignmentSubmissionsById(Number(assignmentId));
    submission = data;
    if (!submission) {
      notFound();
    }
  }

  return (
    <AssignmentSubmissionForm initialData={submission} pageTitle={pageTitle} />
  );
}
