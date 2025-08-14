import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import SubjectViewPage from '@/features/subjects/components/subject-view-page';

export const metadata = {
  title: 'Dashboard : Subject View'
};

type PageProps = { params: Promise<{ subjectId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <SubjectViewPage subjectId={params.subjectId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
