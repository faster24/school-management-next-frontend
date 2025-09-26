import { apiRequest } from '@/lib/apiRequest';
import { Stats } from '@/types/school-index';

export const getStats = async (): Promise<Stats> => {
    const res = await apiRequest({
        method: 'get',
        url: `/stats`,
        server: true
    });

    return {
        students: res.students,
        teachers: res.teachers,
        total_users: res.total_users,
        subjects: res.subjects,
        events: res.events,
    };
};

