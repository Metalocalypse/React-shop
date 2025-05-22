import { NavLink, type NavLinkProps as OriginalNavLinkProps } from 'react-router-dom';
import classes from './LayoutButton.module.css';

interface LayoutButtonProps extends Omit<OriginalNavLinkProps, 'className' | 'style' | 'children'> {
  children: React.ReactNode;
  className?: string; 
}

const LayoutButton: React.FC<LayoutButtonProps> = ({
  children,
  className: customClassNameFromProps,
  to,
  ...props
}) => {
  const buttonSpecificClasses = [
    classes.layoutButton, 
    customClassNameFromProps, 
  ].filter(Boolean).join(' ');

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${buttonSpecificClasses} ${isActive ? classes.active : ''}`.trim()
      }
      {...props}
    >
      {children}
    </NavLink>
  );
};

export default LayoutButton;