import { Link, type LinkProps } from 'react-router-dom';
import classes from './DetailsButton.module.css';

interface DetailsButtonProps extends Omit<LinkProps, 'className' | 'style' | 'children'> {
  children: React.ReactNode;
  className?: string; 
}

const DetailsButton: React.FC<DetailsButtonProps> = ({
  children,
  className: customClassNameFromProps,
  to,
  ...props
}) => {
  const buttonClasses = [
    classes.detailsButton,
    customClassNameFromProps, 
  ].filter(Boolean).join(' ');

  return (
    <Link to={to} className={buttonClasses} {...props}>
      {children}
    </Link>
  );
};

export default DetailsButton;