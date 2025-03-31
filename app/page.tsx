import Image from 'next/image';
import { stripe } from '@/lib/stripe';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Carousel } from '@/components/Carousel';
import BestSeller from '@/components/BestSeller';

export default async function Home() {
  const products = await stripe.products.list({
    expand: ['data.default_price'],
    limit: 10,
  });

  return (
    <div>
      <section className='rounded bg-neutral-100 py-8 sm:py-15'>
        <div className='mx-auto grid grid-cols-1 items-center justify-items-center gap-8 px-8 sm:px-16 md:grid-cols-2'>
          <div className='max-w-md space-y-4'>
            <h2 className='text-3xl font-bold tracking-tight md:text-4xl'>
              Welcome to Buyify
            </h2>
            <p className='text-neutral-600'>
              Discover the latest products you never knew you needed—innovative,
              stylish, and designed to make life easier. From everyday
              essentials to unique finds, explore a curated selection that
              surprises and delights.
            </p>
            <Button
              asChild
              variant='default'
              className='inline-flex items-center justify-center rounded-full px-6 py-3 bg-black text-white'
            >
              <Link
                href='/products'
                className='inline-flex items-center justify-center rounded-full px-6 py-3'
              >
                Browse All Products
              </Link>
            </Button>
          </div>
          <Link href={'/products/' + products.data[2].id}>
            <Image
              alt='Hero Image'
              src={products.data[2].images[0]}
              className='rounded'
              width={450}
              height={450}
              priority
            />
          </Link>
        </div>
      </section>
      <section className='py-8 pt-15'>
        <BestSeller products={products.data} />
      </section>
      <section className='py-8'>
        <Carousel products={products.data} />
      </section>
    </div>
  );
}
