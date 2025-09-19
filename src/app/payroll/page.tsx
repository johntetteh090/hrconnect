"use client"

import * as React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconCurrencyDollar,
  IconPlus,
  IconFilter,
  IconDownload,
  IconEye,
  IconEdit,
  IconCheck,
  IconClock,
  IconTrendingUp,
  IconTrendingDown,
  IconUser,
  IconCalendar,
  IconBuilding,
} from "@tabler/icons-react"

// Mock data
const payrollRecords = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-avatar.jpg",
      department: "Engineering",
      position: "Senior Software Engineer",
    },
    period: "January 2024",
    basicSalary: 8000,
    allowances: {
      housing: 2000,
      transport: 500,
      medical: 300,
      other: 200,
    },
    deductions: {
      tax: 1200,
      insurance: 400,
      retirement: 800,
      other: 100,
    },
    netSalary: 8500,
    status: "paid",
    paidAt: "2024-01-31",
  },
  {
    id: "2",
    employee: {
      name: "Mike Chen",
      avatar: "/placeholder-avatar.jpg",
      department: "Product",
      position: "Product Manager",
    },
    period: "January 2024",
    basicSalary: 9000,
    allowances: {
      housing: 2000,
      transport: 500,
      medical: 300,
      other: 100,
    },
    deductions: {
      tax: 1350,
      insurance: 450,
      retirement: 900,
      other: 50,
    },
    netSalary: 9200,
    status: "paid",
    paidAt: "2024-01-31",
  },
  {
    id: "3",
    employee: {
      name: "Emily Davis",
      avatar: "/placeholder-avatar.jpg",
      department: "HR",
      position: "HR Specialist",
    },
    period: "January 2024",
    basicSalary: 6000,
    allowances: {
      housing: 1500,
      transport: 400,
      medical: 200,
      other: 100,
    },
    deductions: {
      tax: 900,
      insurance: 300,
      retirement: 600,
      other: 50,
    },
    netSalary: 6450,
    status: "pending",
    paidAt: null,
  },
  {
    id: "4",
    employee: {
      name: "John Smith",
      avatar: "/placeholder-avatar.jpg",
      department: "Marketing",
      position: "Marketing Coordinator",
    },
    period: "January 2024",
    basicSalary: 5500,
    allowances: {
      housing: 1200,
      transport: 300,
      medical: 200,
      other: 100,
    },
    deductions: {
      tax: 825,
      insurance: 275,
      retirement: 550,
      other: 50,
    },
    netSalary: 5600,
    status: "draft",
    paidAt: null,
  },
]

export default function PayrollPage() {
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [selectedPeriod, setSelectedPeriod] = React.useState("January 2024")

  const filteredRecords = payrollRecords.filter((record) => {
    return filterStatus === "all" || record.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "success"
      case "pending":
        return "warning"
      case "draft":
        return "secondary"
      default:
        return "default"
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount)
  }

  const totalGrossSalary = payrollRecords.reduce((sum, record) => {
    const allowances = Object.values(record.allowances).reduce((a, b) => a + b, 0)
    return sum + record.basicSalary + allowances
  }, 0)

  const totalDeductions = payrollRecords.reduce((sum, record) => {
    return sum + Object.values(record.deductions).reduce((a, b) => a + b, 0)
  }, 0)

  const totalNetSalary = payrollRecords.reduce((sum, record) => sum + record.netSalary, 0)

  const paidCount = payrollRecords.filter(r => r.status === "paid").length
  const pendingCount = payrollRecords.filter(r => r.status === "pending").length

  return (
    <MainLayout 
      title="Payroll Management" 
      description="Manage employee compensation, benefits, and salary processing"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="January 2024">January 2024</option>
              <option value="December 2023">December 2023</option>
              <option value="November 2023">November 2023</option>
            </select>
            <Button variant="outline" size="sm">
              <IconFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <IconDownload className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button size="sm">
              <IconPlus className="mr-2 h-4 w-4" />
              Process Payroll
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Gross Salary</CardTitle>
              <IconCurrencyDollar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalGrossSalary)}</div>
              <p className="text-xs text-muted-foreground">Before deductions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Deductions</CardTitle>
              <IconTrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalDeductions)}</div>
              <p className="text-xs text-muted-foreground">Taxes & benefits</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Pay</CardTitle>
              <IconTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalNetSalary)}</div>
              <p className="text-xs text-muted-foreground">After deductions</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid Employees</CardTitle>
              <IconCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{paidCount}</div>
              <p className="text-xs text-muted-foreground">Out of {payrollRecords.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Records */}
        <Card>
          <CardHeader>
            <CardTitle>Payroll Records</CardTitle>
            <CardDescription>
              Employee salary details for {selectedPeriod}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="p-6 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={record.employee.avatar} alt={record.employee.name} />
                        <AvatarFallback>
                          {record.employee.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{record.employee.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {record.employee.position} • {record.employee.department}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getStatusColor(record.status) as any}>
                            {record.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {record.period}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <IconEye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <IconEdit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Basic Salary */}
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Earnings</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Basic Salary:</span>
                          <span className="font-medium">{formatCurrency(record.basicSalary)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Housing:</span>
                          <span className="font-medium">{formatCurrency(record.allowances.housing)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Transport:</span>
                          <span className="font-medium">{formatCurrency(record.allowances.transport)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Medical:</span>
                          <span className="font-medium">{formatCurrency(record.allowances.medical)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other:</span>
                          <span className="font-medium">{formatCurrency(record.allowances.other)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1 font-semibold">
                          <span>Total Earnings:</span>
                          <span className="text-green-600">
                            {formatCurrency(record.basicSalary + Object.values(record.allowances).reduce((a, b) => a + b, 0))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Deductions */}
                    <div>
                      <h4 className="font-medium mb-2 text-red-600">Deductions</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span className="font-medium">{formatCurrency(record.deductions.tax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Insurance:</span>
                          <span className="font-medium">{formatCurrency(record.deductions.insurance)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Retirement:</span>
                          <span className="font-medium">{formatCurrency(record.deductions.retirement)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other:</span>
                          <span className="font-medium">{formatCurrency(record.deductions.other)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-1 font-semibold">
                          <span>Total Deductions:</span>
                          <span className="text-red-600">
                            {formatCurrency(Object.values(record.deductions).reduce((a, b) => a + b, 0))}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Net Salary */}
                    <div>
                      <h4 className="font-medium mb-2 text-blue-600">Net Salary</h4>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {formatCurrency(record.netSalary)}
                        </div>
                        {record.paidAt && (
                          <div className="text-sm text-muted-foreground">
                            Paid on {new Date(record.paidAt).toLocaleDateString()}
                          </div>
                        )}
                        {record.status === "pending" && (
                          <div className="text-sm text-yellow-600">
                            Pending payment
                          </div>
                        )}
                        {record.status === "draft" && (
                          <div className="text-sm text-gray-600">
                            Draft - not processed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
