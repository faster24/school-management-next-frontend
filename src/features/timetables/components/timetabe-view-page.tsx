import { notFound } from 'next/navigation';
import { Timetable } from '@/types/school-index';
import TimetableForm from './timetable-form';
import { getTimetableById } from '@/services/timetable.services';

type TSubjectViewPageProps = {
  timetableId: string;
};

export default async function TimetableViewPage({
  timetableId
}: TSubjectViewPageProps) {
  let timetable: Timetable | null = null;
  let pageTitle = 'Create New Timetable';

  if (timetableId !== 'new') {
    const data = await getTimetableById(Number(timetableId));
    timetable = data;
    if (!timetable) {
      notFound();
    }
    pageTitle = `Edit Timetable`;
  }

  return <TimetableForm initialData={timetable} pageTitle={pageTitle} />;
}
