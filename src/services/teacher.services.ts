import { apiRequest } from '@/lib/apiRequest';
import { Teachers } from '@/types/school-index';

export const getTeachers = async (): Promise<Teachers[]> => {
  const res = await apiRequest({
    method: 'get',
    url: '/teachers'
  });
  return res.data;
};
