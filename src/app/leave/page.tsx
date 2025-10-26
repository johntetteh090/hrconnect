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
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)
  const [showSuccessMessage, setShowSuccessMessage] = React.useState<string | null>(null)
  const [newRequest, setNewRequest] = React.useState({
    employee: "",
    type: "vacation",
    startDate: "",
    endDate: "",
    reason: "",
    days: 0
  })

  const openSidePanel = () => {
    setSidePanelOpen(true)
  }

  const closeSidePanel = () => {
    setSidePanelOpen(false)
    // Reset form
    setNewRequest({
      employee: "",
      type: "vacation",
      startDate: "",
      endDate: "",
      reason: "",
      days: 0
    })
  }

  const handleSubmitRequest = () => {
    // Calculate days between start and end date
    if (newRequest.startDate && newRequest.endDate) {
      const start = new Date(newRequest.startDate)
      const end = new Date(newRequest.endDate)
      const diffTime = Math.abs(end.getTime() - start.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
      setNewRequest(prev => ({ ...prev, days: diffDays }))
    }

    // Here you would typically submit to an API
    console.log("Submitting leave request:", newRequest)
    
    setShowSuccessMessage("Leave request submitted successfully!")
    setTimeout(() => {
      setShowSuccessMessage(null)
      closeSidePanel()
    }, 3000)
  }

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
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <IconCheck className="h-5 w-5 text-green-600" />
              <p className="text-sm font-medium text-green-800">{showSuccessMessage}</p>
            </div>
          </div>
        )}

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <IconFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" onClick={openSidePanel}>
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
        <div className="h-full flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center space-x-3">
              <IconPlus className="h-6 w-6 text-blue-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">New Leave Request</h3>
                <p className="text-sm text-gray-600">Submit a new leave request for approval</p>
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">Leave Request Form</h4>
                <p className="text-sm text-blue-800">Fill out the details below to submit your leave request.</p>
              </div>
              
              <div className="space-y-4">
                {/* Employee Selection */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Employee</label>
                  <select
                    value={newRequest.employee}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, employee: e.target.value }))}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Employee</option>
                    <option value="sarah-johnson">Sarah Johnson - Engineering</option>
                    <option value="mike-chen">Mike Chen - Product</option>
                    <option value="emily-davis">Emily Davis - HR</option>
                    <option value="john-smith">John Smith - Marketing</option>
                  </select>
                </div>

                {/* Leave Type */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Leave Type</label>
                  <select
                    value={newRequest.type}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="vacation">Vacation</option>
                    <option value="sick">Sick Leave</option>
                    <option value="personal">Personal</option>
                    <option value="maternity">Maternity</option>
                    <option value="paternity">Paternity</option>
                    <option value="bereavement">Bereavement</option>
                  </select>
                </div>

                {/* Date Range */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Start Date</label>
                    <input
                      type="date"
                      value={newRequest.startDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        const selectedDate = e.target.value
                        setNewRequest(prev => ({ 
                          ...prev, 
                          startDate: selectedDate,
                          // Reset end date if it's before the new start date
                          endDate: prev.endDate && selectedDate > prev.endDate ? "" : prev.endDate
                        }))
                      }}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">End Date</label>
                    <input
                      type="date"
                      value={newRequest.endDate}
                      min={newRequest.startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setNewRequest(prev => ({ ...prev, endDate: e.target.value }))}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Days Calculation */}
                {newRequest.startDate && newRequest.endDate && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h5 className="text-sm font-semibold text-gray-900 mb-2">Leave Duration</h5>
                    <div className="flex items-center space-x-2">
                      <IconCalendar className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {(() => {
                          const start = new Date(newRequest.startDate)
                          const end = new Date(newRequest.endDate)
                          const diffTime = Math.abs(end.getTime() - start.getTime())
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
                          return `${diffDays} day${diffDays !== 1 ? 's' : ''} requested`
                        })()}
                      </span>
                    </div>
                  </div>
                )}

                {/* Reason */}
                <div>
                  <label className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Reason</label>
                  <textarea
                    value={newRequest.reason}
                    onChange={(e) => setNewRequest(prev => ({ ...prev, reason: e.target.value }))}
                    placeholder="Please provide a reason for your leave request..."
                    rows={4}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>

                {/* Leave Type Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-2">Leave Type Information</h5>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-xs">
                        {leaveTypes[newRequest.type as keyof typeof leaveTypes]?.label}
                      </Badge>
                      <span>Selected leave type</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {newRequest.type === 'vacation' && 'Vacation leave for personal time off and relaxation.'}
                      {newRequest.type === 'sick' && 'Sick leave for medical appointments and illness recovery.'}
                      {newRequest.type === 'personal' && 'Personal leave for urgent personal matters.'}
                      {newRequest.type === 'maternity' && 'Maternity leave for new mothers.'}
                      {newRequest.type === 'paternity' && 'Paternity leave for new fathers.'}
                      {newRequest.type === 'bereavement' && 'Bereavement leave for family loss.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Panel Footer */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <div className="flex space-x-3">
              <Button 
                className="flex-1"
                onClick={handleSubmitRequest}
                disabled={!newRequest.employee || !newRequest.startDate || !newRequest.endDate || !newRequest.reason}
              >
                <IconCheck className="h-4 w-4 mr-2" />
                Submit Request
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
