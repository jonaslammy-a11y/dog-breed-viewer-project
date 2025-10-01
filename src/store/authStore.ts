import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  // Add other fields from dummyjson response
};

type AuthState = {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      login: (token, user) => set({ token, user }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
      // Persist both token AND user to ensure consistency
      partialize: (state) => ({ 
        token: state.token, 
        user: state.user 
      }),
    }
  )
);