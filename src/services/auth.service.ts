import { AuthResponse, LoginCredentials, UserCreate, User } from '@/types/auth';

// Mock token generation
const generateToken = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const authService = {
    async register(userData: UserCreate): Promise<AuthResponse> {
        // Create a mock user and token
        const token = generateToken();
        const user: User = {
            id: Date.now(),
            ...userData,
            is_active: true,
            is_verified: true
        };

        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return {
            access_token: token,
            token_type: 'bearer'
        };
    },

    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        // In mock mode, accept any credentials
        const token = generateToken();
        const user = {
            id: Date.now(),
            email: credentials.email,
            name: 'Test User',
            user_type: 'general',
            is_active: true,
            is_verified: true
        };

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);

        return {
            access_token: token,
            token_type: 'bearer'
        };
    },

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken(): string | null {
        return localStorage.getItem('token');
    },

    getCurrentUser(): User | null {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
};