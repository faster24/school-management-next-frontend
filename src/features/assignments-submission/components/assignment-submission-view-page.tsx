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
    const submission = await getAssignmentSubmissionsById(Number(assignmentId));
    let pageTitle = 'Update Submission';

    if (assignmentId !== 'new') {
        const submission = await getAssignmentSubmissionsById(Number(assignmentId));

        if (!submission) {
            notFound();
        }
    }

    return (
        <AssignmentSubmissionForm initialData={submission} pageTitle={pageTitle} />
    );
}
