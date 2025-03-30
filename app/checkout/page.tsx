'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/store/cart-store';
import { checkoutAction } from './checkoutAction';

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className='container mx-auto px-4 py-8 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-8 text-center'>Checkout</h1>
      <Card className='max-w-md mx-auto mb-8'>
        <CardHeader>
          <CardTitle className='text-xl font-bold'>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className='space-y-4'>
            {items.map((item) => (
              <li key={item.id} className='flex flex-col gap-2 border-b pb-2'>
                <div className='flex justify-between'>
                  <span className='font-medium'>{item.name}</span>
                  <span className='font-semibold'>
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => removeItem(item.id)}
                  >
                    –
                  </Button>
                  <span className='text-lg font-semibold'>{item.quantity}</span>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className='mt-4 border-t pt-2 text-lg font-semibold'>
            Total: ${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>
      <form action={checkoutAction} className='max-w-md mx-auto'>
        <input type='hidden' name='items' value={JSON.stringify(items)} /* Pass the cart items as a JSON string */ />
        <Button type='submit' variant='default' className='w-full'>
          Proceed to Payment
        </Button>
        <Button
          onClick={() => clearCart()}
          variant='default'
          className='w-full mt-2'
        >
          Clear Cart
        </Button>
      </form>
    </div>
  );
}
