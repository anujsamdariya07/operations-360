"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Clock, Download, FileText, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
    baseSalary: 45000,
    overtimeRate: 250,
    attendance: {
      present: 22,
      absent: 3,
      total: 25,
    },
    overtimeHours: 8,
    advance: 5000,
    previousDue: 0,
    dailyRecord: [
      { date: "2025-04-01", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 1 },
      { date: "2025-04-02", status: "Present", checkIn: "08:45 AM", checkOut: "05:15 PM", overtime: 0 },
      { date: "2025-04-03", status: "Present", checkIn: "08:15 AM", checkOut: "05:45 PM", overtime: 1 },
      { date: "2025-04-04", status: "Absent", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-05", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-06", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-07", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-08", status: "Present", checkIn: "08:20 AM", checkOut: "06:30 PM", overtime: 2 },
      { date: "2025-04-09", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-10", status: "Present", checkIn: "08:15 AM", checkOut: "05:45 PM", overtime: 1 },
      { date: "2025-04-11", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-12", status: "Present", checkIn: "08:45 AM", checkOut: "05:15 PM", overtime: 0 },
      { date: "2025-04-13", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-14", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-15", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-16", status: "Present", checkIn: "08:15 AM", checkOut: "06:15 PM", overtime: 1 },
      { date: "2025-04-17", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-18", status: "Absent", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-19", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-20", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-21", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-22", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-23", status: "Present", checkIn: "08:15 AM", checkOut: "06:15 PM", overtime: 1 },
      { date: "2025-04-24", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-25", status: "Absent", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-26", status: "Present", checkIn: "08:30 AM", checkOut: "06:30 PM", overtime: 1 },
      { date: "2025-04-27", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-28", status: "Weekend", checkIn: "-", checkOut: "-", overtime: 0 },
      { date: "2025-04-29", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
      { date: "2025-04-30", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM", overtime: 0 },
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
    baseSalary: 35000,
    overtimeRate: 200,
    attendance: {
      present: 25,
      absent: 0,
      total: 25,
    },
    overtimeHours: 12,
    advance: 0,
    previousDue: 2000,
    dailyRecord: [
      // Similar daily records would be here
    ],
  },
}

export default function EmployeeSalaryPage() {
  const params = useParams()
  const router = useRouter()
  const employeeId = params.id as string
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" })

  // State for pay slip dialog
  const [isPaySlipOpen, setIsPaySlipOpen] = useState(false)
  const [paymentMode, setPaymentMode] = useState("cash")
  const [additionalNotes, setAdditionalNotes] = useState("")

  // Get employee data
  const employee = employeeData[employeeId]

  // If employee not found, show error
  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-4">Employee Not Found</h1>
        <p className="text-muted-foreground mb-6">The employee you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/dashboard/salary-distribution")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Salary Distribution
        </Button>
      </div>
    )
  }

  // Calculate salary details
  const workingDays = employee.attendance.total - 8 // Excluding weekends (4 weekends in a month)
  const dailySalary = employee.baseSalary / workingDays
  const earnedSalary = dailySalary * employee.attendance.present
  const overtimePay = employee.overtimeHours * employee.overtimeRate
  const totalSalary = earnedSalary + overtimePay
  const netPayable = totalSalary - employee.advance - employee.previousDue

  // Function to generate pay slip
  const generatePaySlip = () => {
    // In a real app, you would generate a PDF or print the pay slip
    // For this demo, we'll just show a dialog
    setIsPaySlipOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.push("/dashboard/salary-distribution")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{employee.name}</h1>
            <p className="text-muted-foreground">Employee ID: {employee.id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/employees/${employeeId}`)}>
            <User className="mr-2 h-4 w-4" />
            View Profile
          </Button>
          <Button onClick={generatePaySlip}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Pay Slip
          </Button>
        </div>
      </div>

      {/* Salary Period */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Salary Period</CardTitle>
            <CardDescription>Monthly salary calculation for {currentMonth}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{currentMonth}</span>
          </div>
        </CardHeader>
      </Card>

      {/* Salary Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Present Days:</span>
                <span className="font-medium">{employee.attendance.present}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Absent Days:</span>
                <span className="font-medium">{employee.attendance.absent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Working Days:</span>
                <span className="font-medium">{workingDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Attendance Rate:</span>
                <span className="font-medium">{Math.round((employee.attendance.present / workingDays) * 100)}%</span>
              </div>
            </div>
            <Progress
              value={(employee.attendance.present / workingDays) * 100}
              className="h-2"
              indicatorClassName={
                (employee.attendance.present / workingDays) * 100 < 80 ? "bg-orange-500" : "bg-green-500"
              }
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overtime</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overtime Hours:</span>
                <span className="font-medium">{employee.overtimeHours} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overtime Rate:</span>
                <span className="font-medium">₹{employee.overtimeRate}/hour</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overtime Pay:</span>
                <span className="font-medium">₹{overtimePay.toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Calculation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base Salary:</span>
                <span className="font-medium">₹{employee.baseSalary.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Daily Rate:</span>
                <span className="font-medium">₹{Math.round(dailySalary).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Earned Salary:</span>
                <span className="font-medium">₹{Math.round(earnedSalary).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Salary:</span>
                <span className="font-medium">₹{Math.round(totalSalary).toLocaleString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Deductions and Net Payable */}
      <Card>
        <CardHeader>
          <CardTitle>Deductions and Net Payable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Deductions</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Advance:</span>
                  <span className="font-medium">₹{employee.advance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Previous Due:</span>
                  <span className="font-medium">₹{employee.previousDue.toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Deductions:</span>
                  <span className="font-medium">₹{(employee.advance + employee.previousDue).toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Net Payable</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Earnings:</span>
                  <span className="font-medium">₹{Math.round(totalSalary).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Deductions:</span>
                  <span className="font-medium">₹{(employee.advance + employee.previousDue).toLocaleString()}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-bold">
                  <span>Net Payable:</span>
                  <span className="text-green-600">₹{Math.round(netPayable).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Record */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Record</CardTitle>
          <CardDescription>Daily attendance for {currentMonth}</CardDescription>
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
                  <TableHead>Overtime</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employee.dailyRecord.slice(0, 10).map((record) => (
                  <TableRow key={record.date}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          record.status === "Present"
                            ? "outline"
                            : record.status === "Weekend"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {record.status}
                      </Badge>
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
                    <TableCell>{record.overtime} hours</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 text-center">
            <Button variant="outline" onClick={() => alert("This would show the full attendance record")}>
              View Full Attendance Record
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pay Slip Dialog */}
      <Dialog open={isPaySlipOpen} onOpenChange={setIsPaySlipOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Generate Pay Slip</DialogTitle>
            <DialogDescription>Enter payment details to generate the pay slip</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="paymentMode">Payment Mode</Label>
              <Select value={paymentMode} onValueChange={setPaymentMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="online">Online Transfer</SelectItem>
                  <SelectItem value="creditCard">Credit Card</SelectItem>
                  <SelectItem value="debitCard">Debit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
              <Input
                id="additionalNotes"
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Enter any additional notes"
              />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Pay Slip Summary</h3>
              <div className="rounded-md border p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employee:</span>
                  <span className="font-medium">{employee.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span className="font-medium">{employee.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Period:</span>
                  <span className="font-medium">{currentMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Net Payable:</span>
                  <span className="font-medium">₹{Math.round(netPayable).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Mode:</span>
                  <span className="font-medium">{paymentMode.charAt(0).toUpperCase() + paymentMode.slice(1)}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaySlipOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                alert("Pay slip generated and ready for download!")
                setIsPaySlipOpen(false)
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Generate Pay Slip
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
