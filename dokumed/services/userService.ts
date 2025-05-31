// File: services/userService.ts

import apiService from '@/utils/api';
import config from '@/utils/config';
import { UserData } from './authService';

const userService = {
  // Create user profile
  createUser: async (userData: UserData) => {
    return await apiService.post(config.endpoints.user.create, userData);
  },
  
  // Update user profile
  updateUser: async (userId: string, userData: Partial<UserData>) => {
    return await apiService.put(`${config.endpoints.user.update}/${userId}`, userData);
  },
  
  // Get user by ID
  getUserById: async (userId: string) => {
    return await apiService.get(`${config.endpoints.user.update}/${userId}`);
  }
};

export default userService;