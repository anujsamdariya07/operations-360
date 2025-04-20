"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, ArrowUpDown, Copy, Filter, Plus, Minus, Search, Trash2, Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Define product type
interface Product {
  id: string
  name: string
  sku: string
  image: string
  quantity: number
  threshold: number
  lastUpdated: string
  dealers?: Dealer[]
}

interface Dealer {
  id: string
  name: string
  contact: string
  lastSupplied: string
  price: string
}

// Define order type for dropdown
interface Order {
  id: string
  customer: string
  status: string
}

// Define customer type for dropdown
interface Customer {
  id: number
  name: string
}

export default function InventoryPage() {
  // Mock orders data for dropdown
  const orders: Order[] = [
    { id: "ORD-7892", customer: "Acme Corp", status: "Processing" },
    { id: "ORD-7891", customer: "TechGiant Inc", status: "Processing" },
    { id: "ORD-7890", customer: "Global Supplies", status: "Processing" },
    { id: "ORD-7889", customer: "Local Manufacturing", status: "Processing" },
    { id: "ORD-7888", customer: "City Builders", status: "Processing" },
  ]

  // Mock customers data for dropdown
  const customers: Customer[] = [
    { id: 1, name: "Acme Corp" },
    { id: 2, name: "TechGiant Inc" },
    { id: 3, name: "Global Supplies" },
    { id: 4, name: "Local Manufacturing" },
    { id: 5, name: "City Builders" },
  ]

  // Initial product data with lastUpdated field and dealers
  const [products, setProducts] = useState<Product[]>([
    {
      id: "PROD-001",
      name: "Box Type A",
      sku: "BOX-001",
      image: "/placeholder.svg?height=200&width=200",
      quantity: 120,
      threshold: 20,
      lastUpdated: "2025-04-10",
      dealers: [
        { id: "DEA-001", name: "PackageMart", contact: "+91 9876543210", lastSupplied: "2025-04-05", price: "₹110" },
        {
          id: "DEA-002",
          name: "BoxSupplies Ltd",
          contact: "+91 9876543211",
          lastSupplied: "2025-03-20",
          price: "₹115",
        },
      ],
    },
    {
      id: "PROD-002",
      name: "Box Type B",
      sku: "BOX-002",
      image: "/placeholder.svg?height=200&width=200",
      quantity: 85,
      threshold: 15,
      lastUpdated: "2025-04-12",
      dealers: [
        { id: "DEA-001", name: "PackageMart", contact: "+91 9876543210", lastSupplied: "2025-04-08", price: "₹140" },
      ],
    },
    {
      id: "PROD-003",
      name: "Packaging Tape",
      sku: "TAPE-001",
      image: "/placeholder.svg?height=200&width=200",
      quantity: 2,
      threshold: 10,
      lastUpdated: "2025-04-15",
      dealers: [
        { id: "DEA-003", name: "TapeWorld", contact: "+91 9876543212", lastSupplied: "2025-04-10", price: "₹75" },
      ],
    },
    {
      id: "PROD-004",
      name: "Bubble Wrap",
      sku: "WRAP-001",
      image: "/placeholder.svg?height=200&width=200",
      quantity: 45,
      threshold: 20,
      lastUpdated: "2025-04-08",
      dealers: [
        { id: "DEA-004", name: "PackingPros", contact: "+91 9876543213", lastSupplied: "2025-04-01", price: "₹140" },
        { id: "DEA-005", name: "WrapMasters", contact: "+91 9876543214", lastSupplied: "2025-03-15", price: "₹145" },
      ],
    },
    {
      id: "PROD-005",
      name: "Box Type C",
      sku: "BOX-003",
      image: "/placeholder.svg?height=200&width=200",
      quantity: 5,
      threshold: 10,
      lastUpdated: "2025-04-14",
      dealers: [
        { id: "DEA-001", name: "PackageMart", contact: "+91 9876543210", lastSupplied: "2025-04-12", price: "₹95" },
      ],
    },
  ])

  // State for product detail dialog
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // State for add/edit product dialog
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: "",
    sku: "",
    image: "/placeholder.svg?height=200&width=200",
    quantity: 0,
    threshold: 0,
  })

  // State for delete confirmation
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // State for update quantity dialog
  const [isUpdateQuantityOpen, setIsUpdateQuantityOpen] = useState(false)
  const [quantityUpdateType, setQuantityUpdateType] = useState<"increase" | "decrease">("increase")
  const [quantityUpdateForm, setQuantityUpdateForm] = useState({
    quantity: 1,
    dealerName: "",
    orderId: "",
    customerId: "",
    threshold: 0,
  })

  // State for search
  const [searchTerm, setSearchTerm] = useState("")

  // File input ref for image upload
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Function to open product detail dialog
  const openProductDetail = (product: Product) => {
    setSelectedProduct(product)
    setIsDialogOpen(true)
  }

  // Function to open add product dialog
  const openAddProductDialog = () => {
    setProductForm({
      name: "",
      sku: "",
      image: "/placeholder.svg?height=200&width=200",
      quantity: 0,
      threshold: 0,
    })
    setIsEditMode(false)
    setIsAddProductOpen(true)
  }

  // Function to open edit product dialog
  const openEditProductDialog = (product: Product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      sku: product.sku,
      image: product.image,
      quantity: product.quantity,
      threshold: product.threshold,
    })
    setIsEditMode(true)
    setIsAddProductOpen(true)
  }

  // Function to open update quantity dialog
  const openUpdateQuantityDialog = (product: Product, type: "increase" | "decrease") => {
    setSelectedProduct(product)
    setQuantityUpdateType(type)
    setQuantityUpdateForm({
      quantity: 1,
      dealerName: "",
      orderId: "",
      customerId: "",
      threshold: product.threshold,
    })
    setIsUpdateQuantityOpen(true)
  }

  // Function to handle product form change
  const handleProductFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProductForm({
      ...productForm,
      [name]: name === "quantity" || name === "threshold" ? Number.parseInt(value) : value,
    })
  }

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server and get a URL
      // For this demo, we'll create a local object URL
      const imageUrl = URL.createObjectURL(file)
      setProductForm({
        ...productForm,
        image: imageUrl,
      })
    }
  }

  // Function to trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  // Function to save product
  const saveProduct = () => {
    const currentDate = new Date().toISOString().split("T")[0]

    if (isEditMode && productForm.id) {
      // Update existing product
      setProducts(
        products.map((product) =>
          product.id === productForm.id
            ? {
                ...product,
                name: productForm.name || product.name,
                sku: productForm.sku || product.sku,
                image: productForm.image || product.image,
                quantity: productForm.quantity !== undefined ? productForm.quantity : product.quantity,
                threshold: productForm.threshold !== undefined ? productForm.threshold : product.threshold,
                lastUpdated: currentDate,
              }
            : product,
        ),
      )
    } else {
      // Add new product
      const newProduct: Product = {
        id: `PROD-${String(products.length + 1).padStart(3, "0")}`,
        name: productForm.name || "New Product",
        sku: productForm.sku || `SKU-${String(products.length + 1).padStart(3, "0")}`,
        image: productForm.image || "/placeholder.svg?height=200&width=200",
        quantity: productForm.quantity || 0,
        threshold: productForm.threshold || 10,
        lastUpdated: currentDate,
        dealers: [],
      }
      setProducts([...products, newProduct])
    }

    setIsAddProductOpen(false)
  }

  // Function to update product quantity
  const updateProductQuantity = () => {
    if (!selectedProduct) return

    const currentDate = new Date().toISOString().split("T")[0]
    const updatedProducts = [...products]
    const productIndex = updatedProducts.findIndex((p) => p.id === selectedProduct.id)

    if (productIndex === -1) return

    if (quantityUpdateType === "increase") {
      // Increase quantity
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: updatedProducts[productIndex].quantity + quantityUpdateForm.quantity,
        threshold: quantityUpdateForm.threshold || updatedProducts[productIndex].threshold,
        lastUpdated: currentDate,
      }

      // Add dealer if provided
      if (quantityUpdateForm.dealerName) {
        const newDealer: Dealer = {
          id: `DEA-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`,
          name: quantityUpdateForm.dealerName,
          contact: "Not provided",
          lastSupplied: currentDate,
          price: "Not provided",
        }

        updatedProducts[productIndex].dealers = [...(updatedProducts[productIndex].dealers || []), newDealer]
      }
    } else {
      // Decrease quantity
      const newQuantity = Math.max(0, updatedProducts[productIndex].quantity - quantityUpdateForm.quantity)
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        quantity: newQuantity,
        lastUpdated: currentDate,
      }
    }

    setProducts(updatedProducts)
    setIsUpdateQuantityOpen(false)
  }

  // Function to confirm delete
  const confirmDelete = (id: string) => {
    setDeleteProductId(id)
    setIsDeleteDialogOpen(true)
  }

  // Function to delete product
  const deleteProduct = () => {
    if (deleteProductId) {
      setProducts(products.filter((product) => product.id !== deleteProductId))
      setIsDeleteDialogOpen(false)
      setDeleteProductId(null)
    }
  }

  // Function to copy product link
  const copyProductLink = (productId: string) => {
    const url = `${window.location.origin}/dashboard/inventory/${productId}`
    navigator.clipboard.writeText(url)
    alert(`Link copied to clipboard: ${url}`)
  }

  // Filter products based on search term
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Get low stock products
  const lowStockProducts = filteredProducts.filter((product) => product.quantity < product.threshold)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button onClick={openAddProductDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="low">Low Stock ({lowStockProducts.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex items-center justify-between">
                <CardTitle>Product List</CardTitle>
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
                      <th className="pb-3 pr-4">Product</th>
                      <th className="pb-3 pr-4">SKU</th>
                      <th className="pb-3 pr-4">Quantity</th>
                      <th className="pb-3 pr-4">Status</th>
                      <th className="pb-3 pr-4">Last Updated</th>
                      <th className="pb-3 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded-md"
                              />
                              <div className="font-medium">{product.name}</div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">{product.sku}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <span className={product.quantity < product.threshold ? "text-red-500 font-medium" : ""}>
                                {product.quantity}
                              </span>
                              {product.quantity < product.threshold && <AlertCircle className="h-4 w-4 text-red-500" />}
                            </div>
                          </td>
                          <td className="py-4 pr-4">
                            <Badge variant={product.quantity < product.threshold ? "destructive" : "outline"}>
                              {product.quantity < product.threshold ? "Low Stock" : "In Stock"}
                            </Badge>
                          </td>
                          <td className="py-4 pr-4">{product.lastUpdated}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => openEditProductDialog(product)}>
                                Update Quantity
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openProductDetail(product)}>
                                Details
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openEditProductDialog(product)}>
                                Edit
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500"
                                onClick={() => confirmDelete(product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-muted-foreground">
                          No products found matching your search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="low" className="space-y-4">
          <Card>
            <CardHeader className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Low Stock Products</CardTitle>
                  <CardDescription>Products below threshold quantity</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b text-left text-sm font-medium">
                      <th className="pb-3 pr-4">Product</th>
                      <th className="pb-3 pr-4">SKU</th>
                      <th className="pb-3 pr-4">Quantity</th>
                      <th className="pb-3 pr-4">Threshold</th>
                      <th className="pb-3 pr-4">Last Updated</th>
                      <th className="pb-3 pr-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockProducts.length > 0 ? (
                      lowStockProducts.map((product) => (
                        <tr key={product.id} className="border-b">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-3">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="rounded-md"
                              />
                              <div className="font-medium">{product.name}</div>
                            </div>
                          </td>
                          <td className="py-4 pr-4">{product.sku}</td>
                          <td className="py-4 pr-4">
                            <span className="text-red-500 font-medium">{product.quantity}</span>
                          </td>
                          <td className="py-4 pr-4">{product.threshold}</td>
                          <td className="py-4 pr-4">{product.lastUpdated}</td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" onClick={() => openEditProductDialog(product)}>
                                Update Quantity
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openProductDetail(product)}>
                                Details
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => openEditProductDialog(product)}>
                                Edit
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-4 text-center text-muted-foreground">
                          No low stock products found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Product Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
            <DialogDescription>Detailed information about the product</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Product Name:</span>
                  <span>{selectedProduct.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Product ID:</span>
                  <span>{selectedProduct.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">SKU:</span>
                  <span>{selectedProduct.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Current Quantity:</span>
                  <span
                    className={selectedProduct.quantity < selectedProduct.threshold ? "text-red-500 font-medium" : ""}
                  >
                    {selectedProduct.quantity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Threshold:</span>
                  <span>{selectedProduct.threshold}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <Badge variant={selectedProduct.quantity < selectedProduct.threshold ? "destructive" : "outline"}>
                    {selectedProduct.quantity < selectedProduct.threshold ? "Low Stock" : "In Stock"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last Updated:</span>
                  <span>{selectedProduct.lastUpdated}</span>
                </div>
              </div>

              {/* Dealers Section */}
              <div className="pt-4">
                <h3 className="font-medium mb-2">Previous Dealers</h3>
                {selectedProduct.dealers && selectedProduct.dealers.length > 0 ? (
                  <div className="border rounded-md">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Dealer</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Last Supplied</TableHead>
                          <TableHead>Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedProduct.dealers.map((dealer) => (
                          <TableRow key={dealer.id}>
                            <TableCell>{dealer.name}</TableCell>
                            <TableCell>{dealer.contact}</TableCell>
                            <TableCell>{dealer.lastSupplied}</TableCell>
                            <TableCell>{dealer.price}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No dealer information available.</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => copyProductLink(selectedProduct.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add/Edit Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Product" : "Add New Product"}</DialogTitle>
            <DialogDescription>
              {isEditMode ? "Update the product information below." : "Fill in the details to add a new product."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Product Name
              </label>
              <Input
                id="name"
                name="name"
                value={productForm.name || ""}
                onChange={handleProductFormChange}
                placeholder="Enter product name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sku" className="text-sm font-medium">
                SKU
              </label>
              <Input
                id="sku"
                name="sku"
                value={productForm.sku || ""}
                onChange={handleProductFormChange}
                placeholder="Enter SKU"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Image</label>
              <div className="flex flex-col items-center gap-4">
                <div className="relative h-40 w-40">
                  <Image
                    src={productForm.image || "/placeholder.svg"}
                    alt="Product image"
                    fill
                    className="rounded-md object-cover"
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
                  Upload Image
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </label>
                <Input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={productForm.quantity || 0}
                  onChange={handleProductFormChange}
                  min={0}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="threshold" className="text-sm font-medium">
                  Threshold
                </label>
                <Input
                  id="threshold"
                  name="threshold"
                  type="number"
                  value={productForm.threshold || 0}
                  onChange={handleProductFormChange}
                  min={0}
                />
              </div>
            </div>
            {isEditMode && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => openUpdateQuantityDialog(productForm as Product, "increase")}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Stock
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => openUpdateQuantityDialog(productForm as Product, "decrease")}
                >
                  <Minus className="mr-2 h-4 w-4" />
                  Remove Stock
                </Button>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddProductOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveProduct}>{isEditMode ? "Update Product" : "Add Product"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={deleteProduct} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Update Quantity Dialog */}
      <Dialog open={isUpdateQuantityOpen} onOpenChange={setIsUpdateQuantityOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{quantityUpdateType === "increase" ? "Increase Quantity" : "Decrease Quantity"}</DialogTitle>
            <DialogDescription>
              {quantityUpdateType === "increase" ? "Add stock to inventory" : "Remove stock from inventory"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="updateQuantity">Quantity</Label>
              <Input
                id="updateQuantity"
                type="number"
                min={1}
                value={quantityUpdateForm.quantity}
                onChange={(e) =>
                  setQuantityUpdateForm({
                    ...quantityUpdateForm,
                    quantity: Number.parseInt(e.target.value) || 1,
                  })
                }
              />
            </div>

            {quantityUpdateType === "increase" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="dealerName">Dealer Name (Optional)</Label>
                  <Input
                    id="dealerName"
                    value={quantityUpdateForm.dealerName}
                    onChange={(e) =>
                      setQuantityUpdateForm({
                        ...quantityUpdateForm,
                        dealerName: e.target.value,
                      })
                    }
                    placeholder="Enter dealer name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="threshold">Threshold (Optional)</Label>
                  <Input
                    id="threshold"
                    type="number"
                    min={0}
                    value={quantityUpdateForm.threshold}
                    onChange={(e) =>
                      setQuantityUpdateForm({
                        ...quantityUpdateForm,
                        threshold: Number.parseInt(e.target.value) || 0,
                      })
                    }
                    placeholder="Update threshold quantity"
                  />
                </div>
              </>
            )}

            {quantityUpdateType === "decrease" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Select
                    value={quantityUpdateForm.orderId}
                    onValueChange={(value) =>
                      setQuantityUpdateForm({
                        ...quantityUpdateForm,
                        orderId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an order" />
                    </SelectTrigger>
                    <SelectContent>
                      {orders.map((order) => (
                        <SelectItem key={order.id} value={order.id}>
                          {order.id}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer</Label>
                  <Select
                    value={quantityUpdateForm.customerId}
                    onValueChange={(value) =>
                      setQuantityUpdateForm({
                        ...quantityUpdateForm,
                        customerId: value,
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id.toString()}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateQuantityOpen(false)}>
              Cancel
            </Button>
            <Button onClick={updateProductQuantity}>
              {quantityUpdateType === "increase" ? "Add Stock" : "Remove Stock"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
