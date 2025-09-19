"use client"

import * as React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconCalendar,
  IconPlus,
  IconFilter,
  IconCheck,
  IconX,
  IconClock,
  IconUser,
  IconCalendarEvent,
  IconMapPin,
  IconFileText,
} from "@tabler/icons-react"

// Mock data
const leaveRequests = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-avatar.jpg",
      department: "Engineering",
    },
    type: "vacation",
    startDate: "2024-01-15",
    endDate: "2024-01-20",
    days: 5,
    reason: "Family vacation",
    status: "pending",
    submittedAt: "2024-01-10",
  },
  {
    id: "2",
    employee: {
      name: "Mike Chen",
      avatar: "/placeholder-avatar.jpg",
      department: "Product",
    },
    type: "sick",
    startDate: "2024-01-12",
    endDate: "2024-01-12",
    days: 1,
    reason: "Doctor appointment",
    status: "approved",
    submittedAt: "2024-01-11",
  },
  {
    id: "3",
    employee: {
      name: "Emily Davis",
      avatar: "/placeholder-avatar.jpg",
      department: "HR",
    },
    type: "personal",
    startDate: "2024-01-18",
    endDate: "2024-01-19",
    days: 2,
    reason: "Personal matters",
    status: "rejected",
    submittedAt: "2024-01-15",
  },
  {
    id: "4",
    employee: {
      name: "John Smith",
      avatar: "/placeholder-avatar.jpg",
      department: "Marketing",
    },
    type: "maternity",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    days: 90,
    reason: "Maternity leave",
    status: "pending",
    submittedAt: "2024-01-08",
  },
]

const leaveTypes = {
  vacation: { label: "Vacation", color: "blue" },
  sick: { label: "Sick Leave", color: "red" },
  personal: { label: "Personal", color: "yellow" },
  maternity: { label: "Maternity", color: "green" },
  paternity: { label: "Paternity", color: "purple" },
  bereavement: { label: "Bereavement", color: "gray" },
}

export default function LeavePage() {
  const [filterStatus, setFilterStatus] = React.useState("all")

  const filteredRequests = leaveRequests.filter((request) => {
    return filterStatus === "all" || request.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning"
      case "approved":
        return "success"
      case "rejected":
        return "destructive"
      default:
        return "default"
    }
  }

  const getTypeColor = (type: string) => {
    const typeInfo = leaveTypes[type as keyof typeof leaveTypes]
    return typeInfo?.color || "default"
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  return (
    <MainLayout 
      title="Leave Management" 
      description="Manage employee leave requests and approvals"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <IconFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <IconPlus className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <IconClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leaveRequests.filter(r => r.status === "pending").length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved This Month</CardTitle>
              <IconCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leaveRequests.filter(r => r.status === "approved").length}
              </div>
              <p className="text-xs text-muted-foreground">Successfully approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Days</CardTitle>
              <IconCalendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {leaveRequests.reduce((sum, r) => sum + r.days, 0)}
              </div>
              <p className="text-xs text-muted-foreground">Days requested</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Days</CardTitle>
              <IconCalendarEvent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(leaveRequests.reduce((sum, r) => sum + r.days, 0) / leaveRequests.length)}
              </div>
              <p className="text-xs text-muted-foreground">Per request</p>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests List */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>
              Review and manage employee leave requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={request.employee.avatar} alt={request.employee.name} />
                      <AvatarFallback>
                        {request.employee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{request.employee.name}</h3>
                        <Badge variant={getStatusColor(request.status) as any}>
                          {request.status}
                        </Badge>
                        <Badge variant="outline">
                          {leaveTypes[request.type as keyof typeof leaveTypes]?.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{request.employee.department}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <IconCalendar className="h-3 w-3" />
                          <span>{formatDate(request.startDate)} - {formatDate(request.endDate)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconClock className="h-3 w-3" />
                          <span>{request.days} days</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconFileText className="h-3 w-3" />
                          <span>{request.reason}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {request.status === "pending" && (
                      <>
                        <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
                          <IconCheck className="mr-1 h-4 w-4" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <IconX className="mr-1 h-4 w-4" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="icon">
                      <IconUser className="h-4 w-4" />
                    </Button>
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
