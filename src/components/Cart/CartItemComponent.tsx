import { useDispatch } from 'react-redux';
import { type Product as ProductType } from '../../types';
import classes from './CartItem.module.css';
import { cartActions } from '../../store/cart-slice';
import { type AppDispatch } from '../../store';
import CartActionButton from '../UI/CartActionButton';

interface CartItemProps {
  item: ProductType & { quantity: number; totalPrice: number };
}

const CartItemComponent: React.FC<CartItemProps> = (props) => {
  const dispatch: AppDispatch = useDispatch();
  const { title, quantity, totalPrice, price, id, image, description, category, rating } = props.item;

  const productPayload: ProductType = { id, title, price, description, category, image, rating };

  const removeItemHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  const addItemHandler = () => {
    dispatch(cartActions.addItemToCart(productPayload));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <CartActionButton onClick={removeItemHandler} disabled={quantity === 0}>-</CartActionButton>
          <CartActionButton onClick={addItemHandler}>+</CartActionButton>
        </div>
      </div>
    </li>
  );
};

export default CartItemComponent;