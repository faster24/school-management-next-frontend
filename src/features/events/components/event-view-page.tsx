import { notFound } from 'next/navigation';
import { Events } from '@/types/school-index';
import EventForm from './event-form';
import { getEventById } from '@/services/event.services';

type EventViewPageProps = {
  eventId: string;
};

export default async function EventViewPage({ eventId }: EventViewPageProps) {
  let event: Events | null = null;
  let pageTitle = 'Create New Event';

  if (eventId !== 'new') {
    const data = await getEventById(Number(eventId));
    event = data;
    if (!event) {
      notFound();
    }
    pageTitle = `Edit Event`;
  }

  return <EventForm initialData={event} pageTitle={pageTitle} />;
}
