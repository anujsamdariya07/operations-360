"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

export default function NewEmployeePage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const verificationIdRef = useRef<HTMLInputElement>(null)

  // Form state
  const [employeeForm, setEmployeeForm] = useState({
    name: "",
    phone: "",
    address: "",
    shift: "morning",
    salary: "",
    age: "",
    overtime: "0",
    image: "/placeholder.svg?height=200&width=200",
    verificationId: "",
    verificationIdImage: "",
  })

  // Handle form changes
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEmployeeForm({
      ...employeeForm,
      [name]: value,
    })
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setEmployeeForm({
      ...employeeForm,
      [name]: value,
    })
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server and get a URL
      // For this demo, we'll create a local object URL
      const imageUrl = URL.createObjectURL(file)
      setEmployeeForm({
        ...employeeForm,
        image: imageUrl,
      })
    }
  }

  // Handle verification ID upload
  const handleVerificationIdUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server and get a URL
      // For this demo, we'll create a local object URL
      const imageUrl = URL.createObjectURL(file)
      setEmployeeForm({
        ...employeeForm,
        verificationIdImage: imageUrl,
      })
    }
  }

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Trigger verification ID input click
  const triggerVerificationIdInput = () => {
    verificationIdRef.current?.click()
  }

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!employeeForm.name || !employeeForm.phone || !employeeForm.salary || !employeeForm.age) {
      alert("Please fill in all required fields.")
      return
    }

    // In a real app, you would send this data to your API
    console.log("Employee created:", {
      id: `EMP-${Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0")}`,
      ...employeeForm,
      status: "Active",
    })

    // Navigate back to employees page
    router.push("/dashboard/employees")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Employee</h1>
        <p className="text-muted-foreground">Enter employee details to add them to the system</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Basic information about the employee</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <div className="flex flex-col items-center gap-2">
                <div className="relative h-40 w-40">
                  <Image
                    src={employeeForm.image || "/placeholder.svg"}
                    alt="Employee photo"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Button type="button" variant="outline" onClick={triggerFileInput}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={employeeForm.name}
                    onChange={handleFormChange}
                    placeholder="Enter employee name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={employeeForm.phone}
                    onChange={handleFormChange}
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={employeeForm.age}
                    onChange={handleFormChange}
                    placeholder="Enter age"
                    min={18}
                    max={100}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                name="address"
                value={employeeForm.address}
                onChange={handleFormChange}
                placeholder="Enter employee address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationId">Verification ID (Optional)</Label>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="flex-1">
                  <Input
                    id="verificationId"
                    name="verificationId"
                    value={employeeForm.verificationId}
                    onChange={handleFormChange}
                    placeholder="Enter ID number (Aadhar, PAN, etc.)"
                  />
                </div>
                <div>
                  <input
                    type="file"
                    ref={verificationIdRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleVerificationIdUpload}
                  />
                  <Button type="button" variant="outline" onClick={triggerVerificationIdInput}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload ID
                  </Button>
                </div>
              </div>
              {employeeForm.verificationIdImage && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-2">ID Document Preview:</p>
                  <div className="relative h-40 w-full max-w-md">
                    <Image
                      src={employeeForm.verificationIdImage || "/placeholder.svg"}
                      alt="Verification ID"
                      fill
                      className="rounded-md object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Employment Details</CardTitle>
            <CardDescription>Work-related information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="shift">Shift</Label>
                <Select value={employeeForm.shift} onValueChange={(value) => handleSelectChange("shift", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shift" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (6 AM - 2 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (2 PM - 10 PM)</SelectItem>
                    <SelectItem value="night">Night (10 PM - 6 AM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary">Monthly Salary (₹)</Label>
                <Input
                  id="salary"
                  name="salary"
                  type="number"
                  value={employeeForm.salary}
                  onChange={handleFormChange}
                  placeholder="Enter salary amount"
                  min={0}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="overtime">Overtime Rate (₹/hour)</Label>
                <Input
                  id="overtime"
                  name="overtime"
                  type="number"
                  value={employeeForm.overtime}
                  onChange={handleFormChange}
                  placeholder="Enter overtime rate"
                  min={0}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/employees")}>
            Cancel
          </Button>
          <Button type="submit">Add Employee</Button>
        </div>
      </form>
    </div>
  )
}
