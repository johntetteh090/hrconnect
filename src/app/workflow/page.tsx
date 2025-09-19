"use client"

import * as React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconWorkflow,
  IconPlus,
  IconFilter,
  IconClock,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconUser,
  IconCalendar,
  IconBell,
  IconSettings,
  IconArrowRight,
} from "@tabler/icons-react"

// Mock data
const workflowTasks = [
  {
    id: "1",
    title: "Leave Request Approval",
    type: "approval",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-avatar.jpg",
      department: "Engineering",
    },
    status: "pending",
    priority: "medium",
    assignedTo: "Mike Chen",
    dueDate: "2024-01-20",
    createdAt: "2024-01-15",
    description: "Vacation leave request for 5 days",
  },
  {
    id: "2",
    title: "Performance Review",
    type: "review",
    employee: {
      name: "Emily Davis",
      avatar: "/placeholder-avatar.jpg",
      department: "HR",
    },
    status: "in-progress",
    priority: "high",
    assignedTo: "John Smith",
    dueDate: "2024-01-25",
    createdAt: "2024-01-10",
    description: "Q3 performance review completion",
  },
  {
    id: "3",
    title: "Document Verification",
    type: "verification",
    employee: {
      name: "Mike Chen",
      avatar: "/placeholder-avatar.jpg",
      department: "Product",
    },
    status: "completed",
    priority: "low",
    assignedTo: "Emily Davis",
    dueDate: "2024-01-18",
    createdAt: "2024-01-12",
    description: "ID document verification for new hire",
  },
  {
    id: "4",
    title: "Payroll Processing",
    type: "processing",
    employee: {
      name: "John Smith",
      avatar: "/placeholder-avatar.jpg",
      department: "Marketing",
    },
    status: "overdue",
    priority: "high",
    assignedTo: "Sarah Johnson",
    dueDate: "2024-01-15",
    createdAt: "2024-01-08",
    description: "Monthly payroll processing and approval",
  },
]

const notifications = [
  {
    id: "1",
    title: "Leave Request Submitted",
    message: "Sarah Johnson submitted a vacation leave request",
    type: "info",
    isRead: false,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Performance Review Due",
    message: "Emily Davis's Q3 review is due in 3 days",
    type: "warning",
    isRead: false,
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    title: "Document Uploaded",
    message: "Mike Chen uploaded a new certificate",
    type: "success",
    isRead: true,
    createdAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    title: "Payroll Processed",
    message: "January payroll has been successfully processed",
    type: "success",
    isRead: true,
    createdAt: "2024-01-12T16:45:00Z",
  },
]

export default function WorkflowPage() {
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [filterPriority, setFilterPriority] = React.useState("all")

  const filteredTasks = workflowTasks.filter((task) => {
    const matchesStatus = filterStatus === "all" || task.status === filterStatus
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority
    return matchesStatus && matchesPriority
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning"
      case "in-progress":
        return "secondary"
      case "completed":
        return "success"
      case "overdue":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "warning"
      case "low":
        return "success"
      default:
        return "default"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "info":
        return <IconBell className="h-4 w-4 text-blue-500" />
      case "warning":
        return <IconAlertTriangle className="h-4 w-4 text-yellow-500" />
      case "success":
        return <IconCheck className="h-4 w-4 text-green-500" />
      case "error":
        return <IconX className="h-4 w-4 text-red-500" />
      default:
        return <IconBell className="h-4 w-4 text-gray-500" />
    }
  }

  const pendingTasks = workflowTasks.filter(t => t.status === "pending").length
  const completedTasks = workflowTasks.filter(t => t.status === "completed").length
  const overdueTasks = workflowTasks.filter(t => t.status === "overdue").length
  const unreadNotifications = notifications.filter(n => !n.isRead).length

  return (
    <MainLayout 
      title="Workflow Management" 
      description="Automate HR processes and manage workflow tasks"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <Button variant="outline" size="sm">
              <IconFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <IconPlus className="mr-2 h-4 w-4" />
              Create Workflow
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
              <IconClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingTasks}</div>
              <p className="text-xs text-muted-foreground">Awaiting action</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <IconCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedTasks}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
              <IconAlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{overdueTasks}</div>
              <p className="text-xs text-muted-foreground">Need attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Notifications</CardTitle>
              <IconBell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{unreadNotifications}</div>
              <p className="text-xs text-muted-foreground">Unread messages</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Workflow Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Tasks</CardTitle>
              <CardDescription>
                Manage automated HR processes and approvals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{task.title}</h3>
                        <Badge variant={getStatusColor(task.status) as any}>
                          {task.status}
                        </Badge>
                        <Badge variant={getPriorityColor(task.priority) as any}>
                          {task.priority}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="icon">
                        <IconArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <IconUser className="h-3 w-3" />
                          <span>{task.employee.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconUser className="h-3 w-3" />
                          <span>Assigned to {task.assignedTo}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <IconCalendar className="h-3 w-3" />
                        <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
              <CardDescription>
                Stay updated with HR workflow activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg hover:bg-accent/50 transition-colors ${
                      !notification.isRead ? "bg-blue-50 dark:bg-blue-950/20" : ""
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{notification.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </span>
                          {!notification.isRead && (
                            <Badge variant="secondary" className="text-xs">
                              New
                            </Badge>
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
      </div>
    </MainLayout>
  )
}
