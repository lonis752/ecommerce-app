'use client';

import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaXmark } from 'react-icons/fa6';
import { Button } from './ui/button';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className='sticky top-0 z-50 bg-white shadow'>
      <div className='container flex items-center justify-between px-4 py-4'>
        <Link href='/' className='hover:text-blue-600 flex px-5'>
          <h1>Buyify</h1>
          <p className='text-sm text-gray-300'>buy</p>
          <p className='text-xs text-gray-200'>buy</p>
        </Link>
        <div className='flex items-center gap-5'>
          <div className='hidden md:flex space-x-6'>
            <Link href='/'>Home</Link>
            <Link href='/products' className='hover:text-blue-600'>
              Products
            </Link>
          </div>
          <div className='flex items-center space-x-4'>
            <Link href='/checkout' className='relative'>
              <TiShoppingCart className='text-2xl' />
              {cartCount > 0 && (
                <span className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                  {cartCount}
                </span>
              )}
            </Link>
            <Button
              variant='ghost'
              className='md:hidden'
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <FaXmark /> : <GiHamburgerMenu />}
            </Button>
          </div>
        </div>
      </div>
      {mobileOpen && (
        <nav className='md:hidden bg-white shadow-md'>
          <ul className='flex flex-col p-4 space-y-2'>
            <li>
              <Link href='/' className='block hover:text-blue-600'>
                Home
              </Link>
            </li>
            <li>
              <Link href='/products' className='block hover:text-blue-600'>
                Products
              </Link>
            </li>
            <li>
              <Link href='/checkout' className='block hover:text-blue-600'>
                Checkout
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};

export default Navbar;
