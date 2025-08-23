import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import AssignmentsViewPage from '@/features/assigements/components/assignment-view-page';

export const metadata = {
  title: 'Dashboard : Assignment View'
};

type PageProps = { params: Promise<{ assignmentId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <AssignmentsViewPage assignmentId={params.assignmentId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
