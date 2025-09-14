export type Subjects = {
  id: number;
  name: string;
  code: string;
  year_id: string;
  teacher_id: string;
  description: string;
  is_active: number;
  createdAt: string;
  updatedAt: string;
};

export type Teachers = {
  id: number;
  name: string;
  email: string;
};

export type CreateSubject = {
  name: string;
  code: string;
  description: string;
  is_active: number;
};

export type Years = {
  id: number;
  name: string;
  is_active: number;
  createdAt: string;
  updatedAt: string;
};

export type Assignments = {
  id: number;
  assignment_category_id: number;
  subject_id: number;
  teacher_id: number;
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
  assignment_category_id: number;
  subject_id: number;
  teacher_id: number;
  title: string;
  description: string;
  assignment_date: string;
  due_date: string;
  given_marks: string;
  file?: File | null;
};

export type Events = {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  file?: File[];
};

export type CreateEvent = {
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  file?: File[];
};

export type Labs = {
  id: number;
  name: string;
  description: string;
  file?: File[];
};

export type CreateLab = {
  name: string;
  description: string;
  file?: File[];
};

export type Category = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export type Timetable = {
  id: number;
  year_id: number;
  name: string;
  description: string;
  year: Years;
  file?: File[];
  created_at: string;
  updated_at: string;
};

export type CreateTimetable = {
  year_id: number;
  name: string;
  description: string;
  file?: File[];
};

export type Data = {
  value: string;
  label: string;
};
