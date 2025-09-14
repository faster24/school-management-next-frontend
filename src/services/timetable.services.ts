import { apiRequest } from '@/lib/apiRequest';
import { CreateTimetable, Timetable } from '@/types/school-index';

export const getTimetables = async (): Promise<Timetable[]> => {
  const res = await apiRequest({
    method: 'get',
    url: '/timetables',
    server: true
  });
  return res;
};

export const createTimetable = async (
  timetable: CreateTimetable
): Promise<boolean> => {
  const res = await apiRequest({
    method: 'post',
    url: '/timetables',
    data: timetable,
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
