import { apiRequest } from '@/lib/apiRequest';
import { Submission } from '@/types/school-index';

//Student submission
export const submitAssignment = async (
  assignment: Submission
): Promise<boolean> => {
  const res = await apiRequest({
    method: 'post',
    url: '/submissions',
    data: assignment,
    server: false
  });
  return !!res; // Simplified boolean conversion
};

export const getSubmissionById = async (id: number): Promise<Submission> => {
  const res = await apiRequest({
    method: 'get',
    url: `/submissions/${id}`,
    server: true
  });
  return res; // Changed from res.data
};
