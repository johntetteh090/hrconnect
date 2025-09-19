"use client"

import * as React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import {
  IconSearch,
  IconPlus,
  IconFilter,
  IconDots,
  IconEdit,
  IconTrash,
  IconEye,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendar,
  IconBuilding,
  IconX,
  IconUsers,
  IconCalendarEvent,
} from "@tabler/icons-react"

// Mock data
const employees = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@company.com",
    phone: "(555) 123-4567",
    position: "Senior Software Engineer",
    department: "Engineering",
    status: "active",
    joiningDate: "2022-03-15",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "2",
    name: "Mike Chen",
    email: "mike.chen@company.com",
    phone: "(555) 234-5678",
    position: "Product Manager",
    department: "Product",
    status: "active",
    joiningDate: "2021-08-20",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@company.com",
    phone: "(555) 345-6789",
    position: "HR Specialist",
    department: "Human Resources",
    status: "active",
    joiningDate: "2023-01-10",
    avatar: "/placeholder-avatar.jpg",
  },
  {
    id: "4",
    name: "John Smith",
    email: "john.smith@company.com",
    phone: "(555) 456-7890",
    position: "Marketing Coordinator",
    department: "Marketing",
    status: "inactive",
    joiningDate: "2020-11-05",
    avatar: "/placeholder-avatar.jpg",
  },
]

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)

  const openSidePanel = () => {
    setSidePanelOpen(true)
  }

  const closeSidePanel = () => {
    setSidePanelOpen(false)
  }

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || employee.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "inactive":
        return "secondary"
      case "terminated":
        return "destructive"
      default:
        return "default"
    }
  }

  return (
    <MainLayout 
      title="Employees" 
      description="Manage your organization's employee profiles and information"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex-1 max-w-sm">
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <IconFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" onClick={openSidePanel}>
              <IconPlus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
              <IconBuilding className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{employees.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <IconCalendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {employees.filter(e => e.status === "active").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently working</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New This Month</CardTitle>
              <IconPlus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Recent hires</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Departments</CardTitle>
              <IconBuilding className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Active departments</p>
            </CardContent>
          </Card>
        </div>

        {/* Employees List */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Directory</CardTitle>
            <CardDescription>
              View and manage all employees in your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={employee.avatar} alt={employee.name} />
                      <AvatarFallback>
                        {employee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{employee.name}</h3>
                        <Badge variant={getStatusColor(employee.status) as any}>
                          {employee.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <IconMail className="h-3 w-3" />
                          <span>{employee.email}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconPhone className="h-3 w-3" />
                          <span>{employee.phone}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconBuilding className="h-3 w-3" />
                          <span>{employee.department}</span>
                        </div>
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
                    <Button variant="ghost" size="icon">
                      <IconDots className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side Panel Overlay */}
      {sidePanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={closeSidePanel}
        />
      )}

      {/* Add Employee Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        sidePanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
                <IconUsers className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Add New Employee</h3>
                <p className="text-sm text-gray-600">Create a new employee profile</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeSidePanel}
              className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
            >
              <IconX className="h-4 w-4" />
            </Button>
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                    <Input id="firstName" placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                    <Input id="lastName" placeholder="Doe" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <div className="relative mt-1">
                    <IconMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="email" placeholder="john.doe@company.com" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <div className="relative mt-1">
                    <IconPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="phone" placeholder="+1 (555) 123-4567" className="pl-10" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-sm font-medium">Address</Label>
                  <div className="relative mt-1">
                    <IconMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="address" placeholder="123 Main Street, City, State" className="pl-10" />
                  </div>
                </div>
              </div>
              
              {/* Job Information */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Job Information</h4>
                <div>
                  <Label htmlFor="employeeId" className="text-sm font-medium">Employee ID</Label>
                  <Input id="employeeId" placeholder="EMP001" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="position" className="text-sm font-medium">Position</Label>
                  <Input id="position" placeholder="Software Engineer" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                  <div className="relative mt-1">
                    <IconBuilding className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="department" placeholder="Engineering" className="pl-10" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
                    <div className="relative mt-1">
                      <IconCalendarEvent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input id="startDate" type="date" className="pl-10" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="salary" className="text-sm font-medium">Salary</Label>
                    <Input id="salary" placeholder="$75,000" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="manager" className="text-sm font-medium">Reporting Manager</Label>
                  <Input id="manager" placeholder="Jane Smith" className="mt-1" />
                </div>
              </div>

              {/* Employment Details */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Employment Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="employmentType" className="text-sm font-medium">Employment Type</Label>
                    <Input id="employmentType" placeholder="Full-time" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="workLocation" className="text-sm font-medium">Work Location</Label>
                    <Input id="workLocation" placeholder="Remote / Office" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="emergencyContact" className="text-sm font-medium">Emergency Contact</Label>
                  <Input id="emergencyContact" placeholder="Contact Name - Phone Number" className="mt-1" />
                </div>
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex space-x-3">
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  // Handle employee creation
                  closeSidePanel()
                }}
              >
                <IconPlus className="mr-2 h-4 w-4" />
                Create Employee
              </Button>
              <Button variant="outline" onClick={closeSidePanel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
