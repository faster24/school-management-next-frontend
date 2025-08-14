import { notFound } from 'next/navigation';
import SubjectForm from './subject-form';
import { Subjects } from '@/types/school-index';
import { getSubjectById } from '@/services/subject.services';

type TSubjectViewPageProps = {
  subjectId: string;
};

export default async function SubjectViewPage({
  subjectId
}: TSubjectViewPageProps) {
  let subjects: Subjects | null = null;
  let pageTitle = 'Create New Subject';

  if (subjectId !== 'new') {
    const data = await getSubjectById(Number(subjectId));
    subjects = data;
    if (!subjects) {
      notFound();
    }
    pageTitle = `Edit Subject`;
  }

  return <SubjectForm initialData={subjects} pageTitle={pageTitle} />;
}
