import { apiRequest } from '@/lib/apiRequest';
import { Assignments, Category, CreateAssignment } from '@/types/school-index';

export const getAssignments = async (): Promise<Assignments[]> => {
    const res = await apiRequest({
        method: 'get',
        url: '/assignments',
        server: true
    });
    return res; // Changed from res.data
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
