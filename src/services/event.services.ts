import { apiRequest } from '@/lib/apiRequest';
import { CreateEvent, Events } from '@/types/school-index';

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

export const getEvents = async (): Promise<Events[]> => {
  const res = await apiRequest({
    method: 'get',
    url: '/events',
    server: true
  });
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
