"use client";

import { create } from 'zustand';

interface User {
  email: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initialize: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  isLoading: true,
  login: async (email: string, password: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const userData = {
        email,
        firstName: 'Demo',
        lastName: 'User',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&q=80',
      };

      localStorage.setItem('auth', JSON.stringify({
        isAuthenticated: true,
        user: userData,
      }));

      set({ isAuthenticated: true, user: userData });
    } catch (error) {
      throw new Error('Login failed');
    }
  },
  logout: async () => {
    localStorage.removeItem('auth');
    set({ isAuthenticated: false, user: null });
  },
  initialize: async () => {
    try {
      const authData = localStorage.getItem('auth');
      if (authData) {
        const { isAuthenticated, user } = JSON.parse(authData);
        set({ isAuthenticated, user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      set({ isLoading: false });
    }
  },
}));