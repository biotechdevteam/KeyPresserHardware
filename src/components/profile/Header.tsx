"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell,
  Menu,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  ChevronRight,
  X,
  LogOut,
} from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import useAuth from "@/lib/useAuth";
import { cn } from "@/lib/utils/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface HeaderProps {
  toggleSidebar: () => void;
  title?: string;
  subtitle?: string;
  actionLink?: {
    label: string;
    href: string;
  };
  breadcrumbs?: Array<{
    label: string;
    href: string;
  }>;
  tabs?: Tab[];
  variant?: "default" | "dashboard";
  showSearch?: boolean;
  notifications?: Array<{
    id: string;
    title: string;
    description: string;
    time: string;
    read: boolean;
  }>;
}

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  title = "Dashboard",
  subtitle,
  actionLink,
  breadcrumbs,
  tabs,
  variant = "default",
  showSearch = true,
  notifications = [],
}) => {
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const router = useTransitionRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    signOut();
    setShowLogoutDialog(false);
    router.push("/auth/signin", { onTransitionReady: slideFadeInOut });
  };

  const userInitials = user
    ? `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`
    : "U";

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={cn(
        "sticky top-0 z-30 w-full bg-background transition-all",
        variant === "dashboard" ? "pb-0" : ""
      )}
    >
      {/* Main Header */}
      <header className="flex h-16 w-full items-center justify-between border-b border-border px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden px-4 py-2 rounded-lg"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {breadcrumbs ? (
            <nav className="hidden md:flex items-center space-x-1 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href}>
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <Link
                    href={crumb.href}
                    className={cn(
                      "hover:text-foreground transition-colors",
                      index === breadcrumbs.length - 1
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {crumb.label}
                  </Link>
                </React.Fragment>
              ))}
            </nav>
          ) : (
            <div className="hidden md:flex">
              <Link href="/profile" className="text-xl font-bold text-primary">
                {title}
              </Link>
            </div>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          {showSearch && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-muted-foreground hover:text-foreground"
              >
                <Bell className="h-5 w-5" />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-secondary"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between px-4 py-2">
                <h3 className="font-medium">Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs text-primary hover:text-primary/80"
                >
                  Mark all as read
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "px-4 py-3 hover:bg-muted transition-colors cursor-pointer",
                        !notification.read &&
                          "border-l-2 border-primary bg-muted/50"
                      )}
                    >
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-medium">
                          {notification.title}
                        </p>
                        <p className="text-xs text-muted-foreground ml-2">
                          {notification.time}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-6 text-center text-muted-foreground">
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              <DropdownMenuSeparator />
              <div className="p-2 text-center">
                <Link
                  href="/notifications"
                  className="text-sm text-primary hover:underline"
                >
                  View all notifications
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex items-center ml-2"
                aria-label="User menu"
              >
                <Avatar className="h-8 w-8 ring-2 ring-background">
                  <AvatarImage src={user?.profile_photo_url} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userInitials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuSeparator className="md:hidden" />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setShowLogoutDialog(true)}
                className="flex items-center text-destructive focus:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Search Overlay */}
      <div
        className={`absolute left-0 top-0 w-full bg-background/95 backdrop-blur-sm px-4 py-3 transition-all duration-300 z-50 ${
          searchOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center border border-input rounded-md bg-background">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full px-3 py-2 bg-transparent focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus={searchOpen}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(false)}
            className="mr-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Logout confirmation dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to logout? Your session will be ended.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Dashboard Header Content (optional) */}
      {variant === "dashboard" && (
        <div className="px-4 py-5 border-b border-border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
              )}
            </div>
            {actionLink && (
              <Link
                href={actionLink.href}
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {actionLink.label}
              </Link>
            )}
          </div>

          {/* Tabs */}
          {tabs && tabs.length > 0 && (
            <Tabs defaultValue={tabs[0].id} className="mt-6">
              <TabsList className="w-full justify-start border-b bg-transparent h-auto p-0 mb-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:text-foreground data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent key={tab.id} value={tab.id} className="mt-6">
                  {tab.content}
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
