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
import { CalendarIcon, Minus, Plus } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define types
interface Customer {
  id: number
  name: string
  email: string
  phone: string
}

interface Product {
  id: string
  name: string
  sku: string
  quantity: number
  price: number
}

interface OrderProduct {
  id: string
  name: string
  quantity: number
  price: number
}

export default function NewOrderPage() {
  const router = useRouter()

  // Mock data
  const customers: Customer[] = [
    { id: 1, name: "Acme Corp", email: "contact@acmecorp.com", phone: "+91 9876543210" },
    { id: 2, name: "TechGiant Inc", email: "info@techgiant.com", phone: "+91 9876543211" },
    { id: 3, name: "Global Supplies", email: "orders@globalsupplies.com", phone: "+91 9876543212" },
    { id: 4, name: "Local Manufacturing", email: "info@localmfg.com", phone: "+91 9876543213" },
    { id: 5, name: "City Builders", email: "projects@citybuilders.com", phone: "+91 9876543214" },
  ]

  const products: Product[] = [
    { id: "PROD-001", name: "Box Type A", sku: "BOX-001", quantity: 120, price: 120 },
    { id: "PROD-002", name: "Box Type B", sku: "BOX-002", quantity: 85, price: 150 },
    { id: "PROD-003", name: "Packaging Tape", sku: "TAPE-001", quantity: 2, price: 80 },
    { id: "PROD-004", name: "Bubble Wrap", sku: "WRAP-001", quantity: 45, price: 150 },
    { id: "PROD-005", name: "Box Type C", sku: "BOX-003", quantity: 5, price: 100 },
  ]

  // Form state
  const [orderForm, setOrderForm] = useState({
    name: "",
    customerId: "",
    deadline: new Date(),
    advance: 0,
    description: "",
  })

  const [selectedProducts, setSelectedProducts] = useState<OrderProduct[]>([])
  const [selectedProductId, setSelectedProductId] = useState("")
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  // Derived values
  const totalAmount = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const amountPaid = orderForm.advance
  const amountRemaining = totalAmount - amountPaid

  // Handle form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOrderForm({
      ...orderForm,
      [name]: name === "advance" ? Number(value) : value,
    })
  }

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setOrderForm({
        ...orderForm,
        deadline: date,
      })
    }
  }

  // Add product to order
  const addProduct = () => {
    if (!selectedProductId) return

    const product = products.find((p) => p.id === selectedProductId)
    if (!product) return

    // Check if product already exists in the order
    const existingProductIndex = selectedProducts.findIndex((p) => p.id === selectedProductId)

    if (existingProductIndex >= 0) {
      // Update quantity if product already exists
      const updatedProducts = [...selectedProducts]
      updatedProducts[existingProductIndex].quantity += selectedQuantity
      setSelectedProducts(updatedProducts)
    } else {
      // Add new product to order
      setSelectedProducts([
        ...selectedProducts,
        {
          id: product.id,
          name: product.name,
          quantity: selectedQuantity,
          price: product.price,
        },
      ])
    }

    // Reset selection
    setSelectedProductId("")
    setSelectedQuantity(1)
  }

  // Remove product from order
  const removeProduct = (productId: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId))
  }

  // Update product quantity
  const updateProductQuantity = (productId: string, change: number) => {
    setSelectedProducts(
      selectedProducts.map((product) => {
        if (product.id === productId) {
          const newQuantity = Math.max(1, product.quantity + change)
          return { ...product, quantity: newQuantity }
        }
        return product
      }),
    )
  }

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!orderForm.name || !orderForm.customerId || selectedProducts.length === 0) {
      alert("Please fill in all required fields and add at least one product.")
      return
    }

    // In a real app, you would send this data to your API
    console.log("Order created:", {
      ...orderForm,
      products: selectedProducts,
      totalAmount,
      amountPaid,
      amountRemaining,
      status: "Processing",
      createdAt: new Date().toISOString(),
    })

    // Navigate back to orders page
    router.push("/dashboard/orders")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create New Order</h1>
        <p className="text-muted-foreground">Fill in the details to create a new order</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
            <CardDescription>Basic information about the order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Order Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={orderForm.name}
                  onChange={handleFormChange}
                  placeholder="Enter order name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customerId">Customer</Label>
                <Select
                  value={orderForm.customerId}
                  onValueChange={(value) => setOrderForm({ ...orderForm, customerId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id.toString()}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !orderForm.deadline && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {orderForm.deadline ? format(orderForm.deadline, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={orderForm.deadline} onSelect={handleDateSelect} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="advance">Advance Payment (₹)</Label>
                <Input
                  id="advance"
                  name="advance"
                  type="number"
                  value={orderForm.advance}
                  onChange={handleFormChange}
                  min={0}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Order Description</Label>
              <Textarea
                id="description"
                name="description"
                value={orderForm.description}
                onChange={handleFormChange}
                placeholder="Enter order details"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Add products to this order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="productId">Select Product</Label>
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} (₹{product.price})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="w-24 space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min={1}
                  value={selectedQuantity}
                  onChange={(e) => setSelectedQuantity(Number.parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="flex items-end">
                <Button type="button" onClick={addProduct} disabled={!selectedProductId}>
                  Add Product
                </Button>
              </div>
            </div>

            {selectedProducts.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>₹{product.price}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateProductQuantity(product.id, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span>{product.quantity}</span>
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-6 w-6"
                              onClick={() => updateProductQuantity(product.id, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>₹{product.price * product.quantity}</TableCell>
                        <TableCell>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="text-red-500"
                            onClick={() => removeProduct(product.id)}
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="rounded-md border p-8 text-center text-muted-foreground">
                No products added to this order yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Advance Payment:</span>
                <span>₹{amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Remaining Amount:</span>
                <span className={amountRemaining > 0 ? "text-red-500" : ""}>₹{amountRemaining.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/orders")}>
            Cancel
          </Button>
          <Button type="submit">Create Order</Button>
        </div>
      </form>
    </div>
  )
}
