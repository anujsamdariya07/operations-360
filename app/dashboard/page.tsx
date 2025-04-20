import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ClipboardList, Package, Users } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Operations360</h1>
        <p className="text-muted-foreground">Overview of your business operations</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">3 items below threshold</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">2 absent today</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: "ORD-7892", customer: "Acme Corp", status: "Processing", amount: "₹1,200.00", date: "Today" },
                {
                  id: "ORD-7891",
                  customer: "TechGiant Inc",
                  status: "Shipped",
                  amount: "₹3,450.00",
                  date: "Yesterday",
                },
                {
                  id: "ORD-7890",
                  customer: "Global Supplies",
                  status: "Delivered",
                  amount: "₹890.50",
                  date: "2 days ago",
                },
                {
                  id: "ORD-7889",
                  customer: "Local Manufacturing",
                  status: "Completed",
                  amount: "₹2,100.00",
                  date: "3 days ago",
                },
              ].map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm ${order.status === "Processing" ? "text-orange-500" : order.status === "Shipped" ? "text-blue-500" : "text-green-500"}`}
                    >
                      {order.status}
                    </p>
                    <p className="text-sm font-medium">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Alerts</CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Low Inventory Alert</p>
                  <p className="text-sm text-muted-foreground">
                    Product 'Box Type A' is below threshold quantity (5 remaining)
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <div>
                  <p className="text-sm font-medium">Employee Absence</p>
                  <p className="text-sm text-muted-foreground">Employee John Doe is absent today</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">Low Inventory Alert</p>
                  <p className="text-sm text-muted-foreground">
                    Product 'Packaging Tape' is below threshold quantity (2 remaining)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
