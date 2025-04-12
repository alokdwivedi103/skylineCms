'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from "next/image";
import {
  Carousel,
  CarouselItem,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useAuth } from '@/context/AuthContext'

const OFFERINGS = [
  {
    image: "/login/login.webp",
    message:
      "Login to our website to get updated about all the new releases and publishes",
  },
  {
    image: "/login/login.webp",
    message:
      "We have A-Z all the books you need from your practices to case studies",
  },
  {
    image: "/login/login.webp",
    message:
      "We do business in all of the North-East and operate from Prayagraj",
  },
];

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('from') || '/'
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      // Update auth context
      login(data.user)

      // Redirect to the requested page or home
      location.href = redirectTo
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="lg:w-screen h-screen overflow-y-auto">
      <div className="lg:container px-2 flex flex-col lg:flex-row lg:items-center justify-center lg:justify-start h-full">
        <div className="lg:w-1/2 h-auto hidden lg:block">
          <Carousel className="w-full flex items-center relative">
            <CarouselPrevious className="absolute left-5 z-[1]" />
            <CarouselContent className="w-full">
              {OFFERINGS.map((offering) => (
                <CarouselItem key={offering.message}>
                  <div className="p-1 relative">
                    <div className="absolute rounded-lg flex justify-center items-center top-0 w-full h-full bg-black/50">
                      <p className="text-white w-2/3 text-3xl leading-10 font-semibold">
                        {offering.message}
                      </p>
                    </div>
                    <Image
                      alt="login"
                      className="w-full h-[412px] object-contain bg-transparent"
                      height={412}
                      priority
                      src={offering.image}
                      width={412}
                    />{" "}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute right-6 z-[1]" />
          </Carousel>
        </div>
        <div className="lg:w-1/2 text-primaryColor text-center">
          <div className="text-2xl font-semibold flex items-center justify-center">
            <Image alt="Logo" height={50} src="/logo.webp" width={50} />
            Skyline Publications
          </div>
          <div className="min-h-[calc(100vh-100px)] flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
              <div>
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                    {error}
                  </div>
                )}
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </div>

                <div className="text-sm text-center">
                  <Link
                    href="/register"
                    className="font-medium text-primary hover:text-primary/90"
                  >
                    Don't have an account? Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
