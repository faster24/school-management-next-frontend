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
    total_marks?: string;
    file?: File | null;
    is_submitted?: boolean;
    updated_at: string;
    created_at: string;
    submissions: Submission[];
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
    category_id: number;
    start_date: string;
    end_date: string;
    file?: File[];
};

export type EventCategory = {
    id: number;
    name: string;
}

export type CreateEvent = {
    title: string;
    description: string;
    category_id: number;
    start_date: string;
    end_date: string;
    file?: File[];
};

export type UpdateEvent = {
    id: number;
    event: CreateEvent;
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

export type UpdateLab = {
    id: number;
    lab: CreateLab;
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

export type Submission = {
    assignment_id: number;
    student_id: number;
    file?: File[];
};

export type User = {
    id: number;
    name: string;
    email: string;
    phone: string;
    qualification: string | null;
    birth_date: string | null;
    address: string | null;
    image_url: string | null;
    enrollment_id: number | null;
    roles: Role[];
    created_at: string;
    year_id: number;
    student_year: any;
};

export type CreateUser = {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    confirm_password?: string;
    qualification: string | null;
    birth_date: string | null;
    address: string | null;
    user_image: string | null;
    enrollment_id?: number | null;
    role: string;
    year_id: number | null;
};

export type Role = {
    id: number;
    name: string;
};

export type Student = {
    id: number;
    name: string;
};

export type AssignmentSubmission = {
    id: number;
    assignment_id: number;
    student_id: number;
    file?: File[];
    total_mark: number;
    mark_in_percentage: number;
    graded_by: number;
    remark: string;
    submitted_at: string;
    created_at: string;
    updated_at: string;
    assignment: Assignments;
    student: Student;
    isSubmitted?: boolean;
};

export type UpdateAssigmentSubmission = {
    id: number;
    total_mark: number;
    mark_in_percentage: number;
    remark: string;
};

export type Stats = {
    students: number;
    teachers: number;
    total_users: number;
    subjects: number;
    events: number;
}
