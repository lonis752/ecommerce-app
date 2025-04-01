'use client';

import Stripe from 'stripe';
import { ProductCard } from './productCard';
import { useState } from 'react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

interface Props {
  products: Stripe.Product[];
}

const ProductList = ({ products }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortByBestSellers, setSortByBestSellers] = useState<boolean>(false);

  const filteredProducts = products
    .filter((product) => {
      const term = searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(term);
      const descriptionMatch = product.description
        ? product.description.toLowerCase().includes(term)
        : false;
      return nameMatch || descriptionMatch;
    })
    .sort((a, b) => {
      if (!sortByBestSellers) return 0;
      const purchaseCountA = a.metadata.purchase_count
        ? parseInt(a.metadata.purchase_count)
        : 0;
      const purchaseCountB = b.metadata.purchase_count
        ? parseInt(b.metadata.purchase_count)
        : 0;
      return purchaseCountB - purchaseCountA;
    });

  const listVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className='text-3xl font-bold leading-none tracking-tight text-foreground text-center mb-8'
      >
        All Products
      </motion.h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className='mb-6 flex justify-center gap-4'
      >
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search products...'
          className='w-full max-w-md rounded border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <Button
            className='hover:bg-green-600'
            onClick={() => setSortByBestSellers((prev) => !prev)}
          >
            {sortByBestSellers ? 'Clear Sort' : 'Best Sellers'}
          </Button>
        </motion.div>
      </motion.div>
      <motion.ul
        className='mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'
        initial='hidden'
        animate='visible'
        variants={listVariants}
      >
        {filteredProducts.map((product, index) => (
          <motion.li key={index} variants={itemVariants}>
            <ProductCard product={product} />
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );
};

export default ProductList;
