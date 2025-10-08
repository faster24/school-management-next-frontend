import { apiRequest } from '@/lib/apiRequest';
import {
    Assignments,
    AssignmentSubmission,
    Submission,
    UpdateAssigmentSubmission
} from '@/types/school-index';

//Student submission
export const submitAssignment = async (
    assignment: Submission
): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: '/submissions',
        data: assignment,
        server: false
    });
    return !!res; // Simplified boolean conversion
};

export const getSubmissionById = async (id: number): Promise<Submission> => {
    const res = await apiRequest({
        method: 'get',
        url: `/submissions/${id}`,
        server: true
    });
    return res; // Changed from res.data
};

export const getAssignmentById = async (id: number): Promise<Assignments> => {
    const res = await apiRequest({
        method: 'get',
        url: `/assignments/${id}`,
        server: false
    });
    return res.data; // Changed from res.data
};

export const createSubmission = async (v: FormData): Promise<Submission> => {
    const res = await apiRequest({
        method: 'post',
        url: '/submissions',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: v,
        server: false
    });
    return res.data;
};

export const getAssignmentSubmissions = async (id: any): Promise<
    AssignmentSubmission[]
> => {
    const res = await apiRequest({
        method: 'get',
        url: `/submissions?teacher_id=${id}`,
        server: true
    });
    return res.data.data;
};

export const getAssignmentSubmissionsById = async (
    id: number
): Promise<AssignmentSubmission> => {
    const res = await apiRequest({
        method: 'get',
        url: `/submissions/${id}`,
        server: true
    });
    return res.data;
};

//Here the PUT and DELETE method need to fix or something
export const updateAssigmentSubmission = async (
    v: UpdateAssigmentSubmission, id: number
): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: `/submissions/${id}`,
        data: v,
        server: false
    });

    if (res.success) {
        return true;
    }
    return false;
};

export const deleteSubmission = async (id: number): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: `/submissions/${id}`,
        server: false
    });
    if (res.success) {
        return true;
    }
    return false;
};
