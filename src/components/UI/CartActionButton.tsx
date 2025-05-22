import classes from './CartActionButton.module.css';

interface CartActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const CartActionButton: React.FC<CartActionButtonProps> = ({
  children,
  type = 'button',
  ...props
}) => {
  return (
    <button type={type} className={classes.cartAction} {...props}>
      {children}
    </button>
  );
};

export default CartActionButton;