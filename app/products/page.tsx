import ProductList from '@/components/productList';
import { stripe } from '@/lib/stripe';
import React from 'react';

const ProductPage = async () => {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
  });

  return (
    <div className='pb-8'>
      
      <ProductList products={products.data} />
    </div>
  );
};

export default ProductPage;
