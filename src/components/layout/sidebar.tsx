"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  IconDashboard,
  IconUsers,
  IconCalendar,
  IconClock,
  IconChartBar,
  IconCurrencyDollar,
  IconSettings,
  IconBell,
  IconLogout,
  IconChevronLeft,
  IconChevronRight,
  IconUser,
  IconFileText,
  IconShield,
  IconWorkflow,
} from "@tabler/icons-react"

interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
  },
  {
    title: "Employees",
    href: "/employees",
    icon: "users",
  },
  {
    title: "Leave Management",
    href: "/leave",
    icon: "calendar",
  },
  {
    title: "Attendance",
    href: "/attendance",
    icon: "clock",
  },
  {
    title: "Performance",
    href: "/performance",
    icon: "chart",
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: "currency",
  },
  {
    title: "Documents",
    href: "/documents",
    icon: "file",
  },
  {
    title: "Workflow",
    href: "/workflow",
    icon: "workflow",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
  },
]

const getIcon = (iconName: string) => {
  const icons = {
    dashboard: IconDashboard,
    users: IconUsers,
    calendar: IconCalendar,
    clock: IconClock,
    chart: IconChartBar,
    currency: IconCurrencyDollar,
    file: IconFileText,
    workflow: IconWorkflow,
    settings: IconSettings,
  }
  return icons[iconName as keyof typeof icons] || IconDashboard
}

export function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "flex h-full flex-col bg-card border-r transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div className={cn(
        "flex h-16 items-center border-b px-4",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <IconShield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold">HR Connect</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="h-8 w-8"
        >
          {isCollapsed ? (
            <IconChevronRight className="h-4 w-4" />
          ) : (
            <IconChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const IconComponent = getIcon(item.icon)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center rounded-lg py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                isCollapsed ? "justify-center px-0" : "space-x-3 px-3",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground"
              )}
            >
              <IconComponent className="h-5 w-5 shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t p-4">
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "space-x-3"
        )}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
            <AvatarFallback>
              <IconUser className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
