import { apiRequest } from '@/lib/apiRequest';
import { Assignments, CreateAssignment } from '@/types/school-index';

export const getAssignments = async (): Promise<Assignments[]> => {
  const res = await apiRequest({
    method: 'get',
    url: '/assignments',
    server: true
  });
  return res.data;
};

export const createAssignment = async (
  assignment: CreateAssignment
): Promise<boolean> => {
  const res = await apiRequest({
    method: 'post',
    url: '/assignments',
    data: assignment,
    server: false,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  if (res.data) {
    return true;
  }
  return false;
};
