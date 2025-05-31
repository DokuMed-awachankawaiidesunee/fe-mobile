import React, { createContext, useState, useEffect, useContext } from 'react';
import { router } from 'expo-router';
import authService, { UserData } from '@/services/authService';
import otpService from '@/services/otpService';
import userService from '@/services/userService';

// Define the shape of our auth context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any | null;
  phone: string;
  isVerified: boolean;
  registrationData: Partial<UserData>;
  currentStep: 'phone' | 'verification' | 'password' | 'general' | 'resident' | 'personal';
  authFlow: 'login' | 'register';
  
  // Auth methods
  login: (phone: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: () => Promise<void>;
  logout: () => Promise<void>;
  setLoginFlow: () => void;
  setRegisterFlow: () => void;
  
  // Registration flow methods
  setPhone: (phone: string) => void;
  verifyOtp: (otp: string) => Promise<boolean>;
  setRegistrationData: (data: Partial<UserData>) => void;
  setCurrentStep: (step: 'phone' | 'verification' | 'password' | 'general' | 'resident' | 'personal') => void;
  submitRegistrationData: () => Promise<void>;
}

// Create the auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any | null>(null);
  const [phone, setPhoneState] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [registrationData, setRegistrationDataState] = useState<Partial<UserData>>({});
  const [currentStep, setCurrentStepState] = useState<'phone' | 'verification' | 'password' | 'general' | 'resident' | 'personal'>('phone');
  const [authFlow, setAuthFlow] = useState<'login' | 'register'>('login');

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          // Get user profile
          const profile = await authService.getProfile();
          setUser(profile);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Set login flow
  const setLoginFlow = () => {
    setAuthFlow('login');
  };
  
  // Set register flow
  const setRegisterFlow = () => {
    setAuthFlow('register');
  };

  // Login with phone and password
  const login = async (phone: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login({ phone_number: phone, password });
      
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
        router.replace('/(tabs)');
      } else {
        throw new Error(response.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    // This would integrate with Expo Google Auth
    // For now it's a placeholder that would need to be implemented
    try {
      setIsLoading(true);
      // Google authentication logic would go here
      
      // Mock successful Google auth
      const googleToken = 'mock-google-token';
      const response = await authService.googleAuth(googleToken);
      
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
        
        if (authFlow === 'register') {
          // If in register flow, go to complete profile
          router.push('/data-general');
        } else {
          // If in login flow, go to home
          router.replace('/(tabs)');
        }
      } else {
        throw new Error(response.message || 'Google login gagal');
      }
    } catch (error) {
      console.error('Google login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const register = async () => {
    try {
      setIsLoading(true);
      const response = await authService.register(registrationData as UserData);
      
      if (response.success) {
        setIsAuthenticated(true);
        setUser(response.user);
        router.replace('/(tabs)');
      } else {
        throw new Error(response.message || 'Registrasi gagal');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Set phone number for registration/login
  const setPhone = (newPhone: string) => {
    setPhoneState(newPhone);
    setRegistrationDataState(prev => ({ ...prev, phone_number: newPhone }));
  };

  // Verify OTP
  const verifyOtp = async (otpCode: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await otpService.verifyOtp(phone, otpCode);
      
      if (response.success) {
        setIsVerified(true);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('OTP verification failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update registration data
  const setRegistrationData = (data: Partial<UserData>) => {
    setRegistrationDataState(prev => ({ ...prev, ...data }));
  };

  // Set current registration step
  const setCurrentStep = (step: 'phone' | 'verification' | 'password' | 'general' | 'resident' | 'personal') => {
    setCurrentStepState(step);
  };

  // Submit complete registration data
  const submitRegistrationData = async () => {
    try {
      setIsLoading(true);
      
      // Create user with all registration data
      await register();
      
    } catch (error) {
      console.error('Registration submission failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Provide auth context value
  const contextValue: AuthContextType = {
    isAuthenticated,
    isLoading,
    user,
    phone,
    isVerified,
    registrationData,
    currentStep,
    authFlow,
    login,
    loginWithGoogle,
    register,
    logout,
    setLoginFlow,
    setRegisterFlow,
    setPhone,
    verifyOtp,
    setRegistrationData,
    setCurrentStep,
    submitRegistrationData,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};