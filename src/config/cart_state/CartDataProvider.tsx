import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';
import { CartItem } from '../../app/features/cart/hook/addToCart';

// Define the shape of the cart state
export interface CartState {
    items: CartItem[];
}

// Define the actions for the cart reducer
export type CartAction =
    | { type: 'ADD_ITEM'; item: CartItem }
    | { type: 'REMOVE_ITEM'; id: string }
    | { type: 'CLEAR_CART' };

// Initial state of the cart
const initialState: CartState = {
    items: [],
};

// Reducer function to handle cart actions
const cartReducer = (state: CartState, action: CartAction): CartState => {
    switch (action.type) {
        case 'ADD_ITEM':
            // Check if the item already exists with the same productId, size, and color
            const existingItemIndex = state.items.findIndex(
                item =>
                    item.productId === action.item.productId &&
                    item.size === action.item.size &&
                    item.color === action.item.color
            );

            if (existingItemIndex >= 0) {
                // If the item exists, update the quantity
                const updatedItems = [...state.items];
                updatedItems[existingItemIndex].quantity += action.item.quantity;
                return { ...state, items: updatedItems };
            } else {
                // Otherwise, add the new item to the cart
                return { ...state, items: [...state.items, action.item] };
            }

        case 'REMOVE_ITEM':
            return { ...state, items: state.items.filter(item => item.productId !== action.id) };
        case 'CLEAR_CART':
            return { ...state, items: [] };
        default:
            return state;
    }
};

// Create the CartContext
export const CartContext = createContext<{
    state: CartState;
    dispatch: Dispatch<CartAction>;
}>({
    state: initialState,
    dispatch: () => null,
});

// Create the CartProvider component to wrap the app with the context
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
};
