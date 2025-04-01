'use client';

import { useCartStore } from '@/store/cart-store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { TiShoppingCart } from 'react-icons/ti';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaXmark } from 'react-icons/fa6';
import { Button } from './ui/button';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import axios from 'axios';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const { user } = useUser();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const createStripeCustomer = async () => {
      if (user) {
        const userEmail = user.emailAddresses[0].emailAddress;
        const userName = user.firstName || 'Unknown User';

        try {
          const response = await axios.post('/api/create-stripe-customer', {
            userId: user.id,
            email: userEmail,
            name: userName,
          });
          console.log('Stripe customer created:', response.data);

          sessionStorage.setItem('stripeCustomerCreated', 'true');
        } catch (error) {
          console.error('Error creating Stripe customer:', error);
        }
      }
    };

    if (user && !sessionStorage.getItem('stripeCustomerCreated')) {
      createStripeCustomer();
    }
  }, [user]);

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
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className='sticky top-0 z-50 bg-white shadow'
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className='container flex items-center justify-between px-4 py-4'
      >
        <Link href='/' className='hover:text-green-600 flex px-5 text-3xl'>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 2, ease: 'easeOut' }}
          >
            Buyify
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 2, ease: 'easeOut' }}
            className='text-sm text-gray-300 hover:text-green-300'
          >
            {hovered ? '$$$' : 'buy'}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2, ease: 'easeOut' }}
            className='text-xs text-gray-200 hover:text-green-200'
          >
            {hovered ? '$$$' : 'buy'}
          </motion.p>
        </Link>
        <div className='flex items-center gap-5'>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5, ease: 'easeOut' }}
            className='hidden md:flex space-x-6'
          >
            <SignedOut>
              <Link href='/' className='hover:text-green-600'>
                Home
              </Link>
              <Link href='/products' className='hover:text-green-600'>
                Store
              </Link>
              <SignInButton>Login</SignInButton>
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <Link href='/' className='hover:text-green-600'>
                Home
              </Link>
              <Link href='/products' className='hover:text-green-600'>
                Store
              </Link>
            </SignedIn>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5, ease: 'easeOut' }}
            className='flex items-center space-x-4'
          >
            <SignedIn>
              <UserButton />
            </SignedIn>
            <Link href='/checkout' className='relative'>
              <TiShoppingCart className='text-2xl hover:text-green-600' />
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
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
