"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpDown, Calendar, Clock, Copy, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock orders data
  const currentOrders = [
    {
      id: "ORD-7892",
      customer: "Acme Corp",
      status: "Processing",
      deadline: "2025-04-25",
      total: "₹1,200.00",
    },
    {
      id: "ORD-7891",
      customer: "TechGiant Inc",
      status: "Ready",
      deadline: "2025-04-22",
      total: "₹3,450.00",
    },
    {
      id: "ORD-7890",
      customer: "Global Supplies",
      status: "In Production",
      deadline: "2025-04-30",
      total: "₹890.50",
    },
    {
      id: "ORD-7889",
      customer: "Local Manufacturing",
      status: "Shipped",
      deadline: "2025-04-20",
      total: "₹2,100.00",
    },
    {
      id: "ORD-7888",
      customer: "City Builders",
      status: "Processing",
      deadline: "2025-05-05",
      total: "₹4,500.00",
    },
  ]

  const previousOrders = [
    {
      id: "ORD-7850",
      customer: "Acme Corp",
      status: "Completed",
      completed: "2025-04-10",
      total: "₹2,300.00",
    },
    {
      id: "ORD-7842",
      customer: "TechGiant Inc",
      status: "Completed",
      completed: "2025-04-05",
      total: "₹1,750.00",
    },
    {
      id: "ORD-7835",
      customer: "Global Supplies",
      status: "Completed",
      completed: "2025-03-28",
      total: "₹3,290.50",
    },
    {
      id: "ORD-7830",
      customer: "Local Manufacturing",
      status: "Completed",
      completed: "2025-03-22",
      total: "₹1,800.00",
    },
    {
      id: "ORD-7825",
      customer: "City Builders",
      status: "Completed",
      completed: "2025-03-15",
      total: "₹5,200.00",
    },
  ]

  // Filter orders based on search term
  const filteredCurrentOrders = currentOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredPreviousOrders = previousOrders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Function to copy order link
  const copyOrderLink = (orderId: string) => {
    const url = `${window.location.origin}/dashboard/orders/${orderId}`
    navigator.clipboard.writeText(url)
    alert(`Link copied to clipboard: ${url}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Link href="/dashboard/orders/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search orders..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => copyOrderLink(filteredCurrentOrders[0]?.id || "")}
          title="Copy current page URL"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="current">
        <TabsList>
          <TabsTrigger value="current">Current Orders</TabsTrigger>
          <TabsTrigger value="previous">Previous Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="current" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle>Current Orders</CardTitle>
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
                      <th className="pb-3 pr-4">Order ID</th>
                      <th className="pb-3 pr-4">Customer</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Deadline</th>
                      <th className="pb-3 pr-4">Total</th>
                      <th className="pb-3 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCurrentOrders.length > 0 ? (
                      filteredCurrentOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-4 pr-4">
                            <div className="font-medium">{order.id}</div>
                          </td>
                          <td className="py-4 pr-4">{order.customer}</td>
                          <td className="py-4 pr-4">
                            <Badge
                              variant={
                                order.status === "Processing"
                                  ? "outline"
                                  : order.status === "Ready"
                                    ? "secondary"
                                    : order.status === "In Production"
                                      ? "default"
                                      : "success"
                              }
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {order.deadline}
                            </div>
                          </td>
                          <td className="py-4 pr-4">{order.total}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/dashboard/orders/${order.id}`}>
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                              </Link>
                              <Link href={`/dashboard/orders/${order.id}/edit`}>
                                <Button variant="ghost" size="sm">
                                  Edit
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyOrderLink(order.id)}
                                title="Copy order link"
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
                          No orders found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="previous" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle>Previous Orders</CardTitle>
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
                      <th className="pb-3 pr-4">Order ID</th>
                      <th className="pb-3 pr-4">Customer</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Completed</th>
                      <th className="pb-3 pr-4">Total</th>
                      <th className="pb-3 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPreviousOrders.length > 0 ? (
                      filteredPreviousOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="py-4 pr-4">
                            <div className="font-medium">{order.id}</div>
                          </td>
                          <td className="py-4 pr-4">{order.customer}</td>
                          <td className="py-4 pr-4">
                            <Badge variant="success">{order.status}</Badge>
                          </td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {order.completed}
                            </div>
                          </td>
                          <td className="py-4 pr-4">{order.total}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <Link href={`/dashboard/orders/${order.id}`}>
                                <Button variant="ghost" size="sm">
                                  Details
                                </Button>
                              </Link>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyOrderLink(order.id)}
                                title="Copy order link"
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
                          No orders found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
