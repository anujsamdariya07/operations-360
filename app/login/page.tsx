"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.email || !formData.password) {
      setError("All fields are required")
      return
    }

    // In a real app, you would validate credentials with your API
    console.log("Login attempted:", formData)

    // Redirect to dashboard after successful login
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted/40 p-4">
      <Link href="/" className="absolute left-8 top-8 flex items-center gap-2">
        <Box className="h-6 w-6" />
        <span className="text-xl font-bold">Operations360</span>
      </Link>

      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Log in</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="info@acme.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" value={formData.password} onChange={handleChange} />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <Button type="submit" className="w-full">
              Log in
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="text-sm text-gray-500 mt-2">
            Don't have an account?{" "}
            <Link href="/signup" className="text-primary underline">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
