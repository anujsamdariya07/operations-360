"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for orders
const orderData = {
  "ORD-7892": {
    id: "ORD-7892",
    name: "Packaging Materials Order",
    customer: "Acme Corp",
    customerId: "1",
    status: "Processing",
    deadline: new Date("2025-04-25"),
    createdAt: "2025-04-10",
    products: [
      { id: "PROD-001", name: "Box Type A", quantity: 50, price: 120 },
      { id: "PROD-002", name: "Packaging Tape", quantity: 20, price: 80 },
    ],
    advance: 5000,
    description: "Order for standard packaging materials for Q2 product line.",
    totalAmount: 7600,
    amountPaid: 5000,
    amountRemaining: 2600,
  },
  "ORD-7891": {
    id: "ORD-7891",
    name: "Premium Packaging Order",
    customer: "TechGiant Inc",
    customerId: "2",
    status: "Ready for Delivery",
    deadline: new Date("2025-04-22"),
    createdAt: "2025-04-05",
    products: [
      { id: "PROD-003", name: "Premium Box", quantity: 100, price: 250 },
      { id: "PROD-004", name: "Bubble Wrap", quantity: 30, price: 150 },
    ],
    advance: 15000,
    description: "High-quality packaging materials for premium tech products.",
    totalAmount: 29500,
    amountPaid: 15000,
    amountRemaining: 14500,
  },
}

// Mock data
const customers = [
  { id: "1", name: "Acme Corp" },
  { id: "2", name: "TechGiant Inc" },
  { id: "3", name: "Global Supplies" },
  { id: "4", name: "Local Manufacturing" },
  { id: "5", name: "City Builders" },
]

const products = [
  { id: "PROD-001", name: "Box Type A", price: 120, available: 120 },
  { id: "PROD-002", name: "Packaging Tape", price: 80, available: 2 },
  { id: "PROD-003", name: "Premium Box", price: 250, available: 150 },
  { id: "PROD-004", name: "Bubble Wrap", price: 150, available: 45 },
  { id: "PROD-005", name: "Box Type C", price: 100, available: 5 },
]

export default function EditOrderPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  // State for order form
  const [orderForm, setOrderForm] = useState({
    name: "",
    customerId: "",
    deadline: new Date(),
    advance: 0,
    description: "",
    amountPaid: 0,
  })

  // State for selected products
  const [selectedProducts, setSelectedProducts] = useState<any[]>([])

  // State for product selection
  const [selectedProductId, setSelectedProductId] = useState("")
  const [selectedQuantity, setSelectedQuantity] = useState(1)

  // State for cancel confirmation
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)

  // Load order data
  useEffect(() => {
    const order = orderData[orderId]
    if (order) {
      setOrderForm({
        name: order.name,
        customerId: order.customerId,
        deadline: order.deadline,
        advance: order.advance,
        description: order.description,
        amountPaid: order.amountPaid,
      })

      setSelectedProducts(
        order.products.map((product) => ({
          id: product.id,
          name: product.name,
          quantity: product.quantity,
          price: product.price,
        })),
      )
    }
  }, [orderId])

  // Derived values
  const totalAmount = selectedProducts.reduce((sum, product) => sum + product.price * product.quantity, 0)
  const amountRemaining = totalAmount - orderForm.amountPaid

  // Handle form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setOrderForm({
      ...orderForm,
      [name]: name === "amountPaid" || name === "advance" ? Number(value) : value,
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
    console.log("Order updated:", {
      id: orderId,
      ...orderForm,
      products: selectedProducts,
      totalAmount,
      amountRemaining,
    })

    // Navigate back to orders page
    router.push("/dashboard/orders")
  }

  // Cancel order
  const cancelOrder = () => {
    // In a real app, you would send a delete request to your API
    console.log("Order cancelled:", orderId)

    // Navigate back to orders page
    router.push("/dashboard/orders")
  }

  // If order not found, show error
  if (!orderData[orderId]) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard/orders")}>Back to Orders</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Order</h1>
        <p className="text-muted-foreground">Update order details for {orderId}</p>
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
                      <SelectItem key={customer.id} value={customer.id}>
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
                <Label htmlFor="amountPaid">Amount Paid (₹)</Label>
                <Input
                  id="amountPaid"
                  name="amountPaid"
                  type="number"
                  value={orderForm.amountPaid}
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
            <CardDescription>Update products in this order</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 space-y-2">
                <Label htmlFor="productId">Add Product</Label>
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
                <span className="font-medium">Amount Paid:</span>
                <span>₹{orderForm.amountPaid.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Remaining Amount:</span>
                <span className={amountRemaining > 0 ? "text-red-500" : ""}>₹{amountRemaining.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="destructive" onClick={() => setIsCancelDialogOpen(true)}>
            Cancel Order
          </Button>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/orders")}>
              Discard Changes
            </Button>
            <Button type="submit">Update Order</Button>
          </div>
        </div>
      </form>

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog open={isCancelDialogOpen} onOpenChange={setIsCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently cancel the order and remove it from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep order</AlertDialogCancel>
            <AlertDialogAction onClick={cancelOrder} className="bg-red-500 hover:bg-red-600">
              Yes, cancel order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
