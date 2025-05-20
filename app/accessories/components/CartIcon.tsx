"use client";

import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from './CartContext';
import CartSidebar from './CartSidebar';

export default function CartIcon() {
  const { items } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="relative" onClick={() => setIsCartOpen(true)}>
        <FaShoppingCart className="text-2xl text-gray-700 hover:text-[#e5a666] transition-colors cursor-pointer" />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-[#e5a666] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </div>
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
} 