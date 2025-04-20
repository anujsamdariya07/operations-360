"use client"

import Image from "next/image"
import { useParams, useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, Calendar, Check, Copy, Download, FileText, Package, Truck, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Mock data for orders
const orderData = {
  "ORD-7892": {
    id: "ORD-7892",
    name: "Packaging Materials Order",
    customer: "Acme Corp",
    customerDetails: {
      name: "Acme Corporation",
      address: "123 Business Park, Mumbai, Maharashtra 400001",
      phone: "+91 9876543210",
      email: "orders@acmecorp.com",
      gstNo: "27AABCU9603R1ZX",
    },
    status: "Under Process",
    deadline: "2025-04-25",
    createdAt: "2025-04-10",
    products: [
      { id: "PROD-001", name: "Box Type A", quantity: 50, rate: 120, available: 120 },
      { id: "PROD-002", name: "Packaging Tape", quantity: 20, rate: 80, available: 2 },
    ],
    advance: "₹5,000.00",
    description: "Order for standard packaging materials for Q2 product line.",
    media: "/placeholder.svg?height=300&width=500",
    totalAmount: "₹7,600.00",
    amountPaid: "₹5,000.00",
    amountRemaining: "₹2,600.00",
    paymentMode: "Bank Transfer",
    payments: [{ id: "PAY-001", date: "2025-04-10", amount: "₹5,000.00", mode: "Bank Transfer" }],
  },
  "ORD-7891": {
    id: "ORD-7891",
    name: "Premium Packaging Order",
    customer: "TechGiant Inc",
    customerDetails: {
      name: "TechGiant Incorporated",
      address: "456 Tech Park, Bangalore, Karnataka 560001",
      phone: "+91 9876543211",
      email: "procurement@techgiant.com",
      gstNo: "29AADCT4962R1ZP",
    },
    status: "Ready for Delivery",
    deadline: "2025-04-22",
    createdAt: "2025-04-05",
    products: [
      { id: "PROD-003", name: "Premium Box", quantity: 100, rate: 250, available: 150 },
      { id: "PROD-004", name: "Bubble Wrap", quantity: 30, rate: 150, available: 45 },
    ],
    advance: "₹15,000.00",
    description: "High-quality packaging materials for premium tech products.",
    media: "/placeholder.svg?height=300&width=500",
    totalAmount: "₹29,500.00",
    amountPaid: "₹15,000.00",
    amountRemaining: "₹14,500.00",
    paymentMode: "Credit Card",
    payments: [{ id: "PAY-002", date: "2025-04-05", amount: "₹15,000.00", mode: "Credit Card" }],
  },
  "ORD-7890": {
    id: "ORD-7890",
    name: "Basic Supplies Order",
    customer: "Global Supplies",
    customerDetails: {
      name: "Global Supplies Ltd.",
      address: "789 Industrial Area, Delhi, 110001",
      phone: "+91 9876543212",
      email: "orders@globalsupplies.com",
      gstNo: "07AAACG8890R1ZX",
    },
    status: "In Production",
    deadline: "2025-04-30",
    createdAt: "2025-04-08",
    products: [
      { id: "PROD-005", name: "Box Type C", quantity: 30, rate: 100, available: 5 },
      { id: "PROD-006", name: "Packing Peanuts", quantity: 10, rate: 200, available: 15 },
    ],
    advance: "₹2,000.00",
    description: "Basic packaging supplies for regular shipments.",
    media: "/placeholder.svg?height=300&width=500",
    totalAmount: "₹5,000.00",
    amountPaid: "₹2,000.00",
    amountRemaining: "₹3,000.00",
    paymentMode: "UPI",
    payments: [{ id: "PAY-003", date: "2025-04-08", amount: "₹2,000.00", mode: "UPI" }],
  },
  "ORD-7889": {
    id: "ORD-7889",
    name: "Shipping Materials Order",
    customer: "Local Manufacturing",
    customerDetails: {
      name: "Local Manufacturing Co.",
      address: "321 Factory Zone, Chennai, Tamil Nadu 600001",
      phone: "+91 9876543213",
      email: "purchase@localmfg.com",
      gstNo: "33AABCL4567R1ZX",
    },
    status: "Out for Delivery",
    deadline: "2025-04-20",
    createdAt: "2025-04-02",
    products: [
      { id: "PROD-007", name: "Shipping Labels", quantity: 500, rate: 2, available: 1000 },
      { id: "PROD-008", name: "Box Type B", quantity: 40, rate: 150, available: 85 },
    ],
    advance: "₹5,000.00",
    description: "Materials for shipping department restocking.",
    media: "/placeholder.svg?height=300&width=500",
    totalAmount: "₹7,000.00",
    amountPaid: "₹5,000.00",
    amountRemaining: "₹2,000.00",
    paymentMode: "Bank Transfer",
    payments: [{ id: "PAY-004", date: "2025-04-02", amount: "₹5,000.00", mode: "Bank Transfer" }],
  },
  "ORD-7888": {
    id: "ORD-7888",
    name: "Construction Packaging",
    customer: "City Builders",
    customerDetails: {
      name: "City Builders Pvt. Ltd.",
      address: "567 Construction Hub, Hyderabad, Telangana 500001",
      phone: "+91 9876543214",
      email: "materials@citybuilders.com",
      gstNo: "36AADCC7890R1ZX",
    },
    status: "Under Process",
    deadline: "2025-05-05",
    createdAt: "2025-04-15",
    products: [
      { id: "PROD-009", name: "Heavy Duty Boxes", quantity: 100, rate: 300, available: 120 },
      { id: "PROD-010", name: "Industrial Tape", quantity: 50, rate: 120, available: 60 },
    ],
    advance: "₹20,000.00",
    description: "Heavy-duty packaging for construction materials.",
    media: "/placeholder.svg?height=300&width=500",
    totalAmount: "₹36,000.00",
    amountPaid: "₹20,000.00",
    amountRemaining: "₹16,000.00",
    paymentMode: "Cheque",
    payments: [{ id: "PAY-005", date: "2025-04-15", amount: "₹20,000.00", mode: "Cheque" }],
  },
  // Previous orders
  "ORD-7850": {
    id: "ORD-7850",
    name: "Quarterly Supply Order",
    customer: "Acme Corp",
    customerDetails: {
      name: "Acme Corporation",
      address: "123 Business Park, Mumbai, Maharashtra 400001",
      phone: "+91 9876543210",
      email: "orders@acmecorp.com",
      gstNo: "27AABCU9603R1ZX",
    },
    status: "Delivered",
    deadline: "2025-04-05",
    createdAt: "2025-03-20",
    completedAt: "2025-04-10",
    products: [
      { id: "PROD-001", name: "Box Type A", quantity: 100, rate: 120, available: 120 },
      { id: "PROD-002", name: "Packaging Tape", quantity: 50, rate: 80, available: 2 },
    ],
    advance: "₹10,000.00",
    description: "Quarterly supply of standard packaging materials.",
    media: "/placeholder.svg?height=300&width=500",
    totalAmount: "₹16,000.00",
    amountPaid: "₹16,000.00",
    amountRemaining: "₹0.00",
    paymentMode: "Bank Transfer",
    payments: [
      { id: "PAY-006", date: "2025-03-20", amount: "₹10,000.00", mode: "Bank Transfer" },
      { id: "PAY-007", date: "2025-04-12", amount: "₹6,000.00", mode: "Bank Transfer" },
    ],
  },
}

// Function to generate PDF
const generatePDF = (order: any) => {
  // Create PDF content
  const pdfContent = `
  INVOICE
  
  ${order.name} (${order.id})
  Date: ${new Date().toLocaleDateString()}
  
  BILL TO:
  ${order.customerDetails.name}
  ${order.customerDetails.address}
  Phone: ${order.customerDetails.phone}
  Email: ${order.customerDetails.email}
  GST No: ${order.customerDetails.gstNo}
  
  PRODUCTS:
  ${order.products
    .map(
      (p: any, i: number) =>
        `${i + 1}. ${p.name} (${p.id})
    Quantity: ${p.quantity} × Rate: ₹${p.rate} = ₹${p.quantity * p.rate}`,
    )
    .join("\n\n")}
  
  PAYMENT DETAILS:
  Total Amount: ${order.totalAmount}
  Amount Paid: ${order.amountPaid}
  Amount Remaining: ${order.amountRemaining}
  Payment Mode: ${order.paymentMode}
  
  Thank you for your business!
  `

  // In a real application, this would use a library like jsPDF to generate a PDF
  // For this demo, we'll just show an alert with the content
  alert("PDF Bill Generated:\n\n" + pdfContent)

  // In a real app, you would download the PDF here
  // For demo purposes, we'll simulate a download by copying to clipboard
  navigator.clipboard.writeText(pdfContent)
  alert("PDF content copied to clipboard")
}

// Function to copy order link
const copyOrderLink = (orderId: string) => {
  const url = `${window.location.origin}/dashboard/orders/${orderId}`
  navigator.clipboard.writeText(url)
  alert(`Link copied to clipboard: ${url}`)
}

export default function OrderDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string

  // Get order data from mock data
  const order = orderData[orderId]

  // If order not found, show error
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-muted-foreground mb-6">The order you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard/orders")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Orders
        </Button>
      </div>
    )
  }

  // Check for inventory alerts
  const inventoryAlerts = order.products.filter((product) => product.available < product.quantity)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/orders")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{order.name}</h1>
            <p className="text-muted-foreground">Order ID: {order.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => copyOrderLink(order.id)} title="Copy order link">
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button variant="outline" onClick={() => generatePDF(order)}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {order.amountRemaining !== "₹0.00" && (
            <Button onClick={() => generatePDF(order)}>
              <FileText className="mr-2 h-4 w-4" />
              Generate Bill
            </Button>
          )}
        </div>
      </div>

      {/* Order Status */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Order Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge
                variant={
                  order.status === "Under Process"
                    ? "outline"
                    : order.status === "Ready for Delivery"
                      ? "secondary"
                      : order.status === "Out for Delivery"
                        ? "default"
                        : "success"
                }
                className="px-3 py-1 text-base"
              >
                {order.status}
              </Badge>
              <div className="text-sm text-muted-foreground">
                {order.status === "Delivered" ? `Completed on ${order.completedAt}` : `Created on ${order.createdAt}`}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Deadline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-medium">{order.deadline}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Customer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <div className="font-medium">{order.customer}</div>
                <div className="text-sm text-muted-foreground">{order.customerDetails.phone}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Alerts */}
      {inventoryAlerts.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Inventory Alert</AlertTitle>
          <AlertDescription>
            Some products in this order have insufficient inventory:
            <ul className="mt-2 list-disc list-inside">
              {inventoryAlerts.map((product) => (
                <li key={product.id}>
                  {product.name}: Required {product.quantity}, Available {product.available}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {/* Order Details */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Products List */}
          <Card>
            <CardHeader>
              <CardTitle>Products</CardTitle>
              <CardDescription>List of products in this order</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Inventory Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.quantity}</TableCell>
                      <TableCell>₹{product.rate}</TableCell>
                      <TableCell>₹{product.quantity * product.rate}</TableCell>
                      <TableCell>
                        {product.available < product.quantity ? (
                          <Badge variant="destructive" className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Insufficient
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            Available
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Order Description */}
          <Card>
            <CardHeader>
              <CardTitle>Order Description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{order.description}</p>
              {order.media && (
                <div className="mt-4">
                  <Image
                    src={order.media || "/placeholder.svg"}
                    alt="Order media"
                    width={500}
                    height={300}
                    className="rounded-md border"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Payment Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Amount:</span>
                  <span className="font-medium">{order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-medium text-green-600">{order.amountPaid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount Remaining:</span>
                  <span className="font-medium text-red-600">{order.amountRemaining}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advance Payment:</span>
                  <span className="font-medium">{order.advance}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Mode:</span>
                  <span className="font-medium">{order.paymentMode}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Details */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-medium">{order.customerDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST No:</span>
                <span className="font-medium">{order.customerDetails.gstNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-medium">{order.customerDetails.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-medium">{order.customerDetails.email}</span>
              </div>
              <div className="flex flex-col mt-2">
                <span className="text-muted-foreground">Address:</span>
                <span className="font-medium">{order.customerDetails.address}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment History */}
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
            </CardHeader>
            <CardContent>
              {order.payments.length > 0 ? (
                <div className="space-y-3">
                  {order.payments.map((payment) => (
                    <div key={payment.id} className="flex justify-between items-center border-b pb-2">
                      <div>
                        <div className="font-medium">{payment.id}</div>
                        <div className="text-sm text-muted-foreground">{payment.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{payment.amount}</div>
                        <div className="text-sm text-muted-foreground">{payment.mode}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4 text-muted-foreground">No payment history available</div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delivery Status */}
      <Card>
        <CardHeader>
          <CardTitle>Delivery Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex justify-between mb-2">
              <div className="text-center">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center mx-auto ${order.status !== "Delivered" ? "bg-primary text-primary-foreground" : "bg-green-500 text-white"}`}
                >
                  <Package className="h-5 w-5" />
                </div>
                <div className="mt-1 text-sm font-medium">Processing</div>
              </div>
              <div className="text-center">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center mx-auto ${order.status === "Ready for Delivery" || order.status === "Out for Delivery" || order.status === "Delivered" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Package className="h-5 w-5" />
                </div>
                <div className="mt-1 text-sm font-medium">Ready</div>
              </div>
              <div className="text-center">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center mx-auto ${order.status === "Out for Delivery" || order.status === "Delivered" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
                >
                  <Truck className="h-5 w-5" />
                </div>
                <div className="mt-1 text-sm font-medium">Out for Delivery</div>
              </div>
              <div className="text-center">
                <div
                  className={`rounded-full h-10 w-10 flex items-center justify-center mx-auto ${order.status === "Delivered" ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"}`}
                >
                  <Check className="h-5 w-5" />
                </div>
                <div className="mt-1 text-sm font-medium">Delivered</div>
              </div>
            </div>
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
              <div
                className="h-full bg-primary"
                style={{
                  width:
                    order.status === "Under Process"
                      ? "0%"
                      : order.status === "Ready for Delivery"
                        ? "33%"
                        : order.status === "Out for Delivery"
                          ? "66%"
                          : "100%",
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
