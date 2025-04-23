import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import { Box } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <header className='px-[2vw] sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='container flex h-16 items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Box className='h-6 w-6' />
          <Link href={'/'}>
            <span className='text-xl font-bold'>Operations360</span>
          </Link>
        </div>
        {user && (
          <nav className='flex items-center gap-4'>
            <UserButton />
          </nav>
        )}
        {!user && (
          <nav className='flex items-center gap-4'>
            <SignInButton mode='redirect'>
              <Button variant='ghost'>Login</Button>
            </SignInButton>
            <SignUpButton mode='redirect'>
              <Button variant='default'>Sign Up</Button>
            </SignUpButton>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
