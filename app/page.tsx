'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ArrowRight,
  BarChart3,
  Box,
  ClipboardList,
  Package,
  Users,
} from 'lucide-react';
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs';
import Header from './(components)/Header';

export default function Home() {
  return (
    <div className='flex min-h-screen flex-col'>
      <Header/>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl'>
                  Streamline Your Business Operations
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl'>
                  An all-in-one digital solution for automating and optimizing
                  inventory, order management, billing, production tracking, and
                  workforce operations.
                </p>
              </div>
              <div className='space-x-4'>
                <Link href='/signup'>
                  <Button size='lg' className='gap-1'>
                    Get Started <ArrowRight className='h-4 w-4' />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
          <div className='container px-4 md:px-6'>
            <div className='mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12'>
              <div className='space-y-4'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
                  Why Choose Operations360?
                </h2>
                <p className='text-gray-500 md:text-xl'>
                  Our platform helps manufacturing businesses automate key
                  processes, track inventory in real-time, and optimize
                  workforce management.
                </p>
              </div>
              <div className='grid gap-6'>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle>Real-Time Inventory Updates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-gray-500'>
                      Eliminates discrepancies between predicted and actual
                      inventory levels through continuous data synchronization.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle>Automated Order Management</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-gray-500'>
                      Prevents order fulfillment issues by ensuring orders
                      cannot be processed when inventory is insufficient.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className='pb-2'>
                    <CardTitle>Output-Driven Performance Evaluation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-gray-500'>
                      Shifts performance assessments from subjective,
                      hours-based evaluations to measurable, output-based
                      metrics.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        <section className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container px-4 md:px-6'>
            <div className='mx-auto grid max-w-5xl gap-6 lg:grid-cols-4 lg:gap-12'>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader>
                  <Package className='h-10 w-10 mb-2' />
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>
                    Track products, quantities, and get alerts for low stock
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader>
                  <ClipboardList className='h-10 w-10 mb-2' />
                  <CardTitle>Order Management</CardTitle>
                  <CardDescription>
                    Manage customer orders, deadlines, and delivery status
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader>
                  <Users className='h-10 w-10 mb-2' />
                  <CardTitle>Human Resources</CardTitle>
                  <CardDescription>
                    Track employees, attendance, and performance
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className='flex flex-col items-center text-center'>
                <CardHeader>
                  <BarChart3 className='h-10 w-10 mb-2' />
                  <CardTitle>Analytics</CardTitle>
                  <CardDescription>
                    Get insights into your business operations
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className='w-full border-t py-6'>
        <div className='container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8'>
          <p className='text-center text-sm text-gray-500'>
            © 2025 Operations360. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
