'use client';

import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SuccessPage() {
  const { clearCart, items } = useCartStore();
  const [isPurchaseCountUpdated, setIsPurchaseCountUpdated] = useState(false); // New state to prevent re-renders

  useEffect(() => {
    if (isPurchaseCountUpdated) return; // Skip if the purchase count has already been updated

    const updatePurchaseCounts = async () => {
      try {
        // Send the list of purchased products with their quantity to your API
        const productDetails = items.map((item) => ({
          id: item.id, // Stripe Product ID
          quantity: item.quantity, // Quantity of the product purchased
        }));

        await axios.post('/api/update-purchase-count', {
          products: productDetails,
        });

        // Mark as updated after the API call
        setIsPurchaseCountUpdated(true);
      } catch (error) {
        console.error('Error updating purchase counts:', error);
      }

      // Clear the cart after the purchase count update request
      clearCart();
    };

    updatePurchaseCounts();
  }, [clearCart, items, isPurchaseCountUpdated]); // Added isPurchaseCountUpdated to prevent multiple updates

  return (
    <div className='container mx-auto px-4 py-8 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Payment Successful!</h1>
      <p className='mb-4'>
        Thank you for your purchase. Your order is being processed.
      </p>
      <Link href='/products' className='text-blue-600 hover:underline'>
        Continue Shopping
      </Link>
    </div>
  );
}
