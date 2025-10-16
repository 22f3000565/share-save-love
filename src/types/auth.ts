export interface UserCreate {
    email: string;
    password: string;
    name: string;
    user_type: 'general' | 'restaurant' | 'ngo';
    phone?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    user_type: string;
    is_active: boolean;
    is_verified: boolean;
    phone?: string;
    latitude?: number;
    longitude?: number;
    address?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}