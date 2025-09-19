"use client"

import * as React from "react"
import { useAuth } from "@/contexts/auth-context"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  IconUsers,
  IconCalendar,
  IconClock,
  IconChartBar,
  IconCurrencyDollar,
  IconTrendingUp,
  IconTrendingDown,
  IconAlertTriangle,
  IconCircleCheck,
  IconClockHour4,
  IconArrowRight,
  IconStar,
  IconTarget,
  IconActivity,
  IconBell,
  IconPlus,
  IconX,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCalendarEvent,
  IconFileText,
  IconDownload,
} from "@tabler/icons-react"

export default function DashboardPage() {
  const { user } = useAuth()
  const [sidePanelOpen, setSidePanelOpen] = React.useState(false)
  const [sidePanelType, setSidePanelType] = React.useState<'employee' | 'leave' | 'performance' | 'payroll' | null>(null)

  const openSidePanel = (type: 'employee' | 'leave' | 'performance' | 'payroll') => {
    setSidePanelType(type)
    setSidePanelOpen(true)
  }

  const closeSidePanel = () => {
    setSidePanelOpen(false)
    setTimeout(() => setSidePanelType(null), 300) // Wait for animation to complete
  }

  const stats = [
    {
      title: "Total Employees",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: IconUsers,
      description: "From last month",
      color: "from-blue-600 to-blue-700",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-700",
    },
    {
      title: "Active Leave Requests",
      value: "23",
      change: "-5%",
      trend: "down",
      icon: IconCalendar,
      description: "Pending approval",
      color: "from-amber-600 to-orange-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-700",
    },
    {
      title: "Attendance Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: IconClock,
      description: "This month",
      color: "from-emerald-600 to-green-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-700",
    },
    {
      title: "Performance Reviews",
      value: "156",
      change: "+8%",
      trend: "up",
      icon: IconChartBar,
      description: "Completed this quarter",
      color: "from-violet-600 to-purple-600",
      bgColor: "bg-violet-50",
      iconColor: "text-violet-700",
    },
  ]

  const recentActivities = [
    {
      id: 1,
      type: "leave_request",
      title: "New leave request from Sarah Johnson",
      description: "Vacation leave for 5 days",
      time: "2 hours ago",
      status: "pending",
      avatar: "SJ",
      priority: "medium",
    },
    {
      id: 2,
      type: "performance_review",
      title: "Performance review completed",
      description: "Mike Chen's Q3 review is ready",
      time: "4 hours ago",
      status: "completed",
      avatar: "MC",
      priority: "low",
    },
    {
      id: 3,
      type: "attendance",
      title: "Late arrival alert",
      description: "John Smith arrived 30 minutes late",
      time: "6 hours ago",
      status: "warning",
      avatar: "JS",
      priority: "high",
    },
    {
      id: 4,
      type: "payroll",
      title: "Payroll processed",
      description: "September payroll completed for 247 employees",
      time: "1 day ago",
      status: "completed",
      avatar: "SY",
      priority: "low",
    },
  ]

  const quickStats = [
    { label: "Today's Attendance", value: "94%", icon: IconTarget },
    { label: "Pending Tasks", value: "12", icon: IconBell },
    { label: "Team Rating", value: "4.8", icon: IconStar },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <IconClockHour4 className="h-4 w-4 text-amber-600" />
      case "completed":
        return <IconCircleCheck className="h-4 w-4 text-emerald-600" />
      case "warning":
        return <IconAlertTriangle className="h-4 w-4 text-orange-600" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning"
      case "completed":
        return "success"
      case "warning":
        return "destructive"
      default:
        return "default"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-300"
      case "medium":
        return "bg-amber-100 text-amber-800 border-amber-300"
      case "low":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <MainLayout title="Dashboard" description="Overview of your HR management system">
      <div className="space-y-8">
        {/* Enhanced Welcome Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-lg text-white/90 mb-4">
                  Here's what's happening in your organization today.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <IconActivity className="h-4 w-4" />
                    <span>Last login: Today at 9:30 AM</span>
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <IconUsers className="w-16 h-16 text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickStats.map((stat, index) => (
            <div key={index} className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{stat.value}</p>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.title} className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-6 shadow-lg border border-gray-100/50 hover:shadow-2xl hover:scale-105 transition-all duration-500">
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100/30 to-transparent rounded-full -translate-y-10 translate-x-10"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-gray-100/20 to-transparent rounded-full translate-y-8 -translate-x-8"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm border border-gray-200/50">
                    {stat.trend === "up" ? (
                      <IconTrendingUp className="h-4 w-4 text-emerald-600" />
                    ) : (
                      <IconTrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={`text-sm font-bold ${stat.trend === "up" ? "text-emerald-700" : "text-red-700"}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.title}</h3>
                  <p className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Recent Activities */}
          <div className="lg:col-span-2 group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-500/5 to-pink-500/5 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Recent Activities</h3>
                  <p className="text-gray-600 mt-1 text-sm font-medium">
                    Latest updates from your HR system
                  </p>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 rounded-full px-4 py-2">
                  View All
                  <IconArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={activity.id} className="group/activity relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-xl p-5 hover:bg-white/80 hover:shadow-md transition-all duration-300 border border-gray-100/50">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg">
                          {activity.avatar}
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                          {getStatusIcon(activity.status)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900 group-hover/activity:text-gray-800 transition-colors">{activity.title}</p>
                          <p className="text-xs text-gray-600 mt-1 font-medium">{activity.description}</p>
                            <div className="flex items-center space-x-3 mt-3">
                              <Badge variant={getStatusColor(activity.status) as any} className="text-xs font-semibold px-2 py-1 rounded-full">
                                {activity.status}
                              </Badge>
                              <Badge variant="outline" className={`text-xs font-semibold px-2 py-1 rounded-full ${getPriorityColor(activity.priority)}`}>
                                {activity.priority}
                              </Badge>
                              <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Quick Actions */}
          <div className="group relative overflow-hidden bg-gradient-to-br from-white to-gray-50/50 rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-green-500/5 to-blue-500/5 rounded-full -translate-y-12 -translate-x-12"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tr from-purple-500/5 to-pink-500/5 rounded-full translate-y-10 translate-x-10"></div>
            
            <div className="relative z-10 p-6">
              <div className="mb-6">
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Quick Actions</h3>
                <p className="text-gray-600 mt-1 text-sm font-medium">
                  Common tasks you might want to perform
                </p>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full justify-start h-16 text-left group/btn relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100/50 hover:from-blue-100 hover:to-blue-200/50 border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 rounded-xl" 
                        onClick={() => openSidePanel('employee')}>
                  <div className="flex items-center space-x-4 w-full">
                    <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg group-hover/btn:shadow-xl transition-shadow duration-300">
                      <IconUsers className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 group-hover/btn:text-blue-900 transition-colors">Add New Employee</p>
                      <p className="text-xs text-gray-600 group-hover/btn:text-blue-800 transition-colors">Create employee profile</p>
                    </div>
                    <IconArrowRight className="h-4 w-4 text-gray-500 group-hover/btn:text-blue-600 transition-colors" />
                  </div>
                </Button>
                
                <Button className="w-full justify-start h-16 text-left group/btn relative overflow-hidden bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 rounded-xl"
                        onClick={() => openSidePanel('leave')}>
                  <div className="flex items-center space-x-4 w-full">
                    <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl shadow-lg group-hover/btn:shadow-xl transition-shadow duration-300">
                      <IconCalendar className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 group-hover/btn:text-amber-900 transition-colors">Process Leave Request</p>
                      <p className="text-xs text-gray-600 group-hover/btn:text-amber-800 transition-colors">Review and approve</p>
                    </div>
                    <IconArrowRight className="h-4 w-4 text-gray-500 group-hover/btn:text-amber-600 transition-colors" />
                  </div>
                </Button>
                
                <Button className="w-full justify-start h-16 text-left group/btn relative overflow-hidden bg-gradient-to-r from-violet-50 to-purple-50 hover:from-violet-100 hover:to-purple-100 border border-violet-200 hover:border-violet-300 hover:shadow-lg transition-all duration-300 rounded-xl"
                        onClick={() => openSidePanel('performance')}>
                  <div className="flex items-center space-x-4 w-full">
                    <div className="p-3 bg-gradient-to-br from-violet-600 to-purple-600 rounded-xl shadow-lg group-hover/btn:shadow-xl transition-shadow duration-300">
                      <IconChartBar className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 group-hover/btn:text-violet-900 transition-colors">Start Performance Review</p>
                      <p className="text-xs text-gray-600 group-hover/btn:text-violet-800 transition-colors">Begin evaluation process</p>
                    </div>
                    <IconArrowRight className="h-4 w-4 text-gray-500 group-hover/btn:text-violet-600 transition-colors" />
                  </div>
                </Button>
                
                <Button className="w-full justify-start h-16 text-left group/btn relative overflow-hidden bg-gradient-to-r from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100 border border-emerald-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 rounded-xl"
                        onClick={() => openSidePanel('payroll')}>
                  <div className="flex items-center space-x-4 w-full">
                    <div className="p-3 bg-gradient-to-br from-emerald-600 to-green-600 rounded-xl shadow-lg group-hover/btn:shadow-xl transition-shadow duration-300">
                      <IconCurrencyDollar className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-900 group-hover/btn:text-emerald-900 transition-colors">Generate Payroll</p>
                      <p className="text-xs text-gray-600 group-hover/btn:text-emerald-800 transition-colors">Process monthly payments</p>
                    </div>
                    <IconArrowRight className="h-4 w-4 text-gray-500 group-hover/btn:text-emerald-600 transition-colors" />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
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
                {sidePanelType === 'employee' && <IconUsers className="h-6 w-6 text-blue-600" />}
                {sidePanelType === 'leave' && <IconCalendar className="h-6 w-6 text-amber-600" />}
                {sidePanelType === 'performance' && <IconChartBar className="h-6 w-6 text-violet-600" />}
                {sidePanelType === 'payroll' && <IconCurrencyDollar className="h-6 w-6 text-emerald-600" />}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {sidePanelType === 'employee' && 'Add New Employee'}
                    {sidePanelType === 'leave' && 'Process Leave Request'}
                    {sidePanelType === 'performance' && 'Start Performance Review'}
                    {sidePanelType === 'payroll' && 'Generate Payroll'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {sidePanelType === 'employee' && 'Create a new employee profile'}
                    {sidePanelType === 'leave' && 'Review and approve leave requests'}
                    {sidePanelType === 'performance' && 'Begin evaluation process'}
                    {sidePanelType === 'payroll' && 'Process monthly payments'}
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
              {sidePanelType === 'employee' && (
                <div className="space-y-6">
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
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Job Information</h4>
                    <div>
                      <Label htmlFor="position" className="text-sm font-medium">Position</Label>
                      <Input id="position" placeholder="Software Engineer" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="department" className="text-sm font-medium">Department</Label>
                      <Input id="department" placeholder="Engineering" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="startDate" className="text-sm font-medium">Start Date</Label>
                      <div className="relative mt-1">
                        <IconCalendarEvent className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input id="startDate" type="date" className="pl-10" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {sidePanelType === 'leave' && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-amber-900 mb-2">Pending Leave Requests</h4>
                    <p className="text-sm text-amber-800">You have 3 pending leave requests to review.</p>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Johnson", type: "Vacation", days: "5 days", date: "Dec 15-19, 2024", reason: "Family vacation" },
                      { name: "Mike Chen", type: "Sick Leave", days: "2 days", date: "Dec 12-13, 2024", reason: "Medical appointment" },
                      { name: "Emily Davis", type: "Personal", days: "1 day", date: "Dec 20, 2024", reason: "Personal matter" }
                    ].map((request, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-900">{request.name}</h5>
                            <p className="text-sm text-gray-600 mt-1">{request.type} • {request.days}</p>
                            <p className="text-sm text-gray-600">{request.date}</p>
                            <p className="text-xs text-gray-500 mt-2">{request.reason}</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">Approve</Button>
                            <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Deny</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {sidePanelType === 'performance' && (
                <div className="space-y-6">
                  <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-violet-900 mb-2">Performance Review Cycle</h4>
                    <p className="text-sm text-violet-800">Q4 2024 Performance Reviews are now open.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Select Employee</h4>
                    <div className="space-y-3">
                      {[
                        { name: "Alex Thompson", position: "Senior Developer", status: "Pending" },
                        { name: "Lisa Rodriguez", position: "UX Designer", status: "In Progress" },
                        { name: "David Kim", position: "Product Manager", status: "Completed" },
                        { name: "Maria Garcia", position: "Marketing Specialist", status: "Pending" }
                      ].map((employee, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-semibold text-gray-900">{employee.name}</h5>
                              <p className="text-sm text-gray-600">{employee.position}</p>
                            </div>
                            <Badge variant={employee.status === 'Completed' ? 'success' : employee.status === 'In Progress' ? 'warning' : 'outline'}>
                              {employee.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {sidePanelType === 'payroll' && (
                <div className="space-y-6">
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-emerald-900 mb-2">Payroll Summary</h4>
                    <p className="text-sm text-emerald-800">December 2024 payroll for 247 employees.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-900">$1,247,350</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm font-medium text-gray-600">Employees</p>
                        <p className="text-2xl font-bold text-gray-900">247</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Payroll Actions</h4>
                      <div className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                          <IconFileText className="mr-2 h-4 w-4" />
                          Review Payroll Details
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                          <IconDownload className="mr-2 h-4 w-4" />
                          Download Payroll Report
                        </Button>
                        <Button className="w-full justify-start bg-emerald-600 hover:bg-emerald-700 text-white">
                          <IconCurrencyDollar className="mr-2 h-4 w-4" />
                          Process Payroll
                        </Button>
                      </div>
                    </div>
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
                    // Handle save/submit action
                    closeSidePanel()
                  }}
                >
                  {sidePanelType === 'employee' && 'Create Employee'}
                  {sidePanelType === 'leave' && 'Save Changes'}
                  {sidePanelType === 'performance' && 'Start Review'}
                  {sidePanelType === 'payroll' && 'Process Payroll'}
                </Button>
                <Button variant="outline" onClick={closeSidePanel}>
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
