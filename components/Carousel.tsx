'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Stripe from 'stripe';

interface Props {
  products: Stripe.Product[];
  speed?: 'fast' | 'normal' | 'slow';
  direction?: 'left' | 'right';
}

export const Carousel = ({
  products,
  speed = 'normal',
  direction = 'left',
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  const getSpeed = () => {
    return speed === 'normal' ? '90s' : '60s';
  };

  useEffect(() => {
    if (scrollerRef.current) {
      // Duplicate products to ensure infinite scrolling
      const items = Array.from(scrollerRef.current.children);
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        scrollerRef.current?.appendChild(clone);
      });
      setStart(true);
    }
  }, []);

  return (
    <div ref={containerRef} className='relative sm:w-[calc(100vw-10rem)] max-w-screen overflow-hidden'>
      <Link href='/products'>
        <h2 className='text-3xl font-bold leading-none tracking-tight text-foreground mb-8'>
          Products
        </h2>
      </Link>
      <ul
        ref={scrollerRef}
        className={cn(
          'flex gap-8 py-4 flex-nowrap w-max',
          start && 'animate-scroll',
          'hover:[animation-play-state:paused]'
        )}
        style={
          {
            '--animation-duration': getSpeed(),
            '--animation-direction':
              direction === 'left' ? 'forwards' : 'reverse',
          } as React.CSSProperties
        }
      >
        {products.map((product, idx) => (
          <li
            key={idx}
            className='w-60 flex-shrink-0 rounded-lg shadow-lg border border-gray-700 p-4 bg-white'
          >
            {product.images[0] && (
              <div className='relative w-full h-40'>
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    loading={undefined}
                    className='object-cover rounded-md'
                  />
                </Link>
              </div>
            )}
            <h3 className='text-lg font-bold mt-2 text-gray-900'>
              {product.name}
            </h3>
            {product.default_price && (
              <p className='text-gray-700 text-sm'>
                $
                {((product.default_price as Stripe.Price).unit_amount || 0) /
                  100}
              </p>
            )}
          </li>
        ))}
      </ul>
      <style>
        {`
          @keyframes scroll {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .animate-scroll {
            display: flex;
            animation: scroll var(--animation-duration) linear infinite var(--animation-direction);
          }
        `}
      </style>
    </div>
  );
};
