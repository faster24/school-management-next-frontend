import { notFound } from 'next/navigation';
import { Labs } from '@/types/school-index';
import LabForm from './lab-form';
import { getLabById } from '@/services/lab.services';

type LabViewPageProps = {
  labId: string;
};

export default async function LabViewPage({ labId }: LabViewPageProps) {
  let subjects: Labs | null = null;
  let pageTitle = 'Create New Lab';

  if (labId !== 'new') {
    const data = await getLabById(Number(labId));
    subjects = data;
    if (!subjects) {
      notFound();
    }
    pageTitle = `Edit Lab`;
  }

  return <LabForm initialData={subjects} pageTitle={pageTitle} />;
}
