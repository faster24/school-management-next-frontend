import { apiRequest } from '@/lib/apiRequest';
import { CreateEvent, Events, UpdateEvent } from '@/types/school-index';

export const createEvent = async (event: CreateEvent): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: '/events',
        data: event,
        server: false,
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    if (res.data) {
        return true;
    }
    return false;
};

export const updateEvent = async ({ id, event }: UpdateEvent): Promise<boolean> => {
    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.description);
    formData.append('start_date', event.start_date);
    formData.append('end_date', event.end_date);

    if (event.file instanceof File) {
        formData.append('file', event.file);
    }

    const res = await apiRequest({
        method: 'post',
        url: `/events/${id}`,
        data: formData,
        server: false,
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (res.data) {
        return true;
    }
    return false;
};

interface GetEventsParams {
    search?: string;
    page?: number;
    perPage?: number;
}

export const getEvents = async ({
    search,
    page,
    perPage,
}: GetEventsParams = {}): Promise<Events[]> => {

    const queryParams = new URLSearchParams();

    if (search) queryParams.append("search", search);
    if (page) queryParams.append("page", page.toString());
    if (perPage) queryParams.append("perPage", perPage.toString());

    const res = await apiRequest({
        method: 'get',
        url: `/events?${queryParams.toString()}`,
        server: true
    });

    console.log('query', `/events?${queryParams.toString()}`)
    return res.data.data;
};

export const getEventById = async (id: number): Promise<Events> => {
    const res = await apiRequest({
        method: 'get',
        url: `/events/${id}`,
        server: true
    });
    return res.data;
};

export const deleteEventById = async (id: number): Promise<boolean> => {
    const res = await apiRequest({
        method: 'delete',
        url: `/events/${id}`,
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};
