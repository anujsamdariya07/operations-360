"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Copy, Filter, Mail, MapPin, Phone, Plus, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock customers data
  const customers = [
    {
      id: 1,
      name: "Acme Corp",
      email: "contact@acmecorp.com",
      phone: "+91 9876543210",
      location: "New York, NY",
      orders: 12,
      status: "Active",
    },
    {
      id: 2,
      name: "TechGiant Inc",
      email: "info@techgiant.com",
      phone: "+91 9876543211",
      location: "San Francisco, CA",
      orders: 8,
      status: "Active",
    },
    {
      id: 3,
      name: "Global Supplies",
      email: "orders@globalsupplies.com",
      phone: "+91 9876543212",
      location: "Chicago, IL",
      orders: 5,
      status: "Active",
    },
    {
      id: 4,
      name: "Local Manufacturing",
      email: "info@localmfg.com",
      phone: "+91 9876543213",
      location: "Detroit, MI",
      orders: 3,
      status: "Inactive",
    },
    {
      id: 5,
      name: "City Builders",
      email: "projects@citybuilders.com",
      phone: "+91 9876543214",
      location: "Dallas, TX",
      orders: 7,
      status: "Active",
    },
  ]

  // Filter customers based on search term
  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to copy customer link
  const copyCustomerLink = (customerId: number) => {
    const url = `${window.location.origin}/dashboard/customers/${customerId}`
    navigator.clipboard.writeText(url)
    alert(`Link copied to clipboard: ${url}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">Manage your customer relationships</p>
        </div>
        <Link href="/dashboard/customers/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle>Customer List</CardTitle>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        </CardHeader>
        <CardContent className="px-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm font-medium">
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Contact</th>
                  <th className="pb-3 pr-4">Location</th>
                  <th className="pb-3 pr-4">Orders</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr key={customer.id} className="border-b">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <User className="h-8 w-8 rounded-full bg-muted p-1" />
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-muted-foreground flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                          {customer.phone}
                        </div>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                          {customer.location}
                        </div>
                      </td>
                      <td className="py-4 pr-4">{customer.orders}</td>
                      <td className="py-4 pr-4">
                        <Badge variant={customer.status === "Active" ? "outline" : "secondary"}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/dashboard/customers/${customer.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyCustomerLink(customer.id)}
                            title="Copy customer link"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-4 text-center text-muted-foreground">
                      No customers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
