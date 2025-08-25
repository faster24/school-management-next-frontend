import { apiRequest } from '@/lib/apiRequest';
import { Years } from '@/types/school-index';

export const getYears = async (): Promise<Years[]> => {
  const res = await apiRequest({
    method: 'get',
    url: '/years'
  });
  return res.data;
};
