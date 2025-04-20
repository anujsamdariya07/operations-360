"use client"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Copy, Mail, MapPin, Phone, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock customer data
const customerData = {
  "1": {
    id: 1,
    name: "Acme Corp",
    email: "contact@acmecorp.com",
    phone: "+91 9876543210",
    location: "New York, NY",
    address: "123 Business Park, Mumbai, Maharashtra 400001",
    gstNo: "27AABCU9603R1ZX",
    orders: 12,
    status: "Active",
    pendingOrders: [
      {
        id: "ORD-7892",
        name: "Packaging Materials Order",
        status: "Processing",
        deadline: "2025-04-25",
        total: "₹7,600.00",
      },
      {
        id: "ORD-7880",
        name: "Monthly Supply Order",
        status: "Ready for Delivery",
        deadline: "2025-04-22",
        total: "₹12,500.00",
      },
      {
        id: "ORD-7875",
        name: "Special Packaging Order",
        status: "Out for Delivery",
        deadline: "2025-04-20",
        total: "₹5,200.00",
      },
    ],
  },
  "2": {
    id: 2,
    name: "TechGiant Inc",
    email: "info@techgiant.com",
    phone: "+91 9876543211",
    location: "San Francisco, CA",
    address: "456 Tech Park, Bangalore, Karnataka 560001",
    gstNo: "29AADCT4962R1ZP",
    orders: 8,
    status: "Active",
    pendingOrders: [
      {
        id: "ORD-7891",
        name: "Premium Packaging Order",
        status: "Ready for Delivery",
        deadline: "2025-04-22",
        total: "₹29,500.00",
      },
      {
        id: "ORD-7870",
        name: "Tech Product Boxes",
        status: "Processing",
        deadline: "2025-04-30",
        total: "₹18,200.00",
      },
    ],
  },
  "3": {
    id: 3,
    name: "Global Supplies",
    email: "orders@globalsupplies.com",
    phone: "+91 9876543212",
    location: "Chicago, IL",
    address: "789 Industrial Area, Delhi, 110001",
    gstNo: "07AAACG8890R1ZX",
    orders: 5,
    status: "Active",
    pendingOrders: [
      {
        id: "ORD-7890",
        name: "Basic Supplies Order",
        status: "In Production",
        deadline: "2025-04-30",
        total: "₹5,000.00",
      },
    ],
  },
  "4": {
    id: 4,
    name: "Local Manufacturing",
    email: "info@localmfg.com",
    phone: "+91 9876543213",
    location: "Detroit, MI",
    address: "321 Factory Zone, Chennai, Tamil Nadu 600001",
    gstNo: "33AABCL4567R1ZX",
    orders: 3,
    status: "Inactive",
    pendingOrders: [
      {
        id: "ORD-7889",
        name: "Shipping Materials Order",
        status: "Out for Delivery",
        deadline: "2025-04-20",
        total: "₹7,000.00",
      },
    ],
  },
  "5": {
    id: 5,
    name: "City Builders",
    email: "projects@citybuilders.com",
    phone: "+91 9876543214",
    location: "Dallas, TX",
    address: "567 Construction Hub, Hyderabad, Telangana 500001",
    gstNo: "36AADCC7890R1ZX",
    orders: 7,
    status: "Active",
    pendingOrders: [
      {
        id: "ORD-7888",
        name: "Construction Packaging",
        status: "Under Process",
        deadline: "2025-05-05",
        total: "₹36,000.00",
      },
      {
        id: "ORD-7865",
        name: "Heavy Duty Boxes",
        status: "Processing",
        deadline: "2025-05-10",
        total: "₹24,500.00",
      },
      {
        id: "ORD-7860",
        name: "Industrial Packaging",
        status: "Ready for Delivery",
        deadline: "2025-04-28",
        total: "₹18,750.00",
      },
    ],
  },
}

export default function CustomerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const customerId = params.id as string

  // Get customer data
  const customer = customerData[customerId]

  // If customer not found, show error
  if (!customer) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-4">Customer Not Found</h1>
        <p className="text-muted-foreground mb-6">The customer you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard/customers")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Customers
        </Button>
      </div>
    )
  }

  // Function to copy customer link
  const copyCustomerLink = () => {
    const url = `${window.location.origin}/dashboard/customers/${customerId}`
    navigator.clipboard.writeText(url)
    alert(`Link copied to clipboard: ${url}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/customers")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{customer.name}</h1>
            <p className="text-muted-foreground">Customer ID: {customer.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={copyCustomerLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button onClick={() => router.push(`/dashboard/customers/${customerId}/edit`)}>Edit Customer</Button>
        </div>
      </div>

      {/* Customer Status */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge variant={customer.status === "Active" ? "outline" : "secondary"} className="px-3 py-1 text-base">
                {customer.status}
              </Badge>
              <div className="text-sm text-muted-foreground">Total Orders: {customer.orders}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>GST Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{customer.gstNo}</div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Location</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-medium">{customer.location}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Name</div>
                    <div>{customer.name}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div>{customer.phone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div>{customer.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div>{customer.address}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">GST Number:</span>
                <span className="font-medium">{customer.gstNo}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Orders:</span>
                <span className="font-medium">{customer.orders}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant={customer.status === "Active" ? "outline" : "secondary"}>{customer.status}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Pending Orders</CardTitle>
              <CardDescription>Orders that are not yet delivered</CardDescription>
            </CardHeader>
            <CardContent>
              {customer.pendingOrders && customer.pendingOrders.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Deadline</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customer.pendingOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.name}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Processing"
                                  ? "outline"
                                  : order.status === "Ready for Delivery"
                                    ? "secondary"
                                    : order.status === "Out for Delivery"
                                      ? "default"
                                      : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {order.deadline}
                            </div>
                          </TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/dashboard/orders/${order.id}`)}
                            >
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="rounded-md border p-8 text-center text-muted-foreground">
                  No pending orders for this customer.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional cards for order history, etc. can be added here */}
        </div>
      </div>
    </div>
  )
}
