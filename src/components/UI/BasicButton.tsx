import classes from './BasicButton.module.css';

type BasicButtonVisualStyle = 'primary' | 'secondary';

interface BasicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  visualStyle?: BasicButtonVisualStyle;
}

const BasicButton: React.FC<BasicButtonProps> = ({
  children,
  className,
  visualStyle = 'primary',
  type = 'button',
  ...props
}) => {
  const buttonSpecificClasses = [
    classes.basicButton,
    classes[visualStyle],
    className,
  ].filter(Boolean).join(' ');

  return (
    <button type={type} className={buttonSpecificClasses} {...props}>
      {children}
    </button>
  );
};

export default BasicButton;