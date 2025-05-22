import React from 'react';
import Cart from '../components/Cart/Cart';
import classes from './CartPage.module.css';

const CartPage: React.FC = () => {
  return (
    <div className={classes.cartPageContainer}>
      <Cart />
    </div>
  );
};

export default CartPage;