"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { ArrowLeft, Calendar, Clock, Copy, Mail, MapPin, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock employee data
const employeeData = {
  "EMP-001": {
    id: "EMP-001",
    name: "John Doe",
    image: "/placeholder.svg?height=200&width=200",
    position: "Production Manager",
    status: "Active",
    contact: "+91 9876543210",
    email: "john.doe@operations360.com",
    address: "123 Employee Housing, Mumbai, Maharashtra 400001",
    joinDate: "2023-01-15",
    shift: "Morning (6 AM - 2 PM)",
    salary: "₹45,000",
    overtime: "₹250/hour",
    attendance: [
      { date: "2025-04-15", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM" },
      { date: "2025-04-16", status: "Present", checkIn: "08:45 AM", checkOut: "05:15 PM" },
      { date: "2025-04-17", status: "Present", checkIn: "08:15 AM", checkOut: "05:45 PM" },
      { date: "2025-04-18", status: "Absent", checkIn: "-", checkOut: "-" },
      { date: "2025-04-19", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM" },
    ],
  },
  "EMP-002": {
    id: "EMP-002",
    name: "Jane Smith",
    image: "/placeholder.svg?height=200&width=200",
    position: "Machine Operator",
    status: "Active",
    contact: "+91 9876543211",
    email: "jane.smith@operations360.com",
    address: "456 Worker Colony, Mumbai, Maharashtra 400002",
    joinDate: "2023-03-10",
    shift: "Afternoon (2 PM - 10 PM)",
    salary: "₹35,000",
    overtime: "₹200/hour",
    attendance: [
      { date: "2025-04-15", status: "Present", checkIn: "01:45 PM", checkOut: "10:15 PM" },
      { date: "2025-04-16", status: "Present", checkIn: "01:50 PM", checkOut: "10:00 PM" },
      { date: "2025-04-17", status: "Present", checkIn: "01:30 PM", checkOut: "10:30 PM" },
      { date: "2025-04-18", status: "Present", checkIn: "02:00 PM", checkOut: "10:00 PM" },
      { date: "2025-04-19", status: "Present", checkIn: "01:45 PM", checkOut: "10:15 PM" },
    ],
  },
  "EMP-003": {
    id: "EMP-003",
    name: "Robert Johnson",
    image: "/placeholder.svg?height=200&width=200",
    position: "Quality Control",
    status: "Active",
    contact: "+91 9876543212",
    email: "robert.johnson@operations360.com",
    address: "789 Staff Quarters, Mumbai, Maharashtra 400003",
    joinDate: "2023-05-22",
    shift: "Morning (6 AM - 2 PM)",
    salary: "₹40,000",
    overtime: "₹225/hour",
    attendance: [
      { date: "2025-04-15", status: "Present", checkIn: "08:00 AM", checkOut: "02:30 PM" },
      { date: "2025-04-16", status: "Present", checkIn: "08:15 AM", checkOut: "02:00 PM" },
      { date: "2025-04-17", status: "Absent", checkIn: "-", checkOut: "-" },
      { date: "2025-04-18", status: "Present", checkIn: "08:00 AM", checkOut: "02:15 PM" },
      { date: "2025-04-19", status: "Present", checkIn: "08:30 AM", checkOut: "02:00 PM" },
    ],
  },
  "EMP-004": {
    id: "EMP-004",
    name: "Emily Davis",
    image: "/placeholder.svg?height=200&width=200",
    position: "Packaging Specialist",
    status: "Inactive",
    contact: "+91 9876543213",
    email: "emily.davis@operations360.com",
    address: "101 Residential Complex, Mumbai, Maharashtra 400004",
    joinDate: "2023-08-05",
    shift: "Night (10 PM - 6 AM)",
    salary: "₹38,000",
    overtime: "₹220/hour",
    attendance: [
      { date: "2025-04-15", status: "Absent", checkIn: "-", checkOut: "-" },
      { date: "2025-04-16", status: "Absent", checkIn: "-", checkOut: "-" },
      { date: "2025-04-17", status: "Absent", checkIn: "-", checkOut: "-" },
      { date: "2025-04-18", status: "Absent", checkIn: "-", checkOut: "-" },
      { date: "2025-04-19", status: "Absent", checkIn: "-", checkOut: "-" },
    ],
  },
  "EMP-005": {
    id: "EMP-005",
    name: "Michael Wilson",
    image: "/placeholder.svg?height=200&width=200",
    position: "Warehouse Manager",
    status: "Active",
    contact: "+91 9876543214",
    email: "michael.wilson@operations360.com",
    address: "202 Manager Housing, Mumbai, Maharashtra 400005",
    joinDate: "2022-11-10",
    shift: "Morning (6 AM - 2 PM)",
    salary: "₹50,000",
    overtime: "₹275/hour",
    attendance: [
      { date: "2025-04-15", status: "Present", checkIn: "08:50 AM", checkOut: "05:20 PM" },
      { date: "2025-04-16", status: "Present", checkIn: "08:45 AM", checkOut: "05:30 PM" },
      { date: "2025-04-17", status: "Present", checkIn: "08:30 AM", checkOut: "05:15 PM" },
      { date: "2025-04-18", status: "Present", checkIn: "08:40 AM", checkOut: "05:10 PM" },
      { date: "2025-04-19", status: "Present", checkIn: "08:55 AM", checkOut: "05:25 PM" },
    ],
  },
}

export default function EmployeeDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const employeeId = params.id as string

  // State for employee details dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Get employee data
  const employee = employeeData[employeeId]

  // If employee not found, show error
  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-4">Employee Not Found</h1>
        <p className="text-muted-foreground mb-6">The employee you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard/employees")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Employees
        </Button>
      </div>
    )
  }

  // Function to copy employee link
  const copyEmployeeLink = () => {
    const url = `${window.location.origin}/dashboard/employees/${employeeId}`
    navigator.clipboard.writeText(url)
    alert(`Link copied to clipboard: ${url}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/employees")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{employee.name}</h1>
            <p className="text-muted-foreground">Employee ID: {employee.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={copyEmployeeLink}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Link
          </Button>
          <Button onClick={() => router.push(`/dashboard/employees/${employeeId}/edit`)}>Edit Employee</Button>
        </div>
      </div>

      {/* Employee Status */}
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Badge variant={employee.status === "Active" ? "outline" : "secondary"} className="px-3 py-1 text-base">
                {employee.status}
              </Badge>
              <div className="text-sm text-muted-foreground">Joined on {employee.joinDate}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Position</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-medium">{employee.position}</div>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Shift</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-medium">{employee.shift}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Details */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center">
                <div className="relative h-48 w-48">
                  <Image
                    src={employee.image || "/placeholder.svg"}
                    alt={employee.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Phone</div>
                    <div>{employee.contact}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div>{employee.email}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div>{employee.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <div className="font-medium">Join Date</div>
                    <div>{employee.joinDate}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compensation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Salary:</span>
                <span className="font-medium">{employee.salary}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overtime Rate:</span>
                <span className="font-medium">{employee.overtime}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>Last 5 days attendance record</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employee.attendance.map((record) => (
                      <TableRow key={record.date}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell>
                          <Badge variant={record.status === "Present" ? "outline" : "secondary"}>{record.status}</Badge>
                        </TableCell>
                        <TableCell>
                          {record.checkIn !== "-" ? (
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {record.checkIn}
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell>
                          {record.checkOut !== "-" ? (
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                              {record.checkOut}
                            </div>
                          ) : (
                            "-"
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Additional cards for performance metrics, assigned projects, etc. can be added here */}
        </div>
      </div>

      {/* Employee Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Employee Details</DialogTitle>
            <DialogDescription>Detailed information about the employee</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative h-40 w-40">
                <Image
                  src={employee.image || "/placeholder.svg"}
                  alt={employee.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">Name:</span>
                <span>{employee.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">ID:</span>
                <span>{employee.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Position:</span>
                <span>{employee.position}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <Badge variant={employee.status === "Active" ? "outline" : "secondary"}>{employee.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Contact:</span>
                <span>{employee.contact}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{employee.email}</span>
              </div>
              <div className="flex flex-col mt-2">
                <span className="font-medium">Address:</span>
                <span className="text-right">{employee.address}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
