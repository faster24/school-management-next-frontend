export type Subjects = {
  id: number;
  name: string;
  code: string;
  description: string;
  is_active: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateSubject = {
  name: string;
  code: string;
  description: string;
  is_active: number;
};

export type Assignments = {
  id: number;
  assignment_category_id: string;
  subject_id: string;
  teacher_id: string;
  title: string;
  description: string;
  assignment_date: string;
  due_date: string;
  given_marks: string;
  file?: File | null;
  updated_at: string;
  created_at: string;
};

export type CreateAssignment = {
  assignment_category_id: string;
  subject_id: string;
  teacher_id: string;
  title: string;
  description: string;
  assignment_date: string;
  due_date: string;
  given_marks: string;
  file?: File | null;
};
