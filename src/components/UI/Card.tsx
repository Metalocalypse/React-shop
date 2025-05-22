import classes from './Card.module.css';

interface CardProps {
  className?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  const cardClasses = `${classes.card} ${props.className || ''}`.trim();
  return <section className={cardClasses}>{props.children}</section>;
};

export default Card;