import axiosInstance from '@/constants/axiosInstance';

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
    role: string;
  };
}

export const LoginUser = async ({
  email,
  password
}: {
  email: string;
  password: string;
}): Promise<LoginResponse | null> => {
  try {
    const res = await axiosInstance.post('/login', { email, password });

    // Check if response is successful
    if (res.status !== 200 && res.status !== 201) {
      console.error('Login failed with status:', res.status);
      return null;
    }

    // Extract token and user data from response
    const responseData = res.data;

    // Handle different possible response structures
    let token: string;
    let userData: any;
    let role: string;

    if (responseData.data) {
      // Structure: { data: { token: "...", user: {...} } }
      token = responseData.data.token;
      userData = responseData.data.user;
      role = responseData.data.roles[0];
    } else if (responseData.token) {
      // Structure: { token: "...", user: {...} }
      token = responseData.token;
      userData = responseData.user;
      role = responseData.roles[0];
    } else {
      console.error('Unexpected response structure:', responseData);
      return null;
    }

    if (!token) {
      console.error('No token found in response');
      return null;
    }

    // Create user object with fallback values
    const user = {
      id: userData?.id,
      email: userData?.email,
      name: userData?.name,
      role
    };

    return {
      token,
      user
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return null;
  }
};
