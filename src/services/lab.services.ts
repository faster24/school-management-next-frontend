import { apiRequest } from '@/lib/apiRequest';
import { CreateLab, Labs } from '@/types/school-index';

export const getLabs = async (): Promise<Labs[]> => {
  const res = await apiRequest({
    method: 'get',
    url: '/labs',
    server: true
  });
  return res.data.data;
};

export const createLab = async (lab: CreateLab): Promise<boolean> => {
  const res = await apiRequest({
    method: 'post',
    url: '/labs',
    data: lab,
    server: false,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  if (res) {
    return true;
  }
  return false;
};

export const getLabById = async (id: number): Promise<Labs> => {
  const res = await apiRequest({
    method: 'get',
    url: `/labs/${id}`,
    server: true
  });
  return res.data;
};

export const deleteLabById = async (id: number): Promise<boolean> => {
  const res = await apiRequest({
    method: 'delete',
    url: `/labs/${id}`,
    server: false
  });
  if (res) {
    return true;
  }
  return false;
};
