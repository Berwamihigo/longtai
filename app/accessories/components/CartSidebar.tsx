"use client";

import { FaTimes, FaTrash } from 'react-icons/fa';
import { useCart } from './CartContext';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeFromCart, updateQuantity, total, isLoggedIn, clearCart } = useCart();
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      if (isOpen) {
        setIsCheckingAuth(true);
        try {
          const res = await fetch("/api/session");
          const data = await res.json();
          
          if (!data.loggedIn) {
            toast.error('Please log in to access your cart');
            clearCart();
            onClose();
            router.push('/login');
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          toast.error('Failed to verify authentication');
          onClose();
        } finally {
          setIsCheckingAuth(false);
        }
      }
    };

    checkAuth();
  }, [isOpen, clearCart, onClose, router]);

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleSendRequest = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification for request
      toast.success('Item request sent successfully!', {
        position: 'bottom-right',
        duration: 2000,
      });

      // Wait for the first notification to be visible
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Show cart cleared notification
      toast.success('Cart cleared', {
        position: 'bottom-right',
        duration: 2000,
      });

      clearCart();
      onClose();
    } catch (error) {
      toast.error('Failed to send item request. Please try again.', {
        position: 'bottom-right',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 z-50">
        <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#e5a666]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      {!imageErrors[item.id] ? (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded"
                          onError={() => handleImageError(item.id)}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded text-gray-400 text-sm">
                          No Image
                        </div>
                      )}
                      <div className="absolute -top-2 -left-2 bg-[#e5a666] text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-semibold">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-[#e5a666] font-bold">RWF {item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      aria-label="Remove item"
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-xl font-bold text-[#e5a666]">
                RWF {total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={handleSendRequest}
              disabled={items.length === 0 || isSubmitting}
              className={`w-full bg-[#e5a666] text-white py-3 rounded-lg hover:bg-[#d88f44] transition-colors ${
                (items.length === 0 || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Sending Request...' : 'Send Item Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 