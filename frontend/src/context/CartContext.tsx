import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart : (bookID: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children}: {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    
    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((c) => c.bookID === item.bookID);

            if (existingItem) {
                // Increment the quantity of the existing item
                return prevCart.map((c) =>
                    c.bookID === item.bookID
                        ? { ...c, quantity: c.quantity + 1 }
                        : c
                );
            } else {
                // Add the new item with quantity 1
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (bookID: number) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.bookID === bookID
                        ? { ...item, quantity: item.quantity - 1 } // Decrease quantity by 1
                        : item
                )
                .filter((item) => item.quantity > 0) // Remove items with quantity 0
        );
    };

    const clearCart = () => {
        setCart(() => []);
    };

    return(
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const UseCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider')
    }
    return context;
};