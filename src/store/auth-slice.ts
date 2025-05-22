import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {type User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  error: string | null;
}

const AUTH_IS_AUTHENTICATED_KEY = 'appAuthIsAuthenticated';
const AUTH_USER_KEY = 'appAuthUser';

const loadAuthStateFromLocalStorage = (): { isAuthenticated: boolean; user: User | null } => {
  try {
    const isAuthenticatedString = localStorage.getItem(AUTH_IS_AUTHENTICATED_KEY);
    const userString = localStorage.getItem(AUTH_USER_KEY);

    const isAuthenticated = isAuthenticatedString ? JSON.parse(isAuthenticatedString) : false;
    let user: User | null = null;
    if (userString) {
      const parsedUser = JSON.parse(userString);
      if (parsedUser && typeof parsedUser.id === 'string' && typeof parsedUser.username === 'string') {
        user = parsedUser;
      }
    }
    
    if (isAuthenticated && !user) {
        localStorage.removeItem(AUTH_IS_AUTHENTICATED_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        return { isAuthenticated: false, user: null };
    }

    return { isAuthenticated, user };
  } catch (error) {
    console.warn('Error loading auth state from localStorage:', error);
    return { isAuthenticated: false, user: null }; 
  }
};

const saveAuthStateToLocalStorage = (isAuthenticated: boolean, user: User | null) => {
  try {
    localStorage.setItem(AUTH_IS_AUTHENTICATED_KEY, JSON.stringify(isAuthenticated));
    if (isAuthenticated && user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch (error) {
    console.warn('Error saving auth state to localStorage:', error);
  }
};

const clearAuthStateFromLocalStorage = () => {
  try {
    localStorage.removeItem(AUTH_IS_AUTHENTICATED_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
  } catch (error) {
    console.warn('Error clearing auth state from localStorage:', error);
  }
};

const initialPersistedState = loadAuthStateFromLocalStorage();

const initialState: AuthState = {
  isAuthenticated: initialPersistedState.isAuthenticated,
  user: initialPersistedState.user,
  error: null, 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ username: string }>) => {
      state.isAuthenticated = true;
      
      state.user = { username: action.payload.username, id: 'admin-user-01' };
      state.error = null;
      saveAuthStateToLocalStorage(state.isAuthenticated, state.user);
    },
    loginFailure: (state, action: PayloadAction<string | null>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
      clearAuthStateFromLocalStorage(); 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      clearAuthStateFromLocalStorage();
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;