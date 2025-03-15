import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  StockNo: string;
  Name: string;
  Price: number;
  IssQty: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (stockNo: string) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
}

interface CartProviderProps {
  children: ReactNode; // Add children type
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const clearCart = () => {
    setCart([]); // Clear the cart state
  };

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((i) => i.StockNo === item.StockNo);
      if (existingItem) {
        return prevCart.map((i) =>
          i.StockNo === item.StockNo
            ? { ...i, IssQty: i.IssQty + item.IssQty }
            : i
        );
      }
      return [...prevCart, item];
    });
  };

  const removeFromCart = (stockNo: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.StockNo !== stockNo));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.Price * item.IssQty, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, getTotalPrice, clearCart }} // Include clearCart
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
