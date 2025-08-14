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
