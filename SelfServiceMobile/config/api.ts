// config/api.ts
import Constants from 'expo-constants';

// Get the base URL from environment variables
const getBaseUrl = (): string => {
    // For Expo, environment variables are accessed through Constants.expoConfig?.extra
    const baseUrl = Constants.expoConfig?.extra?.apiBaseUrl ||
        process.env.API_BASE_URL ||
        'http://216.55.186.115:8040/HRMSystem/api/v1'; // fallback

    return baseUrl;
};

export const API_CONFIG = {
    BASE_URL: getBaseUrl(),
    ENDPOINTS: {
        LOGIN: '/auth/login',
        LEAVE_COUNT: '/dashboard/leave_count',
        // Add more endpoints as needed
    },
    TIMEOUT: 10000, // 10 seconds
};

export default API_CONFIG;