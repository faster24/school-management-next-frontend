import { notFound } from 'next/navigation';
import { Submission } from '@/types/school-index';
import SubmissionForm from './submission-form';
import { getSubmissionById } from '@/services/submission.services';

type TSubmissionViewPageProps = {
  submissionId: string;
};

export default async function SubmissionViewPage({
    submissionId
}: TSubmissionViewPageProps) {
  let submission: Submission | null = null;
  let pageTitle = 'Submission';

  if (submissionId !== 'new') {
    const data = await getSubmissionById(Number(submission));
    submission = data;
    if (!submission) {
      notFound();
    }
    pageTitle = `Edit Submission`;
  }

  return <SubmissionForm initialData={submission} pageTitle={pageTitle} />;
}
