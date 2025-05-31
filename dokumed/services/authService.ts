import * as SecureStore from 'expo-secure-store';
import apiService from '@/utils/api';
import config from '@/utils/config';

// Types
export interface AuthResponse {
  token: string;
  success: boolean;
  message: string;
  user?: {
    id: string;
    email: string;
    name?: string;
    phone_number?: string;
  };
}

export interface LoginCredentials {
  phone_number: string;
  password: string;
}

export interface GoogleAuthResponse {
  token: string;
  success: boolean;
  message: string;
  user: any;
}

export interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  nik: string;
  address: string;
  city: string;
  province: string;
  birth_date: string;
  gender: string;
  blood_type: string;
  password: string;
}

// Service methods
const authService = {
  // Login with phone number and password
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(config.endpoints.auth.login, credentials);
    
    if (response.token) {
      await SecureStore.setItemAsync('auth_token', response.token);
    }
    
    return response;
  },
  
  // Register with full user data
  register: async (userData: UserData): Promise<AuthResponse> => {
    const response = await apiService.post<AuthResponse>(config.endpoints.auth.register, userData);
    
    if (response.token) {
      await SecureStore.setItemAsync('auth_token', response.token);
    }
    
    return response;
  },
  
  // Login/Register with Google
  googleAuth: async (googleToken: string): Promise<GoogleAuthResponse> => {
    const response = await apiService.post<GoogleAuthResponse>(config.endpoints.auth.googleAuth, { token: googleToken });
    
    if (response.token) {
      await SecureStore.setItemAsync('auth_token', response.token);
    }
    
    return response;
  },
  
  // Check if phone number exists
  checkPhoneExists: async (phone_number: string): Promise<boolean> => {
    try {
      const response = await apiService.post<{success: boolean, exists: boolean}>(
        config.endpoints.auth.checkPhone, 
        { phone_number }
      );
      return response.exists;
    } catch (error) {
      // Jika terjadi error, anggap nomor tidak terdaftar
      return false;
    }
  },
  
  // Get current user profile
  getProfile: async () => {
    return await apiService.get(config.endpoints.auth.profile);
  },
  
  // Logout
  logout: async () => {
    await SecureStore.deleteItemAsync('auth_token');
  },
  
  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    const token = await SecureStore.getItemAsync('auth_token');
    return !!token;
  },
  
  // Get the current auth token
  getToken: async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('auth_token');
  }
};

export default authService;