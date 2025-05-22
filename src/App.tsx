import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from './store';
import SimpleErrorBoundary from './components/utils/SimpleErrorBoundary';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const Layout = lazy(() => import('./components/Layout/Layout'));

const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

const App: React.FC = () => {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme);

  useEffect(() => {
    document.body.className = '';
    document.body.classList.add(`theme-${currentTheme}`);
  }, [currentTheme]);

  return (
    <Router>
      <SimpleErrorBoundary fallbackMessage="An application error occurred. Please try refreshing the page.">
        <Suspense fallback={<div style={{textAlign: 'center', padding: '50px', fontSize: '1.5em'}}>Loading Application...</div>}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/products" replace />} />
              <Route path="products" element={<ProductListPage />} />
              <Route path="products/:id" element={<ProductDetailPage />} />
              <Route path="cart" element={<CartPage />} />
            </Route>

            <Route 
              path="*" 
              element={
                <RootStateBasedRedirect />
              } 
            />
          </Routes>
        </Suspense>
      </SimpleErrorBoundary>
    </Router>
  );
};

const RootStateBasedRedirect: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return <Navigate to={isAuthenticated ? "/products" : "/login"} replace />;
};

export default App;