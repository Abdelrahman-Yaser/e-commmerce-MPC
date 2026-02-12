import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, CartItem } from '../types/product';

// ─── State ──────────────────────────────────────────────
interface CartState {
  items: CartItem[];
}

// ─── Actions ─────────────────────────────────────────────
type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; selectedVariant: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number; selectedVariant: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; selectedVariant: string; quantity: number } }
  | { type: 'CLEAR_CART' };

// ─── Reducer ─────────────────────────────────────────────
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedVariant } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [...state.items, { product, quantity: 1, selectedVariant }],
      };
    }
    case 'REMOVE_ITEM': {
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(item.product.id === action.payload.productId &&
              item.selectedVariant === action.payload.selectedVariant)
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      const { productId, selectedVariant, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (item) => !(item.product.id === productId && item.selectedVariant === selectedVariant)
          ),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === productId && item.selectedVariant === selectedVariant
            ? { ...item, quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

// ─── Context ─────────────────────────────────────────────
interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, selectedVariant: string) => void;
  removeItem: (productId: number, selectedVariant: string) => void;
  updateQuantity: (productId: number, selectedVariant: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (product: Product, selectedVariant: string) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, selectedVariant } });

  const removeItem = (productId: number, selectedVariant: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, selectedVariant } });

  const updateQuantity = (productId: number, selectedVariant: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, selectedVariant, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
