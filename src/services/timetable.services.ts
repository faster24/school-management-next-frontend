import { apiRequest } from '@/lib/apiRequest';
import { CreateTimetable, Timetable } from '@/types/school-index';

interface GetTimetablesParams {
    search?: string;
    page?: number;
    perPage?: number;
}

export const getTimetables = async ({
    search,
    page,
    perPage,
}: GetTimetablesParams = {}): Promise<Timetable[]> => {
    const queryParams = new URLSearchParams();

    if (search) queryParams.append("search", search);
    if (page) queryParams.append("page", page.toString());
    if (perPage) queryParams.append("perPage", perPage.toString());

    console.log('query', queryParams.toString())

    const res = await apiRequest({
        method: "get",
        url: `/timetables?${queryParams.toString()}`,
        server: true,
    });

    return res.data;
};

export const createTimetable = async (
    timetable: CreateTimetable
): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: '/timetables',
        data: timetable,
        headers: { 'Content-Type': 'multipart/form-data' },
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};

export const getTimetableById = async (id: number): Promise<Timetable> => {
    const res = await apiRequest({
        method: 'get',
        url: `/timetables/${id}`,
        server: true
    });
    return res;
};

export const editTimetable = async ({
    timetable,
    id
}: {
    timetable: CreateTimetable;
    id: number;
}): Promise<boolean> => {
    const res = await apiRequest({
        method: 'post',
        url: `/timetables/${id}`,
        data: timetable,
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};

export const deleteTimetable = async (id: number): Promise<boolean> => {
    const res = await apiRequest({
        method: 'delete',
        url: `/timetables/${id}`,
        server: false
    });
    if (res) {
        return true;
    }
    return false;
};
