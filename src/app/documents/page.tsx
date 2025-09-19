"use client"

import * as React from "react"
import { MainLayout } from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconFileText,
  IconUpload,
  IconFilter,
  IconDownload,
  IconEye,
  IconEdit,
  IconTrash,
  IconUser,
  IconCalendar,
  IconFile,
  IconFilePdf,
  IconFileWord,
  IconFileImage,
} from "@tabler/icons-react"

// Mock data
const documents = [
  {
    id: "1",
    name: "Employment Contract - Sarah Johnson.pdf",
    type: "contract",
    size: "2.4 MB",
    uploadedBy: {
      name: "Sarah Johnson",
      avatar: "/placeholder-avatar.jpg",
    },
    uploadedAt: "2024-01-10",
    status: "active",
    category: "Contracts",
  },
  {
    id: "2",
    name: "ID Document - Mike Chen.jpg",
    type: "id",
    size: "1.2 MB",
    uploadedBy: {
      name: "Mike Chen",
      avatar: "/placeholder-avatar.jpg",
    },
    uploadedAt: "2024-01-08",
    status: "active",
    category: "Identity",
  },
  {
    id: "3",
    name: "Resume - Emily Davis.docx",
    type: "resume",
    size: "856 KB",
    uploadedBy: {
      name: "Emily Davis",
      avatar: "/placeholder-avatar.jpg",
    },
    uploadedAt: "2024-01-05",
    status: "active",
    category: "Resumes",
  },
  {
    id: "4",
    name: "Certificate - John Smith.pdf",
    type: "certificate",
    size: "3.1 MB",
    uploadedBy: {
      name: "John Smith",
      avatar: "/placeholder-avatar.jpg",
    },
    uploadedAt: "2024-01-03",
    status: "expired",
    category: "Certificates",
  },
]

export default function DocumentsPage() {
  const [filterType, setFilterType] = React.useState("all")
  const [filterCategory, setFilterCategory] = React.useState("all")

  const filteredDocuments = documents.filter((doc) => {
    const matchesType = filterType === "all" || doc.type === filterType
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory
    return matchesType && matchesCategory
  })

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <IconFilePdf className="h-8 w-8 text-red-500" />
      case "docx":
        return <IconFileWord className="h-8 w-8 text-blue-500" />
      case "jpg":
      case "png":
        return <IconFileImage className="h-8 w-8 text-green-500" />
      default:
        return <IconFile className="h-8 w-8 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "success"
      case "expired":
        return "destructive"
      case "pending":
        return "warning"
      default:
        return "default"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "contract":
        return "blue"
      case "id":
        return "green"
      case "resume":
        return "purple"
      case "certificate":
        return "orange"
      default:
        return "gray"
    }
  }

  const totalDocuments = documents.length
  const activeDocuments = documents.filter(d => d.status === "active").length
  const expiredDocuments = documents.filter(d => d.status === "expired").length
  const totalSize = documents.reduce((sum, doc) => {
    const size = parseFloat(doc.size.split(" ")[0])
    return sum + size
  }, 0)

  return (
    <MainLayout 
      title="Document Management" 
      description="Store and manage employee documents and files"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="all">All Types</option>
              <option value="contract">Contracts</option>
              <option value="id">ID Documents</option>
              <option value="resume">Resumes</option>
              <option value="certificate">Certificates</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background text-sm"
            >
              <option value="all">All Categories</option>
              <option value="Contracts">Contracts</option>
              <option value="Identity">Identity</option>
              <option value="Resumes">Resumes</option>
              <option value="Certificates">Certificates</option>
            </select>
            <Button variant="outline" size="sm">
              <IconFilter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm">
              <IconUpload className="mr-2 h-4 w-4" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <IconFileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDocuments}</div>
              <p className="text-xs text-muted-foreground">All files</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Documents</CardTitle>
              <IconFile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeDocuments}</div>
              <p className="text-xs text-muted-foreground">Currently valid</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expired Documents</CardTitle>
              <IconFileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{expiredDocuments}</div>
              <p className="text-xs text-muted-foreground">Need renewal</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Size</CardTitle>
              <IconFile className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSize.toFixed(1)} MB</div>
              <p className="text-xs text-muted-foreground">Storage used</p>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Document Library</CardTitle>
            <CardDescription>
              Manage and organize employee documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {getFileIcon(document.type)}
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold">{document.name}</h3>
                        <Badge variant={getStatusColor(document.status) as any}>
                          {document.status}
                        </Badge>
                        <Badge variant="outline">
                          {document.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <IconUser className="h-3 w-3" />
                          <span>Uploaded by {document.uploadedBy.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconCalendar className="h-3 w-3" />
                          <span>{new Date(document.uploadedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <IconFile className="h-3 w-3" />
                          <span>{document.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <IconEye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <IconDownload className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <IconEdit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <IconTrash className="h-4 w-4" />
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
