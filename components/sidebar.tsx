"use client"

import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutDashboard, FileText, Table, Settings, ChevronRight, ChevronLeft } from 'lucide-react'

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Forms",
    href: "/dashboard/forms",
    icon: FileText,
  },
  {
    title: "Table",
    href: "/dashboard/table",
    icon: Table,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("relative pb-12 bg-gray-800 text-white transition-all duration-300", 
      collapsed ? "w-16" : "w-64", 
      className
    )}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className={cn("mb-2 px-4 text-lg font-semibold tracking-tight transition-opacity", 
            collapsed && "opacity-0"
          )}>
            Dashboard
          </h2>
          <div className="space-y-1">
            <ScrollArea className={cn("h-[300px] px-1", collapsed && "px-2")}>
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  className={cn("w-full justify-start", collapsed && "justify-center")}
                  asChild
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-4 w-4" />
                    {!collapsed && item.title}
                  </Link>
                </Button>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        className="absolute bottom-4 right-2"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight /> : <ChevronLeft />}
      </Button>
    </div>
  )
}

