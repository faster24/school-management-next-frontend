import { apiRequest } from '@/lib/apiRequest';
import {
  Assignments,
  Category,
  CreateAssignment,
  Submission
} from '@/types/school-index';

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


export const getAssignmentById = async (id: number): Promise<Assignments> => {
  const res = await apiRequest({
    method: 'get',
    url: `/assignments/${id}`,
    server: false
  });
  return res; // Changed from res.data
};

export const createSubmission = async (): Promise<Submission> => {
    return;
}

export const editSubmission = async (): Promise<Submission> => {
    return;
}
