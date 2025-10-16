import axios from 'axios';
import { AuthResponse, LoginCredentials, UserCreate } from '@/types/auth';

const API_URL = 'http://localhost:8000';

export const authService = {
    async register(userData: UserCreate): Promise<AuthResponse> {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const formData = new FormData();
        formData.append('username', credentials.email);
        formData.append('password', credentials.password);

        const response = await axios.post(`${API_URL}/auth/login`, formData);
        if (response.data.access_token) {
            localStorage.setItem('token', response.data.access_token);
        }
        return response.data;
    },

    logout(): void {
        localStorage.removeItem('token');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
};