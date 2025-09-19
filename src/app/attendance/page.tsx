"use client"

import * as React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconClock,
  IconCalendar,
  IconFilter,
  IconDownload,
  IconCircleCheck,
  IconCircleX,
  IconAlertTriangle,
  IconUser,
  IconClockCheck,
  IconClockOff,
} from "@tabler/icons-react"

// Mock data
const attendanceRecords = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-avatar.jpg",
      department: "Engineering",
    },
    date: "2024-01-15",
    checkIn: "09:00",
    checkOut: "17:30",
    hoursWorked: 8.5,
    overtimeHours: 0.5,
    status: "present",
    notes: "Overtime for project deadline",
  },
  {
    id: "2",
    employee: {
      name: "Mike Chen",
      avatar: "/placeholder-avatar.jpg",
      department: "Product",
    },
    date: "2024-01-15",
    checkIn: "08:45",
    checkOut: "17:15",
    hoursWorked: 8.5,
    overtimeHours: 0.5,
    status: "present",
    notes: "",
  },
  {
    id: "3",
    employee: {
      name: "Emily Davis",
      avatar: "/placeholder-avatar.jpg",
      department: "HR",
    },
    date: "2024-01-15",
    checkIn: "09:15",
    checkOut: "17:45",
    hoursWorked: 8.5,
    overtimeHours: 0.5,
    status: "late",
    notes: "Traffic delay",
  },
  {
    id: "4",
    employee: {
      name: "John Smith",
      avatar: "/placeholder-avatar.jpg",
      department: "Marketing",
    },
    date: "2024-01-15",
    checkIn: null,
    checkOut: null,
    hoursWorked: 0,
    overtimeHours: 0,
    status: "absent",
    notes: "Sick leave",
  },
]

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = React.useState("2024-01-15")
  const [filterStatus, setFilterStatus] = React.useState("all")

  const filteredRecords = attendanceRecords.filter((record) => {
    return filterStatus === "all" || record.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "success"
      case "late":
        return "warning"
      case "absent":
        return "destructive"
      case "half-day":
        return "secondary"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present":
        return <IconCircleCheck className="h-4 w-4 text-green-500" />
      case "late":
        return <IconAlertTriangle className="h-4 w-4 text-yellow-500" />
      case "absent":
        return <IconCircleX className="h-4 w-4 text-red-500" />
      case "half-day":
        return <IconClockOff className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  const totalHours = attendanceRecords.reduce((sum, record) => sum + record.hoursWorked, 0)
  const totalOvertime = attendanceRecords.reduce((sum, record) => sum + record.overtimeHours, 0)
  const presentCount = attendanceRecords.filter(r => r.status === "present" || r.status === "late").length
  const absentCount = attendanceRecords.filter(r => r.status === "absent").length

  return (
    <MainLayout 
      title="Attendance Management" 
      description="Track and manage employee attendance and working hours"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            />
            <Button variant="outline" size="sm">
              <IconFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">
              <IconDownload className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <IconCircleCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{presentCount}</div>
              <p className="text-xs text-muted-foreground">Out of {attendanceRecords.length} employees</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <IconCircleX className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{absentCount}</div>
              <p className="text-xs text-muted-foreground">Not present today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <IconClock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalHours.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">Worked today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overtime</CardTitle>
              <IconClockCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOvertime.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">Extra hours</p>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Records */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>
              Daily attendance tracking for {selectedDate}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={record.employee.avatar} alt={record.employee.name} />
                      <AvatarFallback>
                        {record.employee.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{record.employee.name}</h3>
                        <Badge variant={getStatusColor(record.status) as any}>
                          {record.status}
                        </Badge>
                        {getStatusIcon(record.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{record.employee.department}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        {record.checkIn && record.checkOut ? (
                          <>
                            <div className="flex items-center space-x-1">
                              <IconClock className="h-3 w-3" />
                              <span>{record.checkIn} - {record.checkOut}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <IconClockCheck className="h-3 w-3" />
                              <span>{record.hoursWorked}h worked</span>
                            </div>
                            {record.overtimeHours > 0 && (
                              <div className="flex items-center space-x-1">
                                <IconClock className="h-3 w-3" />
                                <span>{record.overtimeHours}h overtime</span>
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <IconClockOff className="h-3 w-3" />
                            <span>No attendance recorded</span>
                          </div>
                        )}
                        {record.notes && (
                          <div className="flex items-center space-x-1">
                            <IconUser className="h-3 w-3" />
                            <span>{record.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
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
