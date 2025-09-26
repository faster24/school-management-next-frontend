import { apiRequest } from '@/lib/apiRequest';
import { CreateUser, User } from '@/types/school-index';

interface UserFilters {
    page?: string | null;
    limit?: string | null;
    search?: string | null;
}

export const getUsers = async (filters: UserFilters = {}): Promise<User[]> => {
    const params: Record<string, string> = {};

    for (const [key, value] of Object.entries(filters)) {
        if (value === null || value === undefined || value === '') {
            continue;
        }

        const paramKey = key === 'search' ? 'keyword' : key;
        params[paramKey] = String(value);
    }

    const res = await apiRequest({
        method: 'get',
        url: '/users',
        params: params,
        server: true
    });

    return res.data.data;
};

export const createUser = async (user: CreateUser): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: '/users',
        data: user,
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};

export const getUserById = async (id: number): Promise<User> => {
    const res = await apiRequest({
        method: 'get',
        url: `/users/${id}`,
        server: true
    });
    return res.data;
};

export const editUser = async ({
    user,
    id
}: {
    user: CreateUser;
    id: number;
}): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: `/users/${id}`,
        data: user,
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};

export const deleteUser = async (id: number): Promise<boolean> => {
    const res = await apiRequest({
        method: 'delete',
        url: `/users/${id}`,
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};

export const updateUserPassword = async ({
    passwordData,
    id
}: {
    passwordData: {
        newPassword: string;
        confirmPassword: string;
    };
    id: number;
}): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: `/users/${id}/change-password`,
        data: passwordData,
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};
