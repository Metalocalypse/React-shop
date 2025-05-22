import { createSlice, type PayloadAction, current } from '@reduxjs/toolkit';
import { type CartItem, type Product } from '../types';

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  grandTotalPrice: number;
  changed: boolean;
}

const CART_STORAGE_KEY = 'appUserCart';

const loadCartFromLocalStorage = (): CartState | undefined => {
  try {
    const serializedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (serializedCart === null) {
      return undefined;
    }
    const storedCart = JSON.parse(serializedCart) as CartState;
    if (storedCart && Array.isArray(storedCart.items) &&
        typeof storedCart.totalQuantity === 'number' &&
        typeof storedCart.grandTotalPrice === 'number') {
      return { ...storedCart, changed: false };
    }
    return undefined;
  } catch (error) {
    console.warn('Error while loading cart from previous sesion:', error);
    return undefined;
  }
};

const saveCartToLocalStorage = (cartState: CartState) => {
  try {
    const { items, totalQuantity, grandTotalPrice } = cartState;
    const stateToSave = { items, totalQuantity, grandTotalPrice };
    const serializedCart = JSON.stringify(stateToSave);
    localStorage.setItem(CART_STORAGE_KEY, serializedCart);
  } catch (error) {
    console.warn('Error while saving cart:', error);
  }
};

const initialCartState: CartState = {
  items: [],
  totalQuantity: 0,
  grandTotalPrice: 0,
  changed: false,
};

const initialState: CartState = loadCartFromLocalStorage() || initialCartState;

const updateCartStateAndMarkChanged = (state: CartState) => {
  state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.grandTotalPrice = state.items.reduce((sum, item) =>
    sum + (item.price * item.quantity),
  0);
  state.items.forEach(item => {
    item.totalPrice = item.price * item.quantity;
  });
  state.changed = true;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    replaceCart(state, action: PayloadAction<CartState>) {
      state.items = action.payload.items || [];
      updateCartStateAndMarkChanged(state);
      saveCartToLocalStorage(current(state));
      state.changed = false;
    },
    addItemToCart(state, action: PayloadAction<Product>) {
      const newItemFull = action.payload;
      const existingItem = state.items.find((item) => item.id === newItemFull.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          ...newItemFull,
          quantity: 1,
          totalPrice: newItemFull.price,
        });
      }
      updateCartStateAndMarkChanged(state);
      saveCartToLocalStorage(current(state));
    },
    removeItemFromCart(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);

      if (existingItemIndex === -1) return;

      const existingItem = state.items[existingItemIndex];

      if (existingItem.quantity === 1) {
        state.items.splice(existingItemIndex, 1);
      } else {
        existingItem.quantity--;
      }
      updateCartStateAndMarkChanged(state);
      saveCartToLocalStorage(current(state));
    },
    clearCart(state) {
        state.items = [];
        updateCartStateAndMarkChanged(state);
        saveCartToLocalStorage(current(state));
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;