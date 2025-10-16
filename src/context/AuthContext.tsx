import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services/auth.service';
import { LoginCredentials, UserCreate } from '@/types/auth';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (userData: UserCreate) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    login: async () => {},
    register: async () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(authService.isAuthenticated());

    useEffect(() => {
        setIsAuthenticated(authService.isAuthenticated());
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            await authService.login(credentials);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const register = async (userData: UserCreate) => {
        try {
            await authService.register(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};