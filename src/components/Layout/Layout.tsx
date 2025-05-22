import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState, type AppDispatch } from '../../store';
import { logout } from '../../store/auth-slice';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import LayoutButton from '../UI/LayoutButton'; 
import classes from './Layout.module.css';

const Layout: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const cartItemCount = useSelector((state: RootState) => state.cart.totalQuantity);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <header className={classes.header}>
        <nav className={classes.nav}>
          <ul>
            <li>
              <LayoutButton to="/products">Products</LayoutButton>
            </li>
            <li>
              <LayoutButton to="/cart">Cart ({cartItemCount})</LayoutButton>
            </li>
            {isAuthenticated && (
              <li>
                <LayoutButton
                  to="/login" 
                  onClick={handleLogout} 
                  className={classes.logoutButtonSpecifics} 
                >
                  Logout
                </LayoutButton>
              </li>
            )}
          </ul>
        </nav>
        <div className={classes.themeSwitcherContainer}>
            <ThemeSwitcher />
        </div>
      </header>
      <main className={classes.main}>
        <Outlet />
      </main>
      <footer className={classes.footer}>
        <p>&copy; {new Date().getFullYear()} React store Alea</p>
      </footer>
    </>
  );
};

export default Layout;