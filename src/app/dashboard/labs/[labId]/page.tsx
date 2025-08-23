import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import SubjectViewPage from '@/features/subjects/components/subject-view-page';
import LabViewPage from '@/features/labs/components/lab-view-page';

export const metadata = {
  title: 'Dashboard : Lab View'
};

type PageProps = { params: Promise<{ labId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <LabViewPage labId={params.labId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
