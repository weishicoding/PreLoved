import useAuth from './useAuth';
import axios from '../api/axios';

interface RefreshTokenResponse {
  username: string;
  roles: string[];
  accessToken: string;
}

export const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const refresh = async (): Promise<string> => {
    const response = await axios.get<RefreshTokenResponse>('/api/auth/refreshToken', {
      withCredentials: true,
    });
    setAuth((prev: any) => {
      return {
        ...prev,
        username: response.data.username,
        roles: response.data.roles,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};
