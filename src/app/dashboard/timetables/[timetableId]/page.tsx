import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import TimetableViewPage from '@/features/timetables/components/timetabe-view-page';

export const metadata = {
  title: 'Dashboard : Timetable View'
};

type PageProps = { params: Promise<{ timetableId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <TimetableViewPage timetableId={params.timetableId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
