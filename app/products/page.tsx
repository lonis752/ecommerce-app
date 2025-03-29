import { stripe } from '@/lib/stripe';
import React from 'react'

const ProductPage = async () => {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return (
    <div>ProductPage</div>
  )
}

export default ProductPage