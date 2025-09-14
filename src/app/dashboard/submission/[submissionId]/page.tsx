import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import SubmissionViewPage from '@/features/submission/components/submission-view-page';

export const metadata = {
  title: 'Dashboard : Submission View'
};

type PageProps = { params: Promise<{ submissionId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <SubmissionViewPage submissionId={params.submissionId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
