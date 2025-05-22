"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import AuthModals from '../../components/auth/auth-modals';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  total: number;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  pendingItems: CartItem[];
  clearPendingItems: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingItems, setPendingItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart items from localStorage
    const savedItems = localStorage.getItem('cartItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }

    // Load login state from localStorage
    const savedLoginState = localStorage.getItem('isLoggedIn');
    if (savedLoginState) {
      setIsLoggedIn(JSON.parse(savedLoginState));
    }
  }, []);

  useEffect(() => {
    // Save cart items to localStorage
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    // Save login state to localStorage
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    if (pendingItems.length > 0) {
      addToCart(pendingItems[0]);
      setPendingItems([]);
      toast.success('Item added to cart', {
        position: 'bottom-right',
        duration: 3000
      });
    }
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
    clearPendingItems();
  };

  const addToCart = (item: CartItem) => {
    if (!isLoggedIn) {
      setPendingItems(prev => [...prev, item]);
      setShowAuthModal(true);
      return;
    }

    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    toast.success('Item added to cart', {
      position: 'bottom-right',
      duration: 3000
    });
  };

  const removeFromCart = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    toast.success('Item removed from cart', {
      position: 'bottom-right',
      duration: 3000
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearPendingItems = () => {
    setPendingItems([]);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        isLoggedIn,
        setIsLoggedIn,
        pendingItems,
        clearPendingItems,
      }}
    >
      {children}
      <AuthModals 
        isOpen={showAuthModal} 
        onClose={handleCloseAuthModal}
        onLoginSuccess={handleLoginSuccess}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 