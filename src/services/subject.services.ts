import { apiRequest } from '@/lib/apiRequest';
import { CreateSubject, Subjects } from '@/types/school-index';

interface GetSubjectParams {
    search?: string;
    page?: number;
    perPage?: number;
}

export const getSubjects = async ({
    search,
    page,
    perPage,
}: GetSubjectParams = {}): Promise<Subjects[]> => {

    const queryParams = new URLSearchParams();

    if (search) queryParams.append("search", search);
    if (page) queryParams.append("page", page.toString());
    if (perPage) queryParams.append("perPage", perPage.toString());

    const res = await apiRequest({
        method: 'get',
        url: `/subjects?${queryParams.toString()}`,
        server: true
    });
    return res.data.data;
};

export const getTeacherSubjects = async (id: number): Promise<Subjects[]> => {
    const res = await apiRequest({
        method: 'get',
        url: `/teacher-subjects/${id}`,
        server: true
    });
    return res.data;
};

export const getClientTeacherSubjects = async (id: number): Promise<Subjects[]> => {
    const res = await apiRequest({
        method: 'get',
        url: `/teacher-subjects/${id}`,
        server: false
    });
    return res.data;
};

export const getClientSubjects = async (): Promise<Subjects[]> => {
    const res = await apiRequest({
        method: 'get',
        url: '/subjects',
        server: false
    });
    return res.data;
};

export const createSubject = async (
    subject: CreateSubject
): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: '/subjects',
        data: subject,
        server: false
    });
    if (res.data) {
        return true;
    }
    return false;
};

export const getSubjectById = async (id: number): Promise<Subjects> => {
    const res = await apiRequest({
        method: 'get',
        url: `/subjects/${id}`,
        server: true
    });
    return res.data;
};

export const editSubject = async ({
    subject,
    id
}: {
    subject: CreateSubject;
    id: number;
}): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: `/subjects/${id}`,
        data: subject,
        server: false
    });
    if (res.data) {
        return true;
    }
    return false;
};

export const deleteSubject = async (id: number): Promise<boolean> => {
    const res = await apiRequest({
        method: 'delete',
        url: `/subjects/${id}`
    });

    if (res.data) {
        return true;
    }
    return false;
};
