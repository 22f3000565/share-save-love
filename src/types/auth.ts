export interface UserCreate {
    email: string;
    password: string;
    name: string;
    user_type: 'general' | 'restaurant' | 'ngo';
    phone: string;
    latitude: number;
    longitude: number;
    address: string;
    dietary_preferences?: 'vegetarian' | 'vegan' | 'non_vegetarian' | 'halal' | 'jain' | 'no_preference';
    restaurant_name?: string;
    contact_person?: string;
    organization_name?: string;
    area_of_service?: string;
    verification_id?: string;
}

export interface User {
    id: number;
    email: string;
    name: string;
    user_type: 'GENERAL' | 'RESTAURANT' | 'NGO';
    phone: string;
    latitude?: number;
    longitude?: number;
    address?: string;
    dietary_preferences?: string[];
    restaurant_name?: string;
    contact_person?: string;
    organization_name?: string;
    area_of_service?: string;
    verification_id?: string;
    is_active: boolean;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}