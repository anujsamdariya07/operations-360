"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Calendar, Clock, Download, Filter, Search, User } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Mock employees data
const employees = [
  {
    id: "EMP-001",
    name: "John Doe",
    image: "/placeholder.svg?height=50&width=50",
    position: "Production Manager",
    status: "Active",
    salary: "₹45,000",
    attendance: {
      present: 22,
      absent: 3,
      total: 25,
    },
  },
  {
    id: "EMP-002",
    name: "Jane Smith",
    image: "/placeholder.svg?height=50&width=50",
    position: "Machine Operator",
    status: "Active",
    salary: "₹35,000",
    attendance: {
      present: 25,
      absent: 0,
      total: 25,
    },
  },
  {
    id: "EMP-003",
    name: "Robert Johnson",
    image: "/placeholder.svg?height=50&width=50",
    position: "Quality Control",
    status: "Active",
    salary: "₹40,000",
    attendance: {
      present: 20,
      absent: 5,
      total: 25,
    },
  },
  {
    id: "EMP-004",
    name: "Emily Davis",
    image: "/placeholder.svg?height=50&width=50",
    position: "Packaging Specialist",
    status: "Inactive",
    salary: "₹38,000",
    attendance: {
      present: 0,
      absent: 25,
      total: 25,
    },
  },
  {
    id: "EMP-005",
    name: "Michael Wilson",
    image: "/placeholder.svg?height=50&width=50",
    position: "Warehouse Manager",
    status: "Active",
    salary: "₹50,000",
    attendance: {
      present: 24,
      absent: 1,
      total: 25,
    },
  },
]

export default function SalaryDistributionPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" })

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Salary Distribution</h1>
        <p className="text-muted-foreground">Manage employee salaries and generate pay slips</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Current Month</CardTitle>
            <CardDescription>Salary period for {currentMonth}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-medium">{currentMonth}</span>
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search employees..."
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
            <CardTitle>Employee List</CardTitle>
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
                  <th className="pb-3 pr-4">Position</th>
                  <th className="pb-3 pr-4">Status</th>
                  <th className="pb-3 pr-4">Attendance</th>
                  <th className="pb-3 pr-4">Monthly Salary</th>
                  <th className="pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <User className="h-8 w-8 rounded-full bg-muted p-1" />
                          <div className="font-medium">{employee.name}</div>
                        </div>
                      </td>
                      <td className="py-4 pr-4">{employee.id}</td>
                      <td className="py-4 pr-4">{employee.position}</td>
                      <td className="py-4 pr-4">
                        <Badge variant={employee.status === "Active" ? "outline" : "secondary"}>
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center">
                          <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span
                            className={
                              employee.attendance.present === 0
                                ? "text-red-500"
                                : employee.attendance.present < employee.attendance.total * 0.8
                                  ? "text-orange-500"
                                  : "text-green-500"
                            }
                          >
                            {employee.attendance.present}/{employee.attendance.total} days
                          </span>
                        </div>
                      </td>
                      <td className="py-4 pr-4">{employee.salary}</td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/salary-distribution/${employee.id}`)}
                          >
                            Details
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-4 text-center text-muted-foreground">
                      No employees found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={() => alert("This would generate salary reports for all employees")}>
          <Download className="mr-2 h-4 w-4" />
          Generate All Pay Slips
        </Button>
      </div>
    </div>
  )
}
