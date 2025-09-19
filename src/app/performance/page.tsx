"use client"

import * as React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconChartBar,
  IconPlus,
  IconFilter,
  IconTrendingUp,
  IconTrendingDown,
  IconStar,
  IconUser,
  IconCalendar,
  IconTarget,
  IconAward,
  IconEdit,
  IconEye,
} from "@tabler/icons-react"

// Mock data
const performanceReviews = [
  {
    id: "1",
    employee: {
      name: "Sarah Johnson",
      avatar: "/placeholder-avatar.jpg",
      department: "Engineering",
      position: "Senior Software Engineer",
    },
    period: "Q3 2024",
    overallRating: 4.5,
    ratings: {
      communication: 4.5,
      teamwork: 4.0,
      problemSolving: 5.0,
      leadership: 4.0,
      technicalSkills: 5.0,
    },
    status: "completed",
    reviewer: "Mike Chen",
    completedAt: "2024-01-10",
    goals: [
      { title: "Complete project delivery", status: "completed", progress: 100 },
      { title: "Improve team collaboration", status: "in-progress", progress: 75 },
      { title: "Learn new technology", status: "completed", progress: 100 },
    ],
  },
  {
    id: "2",
    employee: {
      name: "Mike Chen",
      avatar: "/placeholder-avatar.jpg",
      department: "Product",
      position: "Product Manager",
    },
    period: "Q3 2024",
    overallRating: 4.2,
    ratings: {
      communication: 4.5,
      teamwork: 4.5,
      problemSolving: 4.0,
      leadership: 4.5,
      technicalSkills: 3.5,
    },
    status: "in-progress",
    reviewer: "Emily Davis",
    completedAt: null,
    goals: [
      { title: "Launch new feature", status: "in-progress", progress: 60 },
      { title: "Improve user engagement", status: "not-started", progress: 0 },
      { title: "Team development", status: "completed", progress: 100 },
    ],
  },
  {
    id: "3",
    employee: {
      name: "Emily Davis",
      avatar: "/placeholder-avatar.jpg",
      department: "HR",
      position: "HR Specialist",
    },
    period: "Q3 2024",
    overallRating: 4.8,
    ratings: {
      communication: 5.0,
      teamwork: 4.5,
      problemSolving: 4.5,
      leadership: 4.5,
      technicalSkills: 4.5,
    },
    status: "completed",
    reviewer: "John Smith",
    completedAt: "2024-01-08",
    goals: [
      { title: "Streamline hiring process", status: "completed", progress: 100 },
      { title: "Employee satisfaction", status: "completed", progress: 100 },
      { title: "Policy updates", status: "in-progress", progress: 80 },
    ],
  },
]

export default function PerformancePage() {
  const [filterStatus, setFilterStatus] = React.useState("all")

  const filteredReviews = performanceReviews.filter((review) => {
    return filterStatus === "all" || review.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "in-progress":
        return "warning"
      case "draft":
        return "secondary"
      default:
        return "default"
    }
  }

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "success"
      case "in-progress":
        return "warning"
      case "not-started":
        return "secondary"
      default:
        return "default"
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <IconStar
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-current"
            : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
        }`}
      />
    ))
  }

  const averageRating = performanceReviews.reduce((sum, review) => sum + review.overallRating, 0) / performanceReviews.length
  const completedReviews = performanceReviews.filter(r => r.status === "completed").length
  const inProgressReviews = performanceReviews.filter(r => r.status === "in-progress").length

  return (
    <MainLayout 
      title="Performance Management" 
      description="Track employee performance, reviews, and goal achievements"
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
              New Review
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <IconStar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
              <div className="flex items-center space-x-1">
                {renderStars(averageRating)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Reviews</CardTitle>
              <IconChartBar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedReviews}</div>
              <p className="text-xs text-muted-foreground">This quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">In Progress</CardTitle>
              <IconTarget className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressReviews}</div>
              <p className="text-xs text-muted-foreground">Pending completion</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
              <IconAward className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {performanceReviews.filter(r => r.overallRating >= 4.5).length}
              </div>
              <p className="text-xs text-muted-foreground">4.5+ rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Performance Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Reviews</CardTitle>
            <CardDescription>
              Employee performance evaluations and goal tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className="p-6 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={review.employee.avatar} alt={review.employee.name} />
                        <AvatarFallback>
                          {review.employee.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{review.employee.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {review.employee.position} • {review.employee.department}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant={getStatusColor(review.status) as any}>
                            {review.status}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {review.period}
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Overall Rating */}
                    <div>
                      <h4 className="font-medium mb-2">Overall Rating</h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          {renderStars(review.overallRating)}
                        </div>
                        <span className="text-lg font-semibold">{review.overallRating}</span>
                      </div>
                    </div>

                    {/* Detailed Ratings */}
                    <div>
                      <h4 className="font-medium mb-2">Detailed Ratings</h4>
                      <div className="space-y-2">
                        {Object.entries(review.ratings).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between">
                            <span className="text-sm capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                            <div className="flex items-center space-x-1">
                              {renderStars(value)}
                              <span className="text-sm font-medium ml-1">{value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Goals */}
                  <div className="mt-6">
                    <h4 className="font-medium mb-3">Goals & Objectives</h4>
                    <div className="space-y-3">
                      {review.goals.map((goal, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium">{goal.title}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex-1 bg-background rounded-full h-2">
                                <div
                                  className="bg-primary h-2 rounded-full transition-all"
                                  style={{ width: `${goal.progress}%` }}
                                />
                              </div>
                              <span className="text-sm text-muted-foreground">
                                {goal.progress}%
                              </span>
                            </div>
                          </div>
                          <Badge variant={getGoalStatusColor(goal.status) as any}>
                            {goal.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reviewer Info */}
                  <div className="mt-4 pt-4 border-t flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Reviewed by <span className="font-medium">{review.reviewer}</span>
                      {review.completedAt && (
                        <span> on {new Date(review.completedAt).toLocaleDateString()}</span>
                      )}
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
