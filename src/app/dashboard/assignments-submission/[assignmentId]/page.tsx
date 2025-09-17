import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import AssignmentSubmissionViewPage from '@/features/assignments-submission/components/assignment-submission-view-page';

export const metadata = {
  title: 'Dashboard : Assignment Submission'
};

type PageProps = { params: Promise<{ assignmentId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <AssignmentSubmissionViewPage assignmentId={params.assignmentId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
