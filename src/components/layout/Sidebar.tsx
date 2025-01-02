'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'
import {
  LayoutDashboard,
  Activity,
  ShoppingBag,
  Users,
  FolderKanban,
  FileCode,
  GitBranch,
  Link2,
  Key,
  BarChart,
  CreditCard,
  HelpCircle,
  Settings,
  User,
  LogOut
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const mainNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Activity, label: 'Activity', href: '/dashboard/activity' },
  { icon: ShoppingBag, label: 'Data Marketplace', href: '/dashboard/marketplace' },
  { icon: Users, label: 'Community', href: '/dashboard/community' },
  { icon: FolderKanban, label: 'Projects', href: '/dashboard/projects' },
  { icon: FileCode, label: 'Blueprints', href: '/dashboard/blueprints' },
  { icon: GitBranch, label: 'Workflows', href: '/dashboard/workflows' },
  { icon: Link2, label: 'Connections', href: '/dashboard/connections' },
]

const bottomNavItems = [
  { icon: Key, label: 'API Keys', href: '/dashboard/api-keys' },
  { icon: BarChart, label: 'Usage', href: '/dashboard/usage' },
  { icon: CreditCard, label: 'Billing', href: '/dashboard/billing' },
  { icon: HelpCircle, label: 'Help', href: '/dashboard/help' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const NavItem = ({ icon: Icon, label, href }: { icon: any; label: string; href: string }) => {
    const isActive = pathname === href
    
    return (
      <Link href={href}>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-2 transition-all",
            isActive ? "bg-primary text-primary-foreground shadow-glow" : "hover:bg-secondary hover:shadow-sm"
          )}
        >
          <Icon className={cn("h-4 w-4", isActive && "text-primary-foreground")} />
          <span>{label}</span>
        </Button>
      </Link>
    )
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <aside className="flex flex-col h-screen w-64 bg-background border-r">
      <div className="p-6 border-b">
        <Link href="/dashboard">
          <h1 className="font-bold text-xl gradient-text hover:opacity-80 transition-opacity cursor-pointer">
            Syntactic
          </h1>
        </Link>
      </div>
      
      <nav className="flex-1 px-3 py-4 space-y-1">
        {mainNavItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
      
      <nav className="px-3 py-4 space-y-1 border-t bg-secondary/30">
        {bottomNavItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </nav>
      
      <div className="p-4 border-t bg-secondary/50">
        <Link href="/dashboard/settings">
          <div className="flex items-center space-x-3 mb-4 p-2 rounded-lg hover:bg-background transition-colors cursor-pointer gradient-border">
            <div className="p-1 rounded-full bg-primary/10">
              <User className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">{user?.email}</p>
              <p className="text-xs text-muted-foreground">User Account</p>
            </div>
          </div>
        </Link>
        <Button 
          variant="outline" 
          className="w-full justify-start gap-2 hover:bg-destructive hover:text-destructive-foreground transition-colors"
          onClick={handleSignOut}
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </aside>
  )
}