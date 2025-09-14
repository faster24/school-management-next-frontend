import { apiRequest } from '@/lib/apiRequest';
import { CreateUser, User } from '@/types/school-index';

export const getUsers = async (): Promise<User[]> => {
  const res = await apiRequest({
    method: 'get',
    url: '/users',
    server: true
  });
  return res.data.data;
};

export const createUser = async (user: CreateUser): Promise<boolean> => {
  const res = await apiRequest({
    method: 'post',
    url: '/users',
    data: user,
    server: false
  });
  if (res) {
    return true;
  }
  return false;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await apiRequest({
    method: 'get',
    url: `/users/${id}`,
    server: true
  });
  return res.data;
};

export const editUser = async ({
  user,
  id
}: {
  user: CreateUser;
  id: number;
}): Promise<boolean> => {
  const res = await apiRequest({
    method: 'post',
    url: `/users/${id}`,
    data: user,
    server: false
  });
  if (res) {
    return true;
  }
  return false;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const res = await apiRequest({
    method: 'delete',
    url: `/users/${id}`,
    server: false
  });
  if (res) {
    return true;
  }
  return false;
};

export const updateUserPassword = async ({
  passwordData,
  id
}: {
  passwordData: {
    newPassword: string;
    confirmPassword: string;
  };
  id: number;
}): Promise<boolean> => {
  const res = await apiRequest({
    method: 'post',
    url: `/users/${id}/change-password`,
    data: passwordData,
    server: false
  });
  if (res) {
    return true;
  }
  return false;
};
