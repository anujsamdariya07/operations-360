"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Copy, Filter, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock employees data
  const employees = [
    {
      id: "EMP-001",
      name: "John Doe",
      image: "/placeholder.svg?height=50&width=50",
      position: "Production Manager",
      status: "Active",
      contact: "+91 9876543210",
    },
    {
      id: "EMP-002",
      name: "Jane Smith",
      image: "/placeholder.svg?height=50&width=50",
      position: "Machine Operator",
      status: "Active",
      contact: "+91 9876543211",
    },
    {
      id: "EMP-003",
      name: "Robert Johnson",
      image: "/placeholder.svg?height=50&width=50",
      position: "Quality Control",
      status: "Active",
      contact: "+91 9876543212",
    },
    {
      id: "EMP-004",
      name: "Emily Davis",
      image: "/placeholder.svg?height=50&width=50",
      position: "Packaging Specialist",
      status: "Inactive",
      contact: "+91 9876543213",
    },
    {
      id: "EMP-005",
      name: "Michael Wilson",
      image: "/placeholder.svg?height=50&width=50",
      position: "Warehouse Manager",
      status: "Active",
      contact: "+91 9876543214",
    },
  ]

  // Filter employees based on search term
  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.contact.includes(searchTerm),
  )

  // Function to copy employee link
  const copyEmployeeLink = (employeeId: string) => {
    const url = `${window.location.origin}/dashboard/employees/${employeeId}`
    navigator.clipboard.writeText(url)
    alert(`Link copied to clipboard: ${url}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employees</h1>
          <p className="text-muted-foreground">Manage your workforce</p>
        </div>
        <Link href="/dashboard/employees/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </Link>
      </div>

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
                  <th className="pb-3 pr-4">Contact</th>
                  <th className="pb-3 pr-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b">
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          <div className="relative h-10 w-10">
                            <Image
                              src={employee.image || "/placeholder.svg"}
                              alt={employee.name}
                              fill
                              className="rounded-full object-cover"
                            />
                          </div>
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
                      <td className="py-4 pr-4">{employee.contact}</td>
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-2">
                          <Link href={`/dashboard/employees/${employee.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyEmployeeLink(employee.id)}
                            title="Copy employee link"
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
                      No employees found matching your search.
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
