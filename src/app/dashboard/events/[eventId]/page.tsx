import FormCardSkeleton from '@/components/form-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import EventViewPage from '@/features/events/components/event-view-page';

export const metadata = {
  title: 'Dashboard : Event View'
};

type PageProps = { params: Promise<{ eventId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex-1 space-y-4'>
        <Suspense fallback={<FormCardSkeleton />}>
          <EventViewPage eventId={params.eventId} />
        </Suspense>
      </div>
    </PageContainer>
  );
}
