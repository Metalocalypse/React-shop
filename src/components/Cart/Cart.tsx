import Card from '../UI/Card';
import CartItemComponent from './CartItemComponent';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Cart.module.css';
import { type RootState, type AppDispatch } from '../../store';
import { cartActions } from '../../store/cart-slice';
import BasicButton from '../UI/BasicButton'; 

const Cart: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const grandTotalPrice = useSelector((state: RootState) => state.cart.grandTotalPrice);

  const handleClearCart = () => {
    dispatch(cartActions.clearCart());
  };

  const handlePlaceOrder = () => {
  if (cartItems.length === 0) {
    return;
  }

  const orderDetails = {
    items: cartItems.map(item => ({
      id: item.id,
      title: item.title,
      quantity: item.quantity,
      pricePerUnit: item.price,
      lineItemTotal: item.totalPrice,
      image: item.image,
    })),
    totalOrderAmount: grandTotalPrice,
    orderTimestamp: new Date().toISOString(),
  };

  console.log({
    type: "ORDER_PLACEMENT_SIMULATION",
    message: "Order details (simulating backend submission):",
    data: orderDetails,
    customerFriendlyTimestamp: new Date(orderDetails.orderTimestamp).toLocaleString()
  });

  alert(`Order "placed"!\nTotal amount: $${grandTotalPrice.toFixed(2)}\nOrder details have been logged to the console.`);

  dispatch(cartActions.clearCart());
};

  if (cartItems.length === 0) {
    return (
      <Card className={classes.cart}>
        <h2>Your Cart</h2>
        <p className={classes.emptyCartMessage}>Your Cart is currently empty.</p>
      </Card>
    );
  }

  return (
    <Card className={classes.cart}>
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItemComponent key={item.id} item={item} />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total:</span>
        <span>${grandTotalPrice.toFixed(2)}</span>
      </div>
      <div className={classes.cartActions}>
        <BasicButton 
          onClick={handleClearCart} 
          visualStyle="secondary" 
          className={classes.actionButton} 
        >
            Empty Cart
        </BasicButton>
        <BasicButton 
          onClick={handlePlaceOrder} 
          visualStyle="primary"
          className={classes.actionButton} 
        >
            Order
        </BasicButton>
      </div>
    </Card>
  );
};
export default Cart;