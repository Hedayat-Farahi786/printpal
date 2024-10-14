'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
});

const LoginPage = () => {
  const { login } = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);

    try {
      // Send a POST request to the /api/login endpoint
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, password: values.password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // If the response is not OK, display an error message
        toast({
          title: "Login failed",
          description: data.message || "An error occurred during login",
          variant: "destructive"
        });
        return;
      }

      // On successful login, show a success toast and handle token
      toast({
        title: "Login successful",
        description: "You have logged in successfully",
        variant: "default",
      });

      // Optionally save the token (e.g., in localStorage or cookies)
      console.log(data)
      localStorage.setItem('token', data.token);
      login(data.token)

      // Redirect to a protected page (e.g., dashboard)
      router.push("/");
      
    } catch (err) {
      toast({
        title: "Login failed",
        description: err.message || "An error occurred during login",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <div className="relative mx-auto w-24 h-24 mb-2">
            <Image
              src="/snake-1.png"
              alt="snake image"
              className="object-contain"
              width={60}
              height={60}
            />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Log in to continue
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your details to access your account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Log in'}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          <a href="#" className="font-medium text-green-600 hover:text-green-500">
            Forgot your password?
          </a>
        </div>

        <div className="text-center text-sm">
          <span className="text-gray-500">Don't have an account?</span>{' '}
          <Link href="/register" className="font-medium text-green-600 hover:text-green-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
