import { apiRequest } from '@/lib/apiRequest';
import {
    Assignments,
    Category,
    CreateAssignment,
    Submission
} from '@/types/school-index';

export const getAssignments = async (): Promise<Assignments[]> => {
    const res = await apiRequest({
        method: 'get',
        url: '/assignments',
        server: true
    });
    return res.data; // Changed from res.data
};

export const getAssignmentsByTeacherId = async (id: number): Promise<Assignments[]> => {
    const res = await apiRequest({
        method: 'get',
        url: `/assignments/${id}/teacher`,
        server: true
    });
    return res.data; // Changed from res.data
};

export const getAssignmentsByStudentId = async (id: number): Promise<Assignments[]> => {
    const res = await apiRequest({
        method: 'get',
        url: `/assignments/${id}/student`,
        server: true
    });

    console.log("submission data >> ", res.data)

    return res.data; // Changed from res.data
};

export const createAssignment = async (
    assignment: CreateAssignment
): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: '/assignments',
        data: assignment,
        server: false,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return !!res; // Simplified boolean conversion
};

export const getAssignmentById = async (id: number): Promise<Assignments> => {
    const res = await apiRequest({
        method: 'get',
        url: `/assignments/${id}`,
        server: true
    });
    return res; // Changed from res.data
};

export const createCategory = async (name: string): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: '/assignment-categories',
        data: { name },
        server: false
    });
    return !!res; // Simplified boolean conversion
};

export const getCategory = async (): Promise<Category[]> => {
    const res = await apiRequest({
        method: 'get',
        url: '/assignment-categories',
        server: false
    });
    return res.data; // Changed from res.data
};

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
