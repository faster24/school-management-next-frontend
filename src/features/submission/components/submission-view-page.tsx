import SubmissionForm from './submission-form';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

type TSubmissionViewPageProps = {
  assgnmentId: string;
};

export default async function SubmissionViewPage({
  assgnmentId
}: TSubmissionViewPageProps) {
  const session = await getServerSession(authOptions);
  let pageTitle = 'Submission';

  return (
    <SubmissionForm
      assgnmentId={assgnmentId}
      studentId={session?.id!}
      pageTitle={pageTitle}
    />
  );
}
