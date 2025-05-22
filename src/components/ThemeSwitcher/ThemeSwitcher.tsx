import { useSelector, useDispatch } from 'react-redux';
import {type  RootState,type AppDispatch } from '../../store';
import { setTheme } from '../../store/theme-slice';
import { type ThemeName } from '../../types';
import classes from './ThemeSwitcher.module.css';

const ThemeSwitcher: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  const availableThemes: ThemeName[] = ['light', 'dark', 'blue'];

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTheme(event.target.value as ThemeName));
  };

  return (
    <div className={classes.themeSwitcher}>
      <label htmlFor="theme-select" className={classes.label}>Theme: </label>
      <select id="theme-select" value={currentTheme} onChange={handleThemeChange} className={classes.select}>
        {availableThemes.map(themeName => (
          <option key={themeName} value={themeName}>
            {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ThemeSwitcher;