// services/apiService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_CONFIG from '../config/api';

// Types
export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    userId: string;
    userName: string;
    userLevelId: string;
    userLevelDesc: string;
    userImg: any[];
    status: string;
    empId: string;
    empFirstname: string;
    empOtherName: string;
    empEmail: string;
    empContactNumber: string;
    empCompanyID: string;
    empTypeName: string;
}

export interface LeaveData {
    entitlementId: string;
    leaveTypeName: string;
    leaveAmount: number;
    takenAmount: number;
}

// Base API client class
class ApiService {
    private baseUrl: string;
    private timeout: number;

    constructor() {
        this.baseUrl = API_CONFIG.BASE_URL;
        this.timeout = API_CONFIG.TIMEOUT;
    }

    // Generic request method
    private async request<T>(
        endpoint: string,
        options: RequestInit = {},
        params?: Record<string, string>
    ): Promise<T> {
        let url = `${this.baseUrl}${endpoint}`;

        // Add query parameters if provided
        if (params) {
            const queryString = new URLSearchParams(params).toString();
            url += `?${queryString}`;
        }

        const config: RequestInit = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        };

        console.log(`Making ${config.method || 'GET'} request to:`, url);

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), this.timeout);

            const response = await fetch(url, {
                ...config,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            console.log(`Response status: ${response.status}`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data);

            return data;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    // Authentication methods
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        return this.request<LoginResponse>(
            API_CONFIG.ENDPOINTS.LOGIN,
            {
                method: 'POST',
                body: JSON.stringify(credentials),
            }
        );
    }

    // Dashboard methods
    async getLeaveCount(empId: string, companyId: string): Promise<LeaveData[]> {
        return this.request<LeaveData[]>(
            API_CONFIG.ENDPOINTS.LEAVE_COUNT,
            { method: 'GET' },
            { emp_id: empId, company_id: companyId }
        );
    }

    // Helper method to get user data from storage
    async getUserDataFromStorage(): Promise<LoginResponse | null> {
        try {
            const userData = await AsyncStorage.getItem('userData');
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error getting user data from storage:', error);
            return null;
        }
    }

    // Method to get leave data using stored user credentials
    async getLeaveCountForCurrentUser(): Promise<LeaveData[]> {
        const userData = await this.getUserDataFromStorage();

        if (!userData) {
            throw new Error('No user data found. Please login again.');
        }

        const { empId, empCompanyID } = userData;

        if (!empId || !empCompanyID) {
            throw new Error('Missing employee ID or company ID. Please login again.');
        }

        return this.getLeaveCount(empId, empCompanyID);
    }
}

// Export singleton instance
export const apiService = new ApiService();
export default apiService;