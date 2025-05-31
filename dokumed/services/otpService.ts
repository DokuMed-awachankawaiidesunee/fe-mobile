// File: services/otpService.ts

import apiService from '@/utils/api';
import config from '@/utils/config';

export interface OtpSendRequest {
  phone_number: string;
}

export interface OtpVerifyRequest {
  phone_number: string;
  otp_code: string;
}

export interface OtpResponse {
  success: boolean;
  message: string;
  verification_id?: string;
}

const otpService = {
  // Send OTP to phone number
  sendOtp: async (phone_number: string): Promise<OtpResponse> => {
    return await apiService.post<OtpResponse>(
      config.endpoints.otp.send, 
      { phone_number }
    );
  },
  
  // Verify OTP code
  verifyOtp: async (phone_number: string, otp_code: string): Promise<OtpResponse> => {
    return await apiService.post<OtpResponse>(
      config.endpoints.otp.verify, 
      { phone_number, otp_code }
    );
  }
};

export default otpService;