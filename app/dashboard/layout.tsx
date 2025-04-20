"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AlertCircle,
  Bell,
  Box,
  Calendar,
  ChevronDown,
  ClipboardList,
  LogOut,
  Package,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [alertsOpen, setAlertsOpen] = useState(false)

  // Mock alerts for demonstration
  const alerts = [
    { id: 1, type: "inventory", message: "Product 'Box Type A' is below threshold quantity (5 remaining)" },
    { id: 2, type: "employee", message: "Employee John Doe is absent today" },
    { id: 3, type: "inventory", message: "Product 'Packaging Tape' is below threshold quantity (2 remaining)" },
  ]

  // Check if the current path matches the given path
  const isActive = (path: string) => {
    return pathname === path
  }

  // Show alerts dialog on initial load
  useEffect(() => {
    if (alerts.length > 0) {
      setAlertsOpen(true)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="h-6 w-6" />
            <span className="text-xl font-bold">Operations360</span>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setAlertsOpen(true)}>
              <Bell className="h-5 w-5" />
              {alerts.length > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                  {alerts.length}
                </Badge>
              )}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  <span className="hidden md:inline-block">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-64 flex-col border-r bg-muted/40 md:flex">
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard">
                  <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} className="w-full justify-start">
                    <ClipboardList className="mr-2 h-5 w-5" />
                    Dashboard
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/orders">
                  <Button
                    variant={isActive("/dashboard/orders") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <ClipboardList className="mr-2 h-5 w-5" />
                    Orders
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/inventory">
                  <Button
                    variant={isActive("/dashboard/inventory") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Package className="mr-2 h-5 w-5" />
                    Inventory
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/employees">
                  <Button
                    variant={isActive("/dashboard/employees") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Employees
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/attendance">
                  <Button
                    variant={isActive("/dashboard/attendance") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Calendar className="mr-2 h-5 w-5" />
                    Attendance
                  </Button>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/customers">
                  <Button
                    variant={isActive("/dashboard/customers") ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-5 w-5" />
                    Customers
                  </Button>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-background md:hidden">
            <div className="flex h-16 items-center border-b px-4">
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </Button>
              <span className="ml-4 text-lg font-bold">Menu</span>
            </div>
            <nav className="p-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant={isActive("/dashboard") ? "secondary" : "ghost"} className="w-full justify-start">
                      <ClipboardList className="mr-2 h-5 w-5" />
                      Dashboard
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/orders" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive("/dashboard/orders") ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <ClipboardList className="mr-2 h-5 w-5" />
                      Orders
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/inventory" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive("/dashboard/inventory") ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Package className="mr-2 h-5 w-5" />
                      Inventory
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/employees" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive("/dashboard/employees") ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Users className="mr-2 h-5 w-5" />
                      Employees
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/attendance" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive("/dashboard/attendance") ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <Calendar className="mr-2 h-5 w-5" />
                      Attendance
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard/customers" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive("/dashboard/customers") ? "secondary" : "ghost"}
                      className="w-full justify-start"
                    >
                      <User className="mr-2 h-5 w-5" />
                      Customers
                    </Button>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>

      {/* Alerts Dialog */}
      <Dialog open={alertsOpen} onOpenChange={setAlertsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Important Alerts</DialogTitle>
            <DialogDescription>The following items require your attention</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 rounded-lg border p-3">
                <AlertCircle className={`h-5 w-5 ${alert.type === "inventory" ? "text-orange-500" : "text-red-500"}`} />
                <div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => setAlertsOpen(false)}>Dismiss</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
