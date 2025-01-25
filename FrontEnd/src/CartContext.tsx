import React, { createContext, useContext, useState, ReactNode } from "react";

interface CartItem {
  StockNo: string;
  Name: string;
  Price: number;
  IssQty: number; // Issued Quantity
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (StockNo: string) => void;
}

// Define the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define the provider props
interface CartProviderProps {
  children: ReactNode; // Ensures the 'children' prop is correctly typed
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.StockNo === product.StockNo
      );

      if (existingProduct) {
        // Update quantity if the product is already in the cart
        return prevCart.map((item) =>
          item.StockNo === product.StockNo
            ? { ...item, IssQty: item.IssQty + 1 }
            : item
        );
      } else {
        // Add new product to the cart
        return [...prevCart, { ...product, IssQty: 1 }];
      }
    });
  };

  const removeFromCart = (StockNo: string) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.StockNo === StockNo);

      if (existingProduct && existingProduct.IssQty > 1) {
        // Decrease quantity if greater than 1
        return prevCart.map((item) =>
          item.StockNo === StockNo ? { ...item, IssQty: item.IssQty - 1 } : item
        );
      } else {
        // Remove product if quantity is 1
        return prevCart.filter((item) => item.StockNo !== StockNo);
      }
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
