'use client';

import { SignUp } from '@clerk/nextjs';
import { Box } from 'lucide-react';
import Link from 'next/link';

export default function SignInPage() {
  return (
    // <div className='flex-col flex min-h-screen items-center justify-center bg-background px-4'>
    //   <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
    //     <div className='container flex h-16 items-center justify-between'>
    //       <div className='flex items-center gap-2'>
    //         <Box className='h-6 w-6' />
    //         <Link href={'/'}>
    //           <span className='text-xl font-bold'>Operations360</span>
    //         </Link>
    //       </div>
    //     </div>
    //   </header>
    //   <div className='w-full max-w-md rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700'>
    //     <SignIn
    //       appearance={{
    //         elements: {
    //           card: 'bg-background shadow-none',
    //           headerTitle: 'text-2xl font-bold text-center',
    //           headerSubtitle: 'text-muted-foreground text-sm text-center',
    //         },
    //       }}
    //     />
    //   </div>
    // </div>
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6" />
            <Link href="/">
              <span className="text-xl font-bold">Operations360</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Sign-In Content */}
      <main className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-lg dark:bg-gray-900 dark:border-gray-700">
          <SignUp
            afterSignInUrl={'/dashboard'}
            appearance={{
              elements: {
                card: 'bg-background shadow-none',
                headerTitle: 'text-2xl font-bold text-center',
                headerSubtitle: 'text-muted-foreground text-sm text-center',
              },
            }}
          />
        </div>
      </main>
    </div>
  );
}
