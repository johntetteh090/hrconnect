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
  IconX,
  IconBuilding,
  IconTrendingUp,
  IconTrendingDown,
  IconMail,
  IconPhone,
  IconMapPin,
  IconFileText,
  IconCheck,
  IconPlus,
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
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)
  const [sidePanelType, setSidePanelType] = React.useState<'present' | 'absent' | 'hours' | 'overtime' | 'recording' | null>(null)
  const [currentTime, setCurrentTime] = React.useState(new Date())
  const [selectedEmployee, setSelectedEmployee] = React.useState<string | null>(null)
  const [records, setRecords] = React.useState(attendanceRecords)
  const [showSuccessMessage, setShowSuccessMessage] = React.useState<string | null>(null)

  const openSidePanel = (type: 'present' | 'absent' | 'hours' | 'overtime' | 'recording') => {
    setSidePanelType(type)
    setSidePanelOpen(true)
  }

  const closeSidePanel = () => {
    setSidePanelOpen(false)
    setTimeout(() => setSidePanelType(null), 300)
  }

  // Update current time every second
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Attendance functions
  const handleCheckIn = (employeeId: string) => {
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    setRecords(prev => prev.map(record => 
      record.id === employeeId 
        ? { 
            ...record, 
            checkIn: currentTimeStr, 
            status: 'present',
            notes: record.notes || 'Checked in'
          }
        : record
    ))
    
    setShowSuccessMessage(`Check-in recorded at ${currentTimeStr}`)
    setTimeout(() => setShowSuccessMessage(null), 3000)
  }

  const handleCheckOut = (employeeId: string) => {
    const currentTimeStr = currentTime.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    })
    
    setRecords(prev => prev.map(record => {
      if (record.id === employeeId) {
        const checkInTime = record.checkIn
        if (checkInTime) {
          // Calculate hours worked
          const [checkInHour, checkInMin] = checkInTime.split(':').map(Number)
          const [checkOutHour, checkOutMin] = currentTimeStr.split(':').map(Number)
          
          const checkInMinutes = checkInHour * 60 + checkInMin
          const checkOutMinutes = checkOutHour * 60 + checkOutMin
          const totalMinutes = checkOutMinutes - checkInMinutes
          const hoursWorked = totalMinutes / 60
          const overtimeHours = Math.max(0, hoursWorked - 8) // Assuming 8 hours is standard
          
          return {
            ...record,
            checkOut: currentTimeStr,
            hoursWorked: Math.round(hoursWorked * 10) / 10,
            overtimeHours: Math.round(overtimeHours * 10) / 10,
            status: hoursWorked >= 8 ? 'present' : 'half-day'
          }
        }
      }
      return record
    }))
    
    setShowSuccessMessage(`Check-out recorded at ${currentTimeStr}`)
    setTimeout(() => setShowSuccessMessage(null), 3000)
  }

  const handleMarkAbsent = (employeeId: string) => {
    setRecords(prev => prev.map(record => 
      record.id === employeeId 
        ? { 
            ...record, 
            checkIn: null,
            checkOut: null,
            hoursWorked: 0,
            overtimeHours: 0,
            status: 'absent',
            notes: 'Marked absent by admin'
          }
        : record
    ))
    
    setShowSuccessMessage('Employee marked as absent')
    setTimeout(() => setShowSuccessMessage(null), 3000)
  }

  const filteredRecords = records.filter((record) => {
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

  const totalHours = records.reduce((sum, record) => sum + record.hoursWorked, 0)
  const totalOvertime = records.reduce((sum, record) => sum + record.overtimeHours, 0)
  const presentCount = records.filter(r => r.status === "present" || r.status === "late").length
  const absentCount = records.filter(r => r.status === "absent").length

  return (
    <MainLayout 
      title="Attendance Management" 
      description="Track and manage employee attendance and working hours"
    >
      <div className="space-y-6">
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <IconCircleCheck className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">{showSuccessMessage}</p>
            </div>
          </div>
        )}

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
            <Button size="sm" onClick={() => openSidePanel('recording')}>
              <IconClock className="mr-2 h-4 w-4" />
              Record Attendance
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openSidePanel('present')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
              <IconCircleCheck className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{presentCount}</div>
              <p className="text-xs text-muted-foreground">Out of {records.length} employees</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openSidePanel('absent')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Absent Today</CardTitle>
              <IconCircleX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{absentCount}</div>
              <p className="text-xs text-muted-foreground">Not present today</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openSidePanel('hours')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
              <IconClock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalHours.toFixed(1)}h</div>
              <p className="text-xs text-muted-foreground">Worked today</p>
            </CardContent>
          </Card>
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => openSidePanel('overtime')}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overtime</CardTitle>
              <IconClockCheck className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{totalOvertime.toFixed(1)}h</div>
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

      {/* Side Panel Overlay */}
      {sidePanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={closeSidePanel}
        />
      )}

      {/* Side Panel */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        sidePanelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {sidePanelType && (
          <div className="h-full flex flex-col">
            {/* Panel Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex items-center space-x-3">
                {sidePanelType === 'present' && <IconCircleCheck className="h-6 w-6 text-green-600" />}
                {sidePanelType === 'absent' && <IconCircleX className="h-6 w-6 text-red-600" />}
                {sidePanelType === 'hours' && <IconClock className="h-6 w-6 text-blue-600" />}
                {sidePanelType === 'overtime' && <IconClockCheck className="h-6 w-6 text-orange-600" />}
                {sidePanelType === 'recording' && <IconClock className="h-6 w-6 text-blue-600" />}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {sidePanelType === 'present' && 'Present Employees'}
                    {sidePanelType === 'absent' && 'Absent Employees'}
                    {sidePanelType === 'hours' && 'Hours Breakdown'}
                    {sidePanelType === 'overtime' && 'Overtime Management'}
                    {sidePanelType === 'recording' && 'Attendance Recording'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {sidePanelType === 'present' && 'Employees who are present today'}
                    {sidePanelType === 'absent' && 'Employees who are absent today'}
                    {sidePanelType === 'hours' && 'Detailed hours worked by department'}
                    {sidePanelType === 'overtime' && 'Overtime hours and approval status'}
                    {sidePanelType === 'recording' && 'Record check-in and check-out times'}
                  </p>
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
              {sidePanelType === 'present' && (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-green-900 mb-2">Attendance Summary</h4>
                    <p className="text-sm text-green-800">{presentCount} out of {records.length} employees are present today.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Present Employees</h4>
                    <div className="space-y-3">
                      {records.filter(r => r.status === 'present' || r.status === 'late').map((record) => (
                        <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={record.employee.avatar} alt={record.employee.name} />
                              <AvatarFallback>
                                {record.employee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900">{record.employee.name}</h5>
                              <p className="text-sm text-gray-600">{record.employee.department}</p>
                              <div className="flex items-center space-x-4 mt-1">
                                <div className="flex items-center space-x-1">
                                  <IconClock className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{record.checkIn} - {record.checkOut}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <IconClockCheck className="h-3 w-3 text-gray-400" />
                                  <span className="text-xs text-gray-500">{record.hoursWorked}h</span>
                                </div>
                              </div>
                            </div>
                            <Badge variant={record.status === 'late' ? 'warning' : 'success'}>
                              {record.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {sidePanelType === 'absent' && (
                <div className="space-y-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-red-900 mb-2">Absence Alert</h4>
                    <p className="text-sm text-red-800">{absentCount} employees are absent today and may need follow-up.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Absent Employees</h4>
                    <div className="space-y-3">
                      {records.filter(r => r.status === 'absent').map((record) => (
                        <div key={record.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={record.employee.avatar} alt={record.employee.name} />
                              <AvatarFallback>
                                {record.employee.name.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900">{record.employee.name}</h5>
                              <p className="text-sm text-gray-600">{record.employee.department}</p>
                              <p className="text-xs text-gray-500 mt-1">Reason: {record.notes || 'No reason provided'}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                                <IconMail className="h-3 w-3 mr-1" />
                                Contact
                              </Button>
                              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                <IconFileText className="h-3 w-3 mr-1" />
                                Report
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {sidePanelType === 'hours' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Hours Summary</h4>
                    <p className="text-sm text-blue-800">Total of {totalHours.toFixed(1)} hours worked across all departments today.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Department Breakdown</h4>
                    <div className="space-y-3">
                      {['Engineering', 'Product', 'HR', 'Marketing'].map((dept) => {
                        const deptRecords = records.filter(r => r.employee.department === dept)
                        const deptHours = deptRecords.reduce((sum, r) => sum + r.hoursWorked, 0)
                        const deptCount = deptRecords.length
                        return (
                          <div key={dept} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                  <IconBuilding className="h-4 w-4 text-blue-600" />
                                </div>
                                <div>
                                  <h5 className="font-semibold text-gray-900">{dept}</h5>
                                  <p className="text-sm text-gray-600">{deptCount} employees</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-blue-600">{deptHours.toFixed(1)}h</p>
                                <p className="text-xs text-gray-500">Average: {(deptHours / deptCount || 0).toFixed(1)}h</p>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

              {sidePanelType === 'overtime' && (
                <div className="space-y-6">
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-orange-900 mb-2">Overtime Management</h4>
                    <p className="text-sm text-orange-800">{totalOvertime.toFixed(1)} hours of overtime requiring approval today.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Overtime Approval Queue</h4>
                    <div className="space-y-3">
                      {records.filter(r => r.overtimeHours > 0).map((record) => (
                        <div key={record.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50/30">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={record.employee.avatar} alt={record.employee.name} />
                                <AvatarFallback>
                                  {record.employee.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900">{record.employee.name}</h5>
                                <p className="text-sm text-gray-600">{record.employee.department}</p>
                              </div>
                              <Badge variant="warning" className="bg-orange-100 text-orange-800">
                                {record.overtimeHours}h OT
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Regular Hours</p>
                                <p className="font-semibold">{record.hoursWorked - record.overtimeHours}h</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Overtime Hours</p>
                                <p className="font-semibold text-orange-600">{record.overtimeHours}h</p>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-3 border border-orange-200">
                              <p className="text-xs text-gray-500 mb-1">Overtime Reason</p>
                              <p className="text-sm text-gray-700">{record.notes || 'No reason provided'}</p>
                            </div>
                            
                            <div className="flex space-x-2">
                              <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                                <IconCheck className="h-3 w-3 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                                <IconX className="h-3 w-3 mr-1" />
                                Deny
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {sidePanelType === 'recording' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Attendance Recording</h4>
                    <p className="text-sm text-blue-800">Record check-in and check-out times for employees.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-sm text-gray-500 mb-1">Current Time</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {currentTime.toLocaleTimeString('en-US', { 
                            hour12: false, 
                            hour: '2-digit', 
                            minute: '2-digit', 
                            second: '2-digit' 
                          })}
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          {currentTime.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Select Employee</h4>
                      <div className="space-y-2">
                        {records.map((record) => (
                          <div 
                            key={record.id} 
                            className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                              selectedEmployee === record.id 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:bg-gray-50'
                            }`}
                            onClick={() => setSelectedEmployee(record.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={record.employee.avatar} alt={record.employee.name} />
                                <AvatarFallback>
                                  {record.employee.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <h5 className="font-semibold text-gray-900">{record.employee.name}</h5>
                                <p className="text-sm text-gray-600">{record.employee.department}</p>
                              </div>
                              <Badge variant={getStatusColor(record.status) as any}>
                                {record.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {selectedEmployee && (
                      <div className="space-y-4">
                        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Record Attendance</h4>
                        <div className="grid grid-cols-3 gap-2">
                          <Button 
                            className="h-12 bg-green-600 hover:bg-green-700"
                            onClick={() => handleCheckIn(selectedEmployee)}
                          >
                            <IconClock className="h-4 w-4 mr-2" />
                            Check In
                          </Button>
                          <Button 
                            className="h-12 bg-red-600 hover:bg-red-700"
                            onClick={() => handleCheckOut(selectedEmployee)}
                          >
                            <IconClockOff className="h-4 w-4 mr-2" />
                            Check Out
                          </Button>
                          <Button 
                            className="h-12 bg-orange-600 hover:bg-orange-700"
                            onClick={() => handleMarkAbsent(selectedEmployee)}
                          >
                            <IconCircleX className="h-4 w-4 mr-2" />
                            Mark Absent
                          </Button>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h5 className="text-sm font-semibold text-gray-900 mb-2">Today's Record</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Check In:</span>
                              <span className="font-medium">
                                {records.find(r => r.id === selectedEmployee)?.checkIn || 'Not recorded'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Check Out:</span>
                              <span className="font-medium">
                                {records.find(r => r.id === selectedEmployee)?.checkOut || 'Not recorded'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Hours Worked:</span>
                              <span className="font-medium">
                                {records.find(r => r.id === selectedEmployee)?.hoursWorked || 0}h
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Panel Footer */}
            <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="flex space-x-3">
                <Button 
                  className="flex-1"
                  onClick={() => {
                    // Handle action based on panel type
                    closeSidePanel()
                  }}
                >
                  {sidePanelType === 'present' && 'Export Present List'}
                  {sidePanelType === 'absent' && 'Send Follow-up'}
                  {sidePanelType === 'hours' && 'Export Hours Report'}
                  {sidePanelType === 'overtime' && 'Process Approvals'}
                  {sidePanelType === 'recording' && 'Save Records'}
                </Button>
                <Button variant="outline" onClick={closeSidePanel}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
