import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {type ThemeName } from '../types';

const loadThemeFromLocalStorage = (): ThemeName | undefined => {
  try {
    const serializedTheme = localStorage.getItem('appChosenTheme');
    if (serializedTheme === null) {
      return undefined; 
    }
    const theme = JSON.parse(serializedTheme);
    const availableThemes: ThemeName[] = ['light', 'dark', 'blue'];
    if (availableThemes.includes(theme)) {
        return theme as ThemeName;
    }
    return undefined; 
  } catch (error) {
    console.warn('Greška pri učitavanju teme iz localStorage:', error);
    return undefined;
  }
};

const saveThemeToLocalStorage = (themeName: ThemeName) => {
  try {
    const serializedTheme = JSON.stringify(themeName);
    localStorage.setItem('appChosenTheme', serializedTheme);
  } catch (error) {
    console.warn('Greška pri čuvanju teme u localStorage:', error);
  }
};

interface ThemeState {
  currentTheme: ThemeName;
}

const initialState: ThemeState = {
  currentTheme: loadThemeFromLocalStorage() || 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeName>) => {
      const newTheme = action.payload;
      state.currentTheme = newTheme;
      saveThemeToLocalStorage(newTheme); 
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;