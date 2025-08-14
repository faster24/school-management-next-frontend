import axiosInstance from '@/constants/axiosInstance';
import { CreateSubject, Subjects } from '@/types/school-index';

export const getSubjects = async (): Promise<Subjects[]> => {
  try {
    const response = await axiosInstance.get('/subjects');
    if (response.status === 200) {
      return response.data.data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const createSubject = async (
  subject: CreateSubject
): Promise<boolean> => {
  try {
    const response = await axiosInstance.post('/subjects', subject);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const getSubjectById = async (id: number): Promise<Subjects> => {
  try {
    const response = await axiosInstance.get(`/subjects/${id}`);
    if (response.status === 200) {
      return response.data.data;
    }
    return {} as Subjects;
  } catch (error) {
    console.error(error);
    return {} as Subjects;
  }
};

export const editSubject = async ({
  subject,
  id
}: {
  subject: CreateSubject;
  id: number;
}): Promise<boolean> => {
  try {
    const response = await axiosInstance.post(`/subjects/${id}`, subject);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const deleteSubject = async (id: number): Promise<boolean> => {
  try {
    const response = await axiosInstance.delete(`/subjects/${id}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error(error);
    return false;
  }
};
