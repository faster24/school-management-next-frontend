import { apiRequest } from '@/lib/apiRequest';
import { EventCategory } from '@/types/school-index';

export const getEventCategories = async (): Promise<EventCategory[]> => {
    const res = await apiRequest({
        method: 'get',
        url: '/event/categories',
        server: false
    });

    return res.data;
};

