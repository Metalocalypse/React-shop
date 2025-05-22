export interface User {
  id: string;
  username: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
  totalPrice: number;
}


export type ThemeName = 'light' | 'dark' | 'blue';

export interface Theme {
  name: ThemeName;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary?: string;
    accent?: string;
    headerBackground?: string;
    cardBackground?: string;
    cardBorder?: string;
    buttonBackground?: string;
    buttonText?: string;
  };
}
