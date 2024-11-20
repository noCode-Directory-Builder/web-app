"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderPlus,
  Settings,
  LogOut,
  Menu,
  Globe,
  X,
  ChevronRight,
  Plus,
  FileEdit,
  Building,
  FileText,
  Mail,
  ListChecks,
  BookOpen,
  FileStack,
  User,
  Tags,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "New Directory",
    href: "/dashboard/new",
    icon: FolderPlus,
  },
];

// Mock directories - in a real app, this would come from your API
const directories = [
  {
    id: "1",
    name: "Restaurant Directory",
    type: "restaurants",
  },
  {
    id: "2",
    name: "Local Business Guide",
    type: "businesses",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuth();
  const pathname = usePathname();

  // Close sidebar on route change on mobile
  if (isSidebarOpen && pathname) {
    setIsSidebarOpen(false);
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b bg-background sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6" />
          <span className="font-bold">DirectoryBuilder</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      <div className="flex h-[calc(100vh-65px)] lg:h-screen relative">
        {/* Sidebar Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:static inset-y-0 left-0 z-50 w-64 transform border-r bg-card transition-transform duration-200 ease-in-out lg:translate-x-0",
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            {/* Desktop Logo */}
            <div className="hidden lg:flex items-center space-x-2 px-6 py-4 border-b">
              <Globe className="h-6 w-6" />
              <span className="font-bold">DirectoryBuilder</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-4">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 rounded-lg px-3 py-2 transition-colors",
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}

              <div className="mt-6">
                <h4 className="px-3 text-sm font-medium text-muted-foreground mb-2">
                  Your Directories
                </h4>
                {directories.map((directory) => (
                  <div
                    key={directory.id}
                    className="group relative"
                  >
                    <div className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
                      <div className="flex items-center space-x-3">
                        <Building className="h-5 w-5" />
                        <span className="truncate">{directory.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="invisible group-hover:visible absolute left-full top-0 ml-2 w-48 rounded-lg border bg-card shadow-lg">
                      <div className="py-1">
                        <Link
                          href={`/dashboard/directory/${directory.id}`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/listings`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <FileStack className="mr-2 h-4 w-4" />
                          All Listings
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/listings/pending`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <ListChecks className="mr-2 h-4 w-4" />
                          Pending Listings
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/listings/new`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          New Listing
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/categories`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <Tags className="mr-2 h-4 w-4" />
                          Categories & Tags
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/blog`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <BookOpen className="mr-2 h-4 w-4" />
                          All Blog Posts
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/blog/new`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <FileEdit className="mr-2 h-4 w-4" />
                          New Blog Post
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/pages`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          Pages
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/emails`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          Emails
                        </Link>
                        <Link
                          href={`/dashboard/directory/${directory.id}/settings`}
                          className="flex items-center px-4 py-2 text-sm hover:bg-accent"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Settings
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </nav>

            {/* User Menu & Settings */}
            <div className="border-t p-4 space-y-4">
              {/* User Profile */}
              <div className="flex items-center gap-3 px-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={user?.avatar} alt={user?.email} />
                  <AvatarFallback>
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>

              <Separator />

              {/* Settings & Logout */}
              <div className="space-y-1">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-background p-4 lg:p-8">
          <div className="mx-auto max-w-6xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}