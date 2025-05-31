const API_BASE_URL = 'http://172.20.10.2:3000/api';
// const API_BASE_URL = 'https://be-production-6082.up.railway.app/api';

const config = {
  apiUrl: API_BASE_URL,
  endpoints: {
    auth: {
      login: `${API_BASE_URL}/auth/login`,
      register: `${API_BASE_URL}/auth/register`,
      googleAuth: `${API_BASE_URL}/auth/google`,
      profile: `${API_BASE_URL}/auth/profile`,
      checkPhone: `${API_BASE_URL}/auth/check-phone`,
    },
    otp: {
      send: `${API_BASE_URL}/otp/send`,
      verify: `${API_BASE_URL}/otp/verify`,
    },
    user: {
      create: `${API_BASE_URL}/users`,
      update: `${API_BASE_URL}/users`,
    }
  },
  googleAuthClientId: '883332274526-gnrt0r5fuqu3b6ls8uthiglqealfdgvr.apps.googleusercontent.com',
};

export default config;