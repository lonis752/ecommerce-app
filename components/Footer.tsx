'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <section className='sm:px-10 px-5 pt-7 pb-3 border-t border-black-200 flex justify-center sm:justify-between items-center flex-wrap gap-5'>
        <div className='text-white-200 flex gap-2 items-center'>
          <Image width={40} height={40} src='/buyify.png' alt='my logo' />
          <p>|</p>
          <Link href='/terms-conditions'>
            <p className='text-center'>
              Terms & <span className='text-green-600'>Conditions</span>
            </p>
          </Link>
          <p>|</p>
          <Link href='/privacy-policy'>
            <p className='text-center'>
              Privacy <span className='text-green-600'>Policy</span>
            </p>
          </Link>
        </div>
        <div className='flex gap-3'>
          <div className='w-10 h-10 bg-black rounded-full flex justify-center items-center bg-black-300 border border-black-200'>
            <a href='https://github.com/lonis752' target='_blank'>
              <Image
                width={27}
                height={27}
                src='/git.svg'
                alt='Github Logo'
                className=''
              />
            </a>
          </div>
          <div className='w-10 h-10 bg-black rounded-full flex justify-center items-center bg-black-300 border border-black-200'>
            <a href='https://x.com/lonis_k' target='_blank'>
              <Image
                width={40}
                height={40}
                src='/x.png'
                alt='X Logo'
                className=''
              />
            </a>
          </div>
          <div className='w-10 h-10 bg-black rounded-full flex justify-center items-center bg-black-300 border border-black-200'>
            <a href='https://www.linkedin.com/in/lonis-kwacke/' target='_blank'>
              <Image
                width={27}
                height={27}
                src='/link.svg'
                alt='LinkedIn Logo'
                className=''
              />
            </a>
          </div>
        </div>
        <p className='text-white-200 text-center'>
          {`© ${year}`} Buyify. All Rights{' '}
          <span className='text-green-600'>Reserved</span>.
        </p>
      </section>
    </>
  );
};

export default Footer;
