"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { ArrowUpDown, Check, Clock, Download, Filter, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Define employee type
interface Employee {
  id: string
  name: string
  status: "Present" | "Absent"
  checkIn: string
  checkOut: string
}

export default function AttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Initial employee data
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "EMP-001", name: "John Doe", status: "Present", checkIn: "08:30 AM", checkOut: "05:30 PM" },
    { id: "EMP-002", name: "Jane Smith", status: "Present", checkIn: "08:45 AM", checkOut: "05:15 PM" },
    { id: "EMP-003", name: "Robert Johnson", status: "Present", checkIn: "08:15 AM", checkOut: "05:45 PM" },
    { id: "EMP-004", name: "Emily Davis", status: "Absent", checkIn: "-", checkOut: "-" },
    { id: "EMP-005", name: "Michael Wilson", status: "Present", checkIn: "08:50 AM", checkOut: "05:20 PM" },
    { id: "EMP-006", name: "Sarah Brown", status: "Present", checkIn: "09:00 AM", checkOut: "06:00 PM" },
    { id: "EMP-007", name: "David Miller", status: "Absent", checkIn: "-", checkOut: "-" },
  ])

  // Function to mark an employee as present
  const markPresent = (id: string) => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const ampm = hours >= 12 ? "PM" : "AM"
    const formattedHours = hours % 12 || 12
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const checkInTime = `${formattedHours}:${formattedMinutes} ${ampm}`

    setEmployees(
      employees.map((employee) =>
        employee.id === id
          ? { ...employee, status: "Present", checkIn: checkInTime, checkOut: "Not checked out" }
          : employee,
      ),
    )
  }

  // Calculate attendance summary
  const totalEmployees = employees.length
  const presentEmployees = employees.filter((employee) => employee.status === "Present").length
  const absentEmployees = totalEmployees - presentEmployees

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground">Track employee attendance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Select Date</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
          </CardContent>
        </Card>

        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle>Attendance Summary</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Total Employees</div>
                <div className="text-2xl font-bold">{totalEmployees}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Present</div>
                <div className="text-2xl font-bold text-green-500">{presentEmployees}</div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium text-muted-foreground">Absent</div>
                <div className="text-2xl font-bold text-red-500">{absentEmployees}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search employees..." className="w-full pl-8" />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Card>
        <CardHeader className="px-6 py-4">
          <div className="flex items-center justify-between">
            <CardTitle>Daily Attendance</CardTitle>
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
                  <th className="pb-3 pr-4">Employee</th>
                  <th className="pb-3 pr-4">ID</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Check In</th>
                  <th className="pb-3 pr-4">Check Out</th>
                  <th className="pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id} className="border-b">
                    <td className="py-4 pr-4">
                      <div className="font-medium">{employee.name}</div>
                    </td>
                    <td className="py-4 pr-4">{employee.id}</td>
                    <td className="py-4 pr-4">
                      <Badge variant={employee.status === "Present" ? "outline" : "secondary"}>{employee.status}</Badge>
                    </td>
                    <td className="py-4 pr-4">
                      {employee.checkIn !== "-" ? (
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {employee.checkIn}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-4 pr-4">
                      {employee.checkOut !== "-" ? (
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          {employee.checkOut}
                        </div>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-2">
                        {employee.status === "Present" ? (
                          <Button variant="outline" size="sm" className="text-green-500">
                            <Check className="mr-2 h-4 w-4" />
                            Marked
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => markPresent(employee.id)}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark Present
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
