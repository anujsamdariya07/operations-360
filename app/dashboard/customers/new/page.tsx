"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function NewCustomerPage() {
  const router = useRouter()

  // Form state
  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    address: "",
    gstNo: "",
    status: "active",
  })

  // Handle form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerForm({
      ...customerForm,
      [name]: value,
    })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setCustomerForm({
      ...customerForm,
      [name]: value,
    })
  }

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!customerForm.name || !customerForm.phone) {
      alert("Please fill in all required fields.")
      return
    }

    // In a real app, you would send this data to your API
    console.log("Customer created:", {
      id: Math.floor(Math.random() * 1000),
      ...customerForm,
      orders: 0,
    })

    // Navigate back to customers page
    router.push("/dashboard/customers")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Customer</h1>
        <p className="text-muted-foreground">Enter customer details to add them to the system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
            <CardDescription>Basic information about the customer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={customerForm.name}
                  onChange={handleFormChange}
                  placeholder="Enter customer name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerForm.email}
                  onChange={handleFormChange}
                  placeholder="Enter email address"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={customerForm.phone}
                  onChange={handleFormChange}
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={customerForm.location}
                  onChange={handleFormChange}
                  placeholder="Enter city, state"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={customerForm.address}
                  onChange={handleFormChange}
                  placeholder="Enter complete address"
                  rows={3}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
            <CardDescription>Additional information for business customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gstNo">GST Number</Label>
                <Input
                  id="gstNo"
                  name="gstNo"
                  value={customerForm.gstNo}
                  onChange={handleFormChange}
                  placeholder="Enter GST number"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={customerForm.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/customers")}>
            Cancel
          </Button>
          <Button type="submit">Add Customer</Button>
        </div>
      </form>
    </div>
  )
}
