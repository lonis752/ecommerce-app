'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Stripe from 'stripe';
import { motion } from 'framer-motion';

interface Props {
  products: Stripe.Product[];
}

const BestSeller = ({ products }: Props) => {
  // Sort products by purchase_count in descending order and take the top 6
  const sortedProducts = [...products]
    .sort((a, b) => {
      const aCount = Number(a.metadata.purchase_count) || 0;
      const bCount = Number(b.metadata.purchase_count) || 0;
      return bCount - aCount;
    })
    .slice(0, 6);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <Link href='/products'>
        <h2 className='hover:text-green-600 text-3xl font-bold leading-none tracking-tight text-foreground mb-8'>
          Best Sellers
        </h2>
      </Link>
      <ul className='grid grid-cols-3 gap-4 place-items-center'>
        {sortedProducts.map((product, index) => (
          <motion.li
            key={product.id}
            className='w-full flex-shrink-0 rounded-lg shadow-lg border border-gray-700 p-4 bg-white'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
          >
            {product.images[0] && (
              <div className='relative w-full h-30 sm:h-60'>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className='object-contain rounded-lg'
                  />
                </Link>
              </div>
            )}
            <h3 className='hidden sm:block text-lg font-bold mt-2 text-gray-900'>
              {product.name}
            </h3>
            {product.default_price && (
              <p className='hidden sm:block text-gray-700 text-sm'>
                $
                {((product.default_price as Stripe.Price).unit_amount || 0) /
                  100}
              </p>
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default BestSeller;