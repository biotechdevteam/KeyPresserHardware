"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useAuth from "@/lib/useAuth";
import {
  BarChart3,
  Briefcase,
  Calendar,
  FileText,
  HelpCircle,
  Home,
  Mail,
  MessageSquare,
  Settings,
  ShoppingCart,
  User,
  Users,
  X,
  BookOpen,
  Heart,
  Bookmark,
  Star,
  LogOut,
  Monitor,
  ShoppingBag,
  Bell,
  Newspaper,
  Edit,
  LayoutDashboard,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTransitionRouter } from "next-view-transitions";
import { slideFadeInOut } from "@/lib/utils/pageTransitions";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import { About } from "@/types/aboutSchema";

interface SidebarProps {
  aboutData?: About;
  isOpen: boolean;
  closeSidebar: () => void;
  variant?: "full" | "dashboard";
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: number;
  onClick?: () => void;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({
  aboutData,
  isOpen,
  closeSidebar,
  variant = "full",
}) => {
  const logo = aboutData?.logo_url || Logo;
  const pathname = usePathname();
  const router = useTransitionRouter();
  const { user, signOut } = useAuth();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = () => {
    signOut();
    setShowLogoutDialog(false);
    router.push("/auth/signin", { onTransitionReady: slideFadeInOut });
  };

  // Common navigation items for all users
  const commonNavItems: NavItem[] = [
    {
      label: "Overview",
      href: `${user?.user_type === "admin" ? "/admin" : "/profile"}`,
      icon: LayoutDashboard,
    },
    { label: "Edit Profile", href: "/edit-profile", icon: Edit },
    { label: "Settings", href: "/settings", icon: Settings },
    { label: "Help", href: "/help", icon: HelpCircle },
  ];

  // Role-specific navigation items
  const roleNavItems: Record<string, NavSection[]> = {
    admin: [
      {
        title: "Administration",
        items: [
          { label: "Users", href: "/admin/users", icon: Users },
          { label: "Projects", href: "/projects", icon: Briefcase },
          { label: "Events", href: "/Events", icon: Calendar },
          { label: "Analytics", href: "/analytics", icon: BarChart3 },
          { label: "Content", href: "/content", icon: FileText },
          { label: "Reviews", href: "/admin/reviews", icon: Star },
          { label: "Services", href: "/services", icon: ShoppingCart },
          {
            label: "Messages",
            href: "/messages",
            icon: MessageSquare,
            tag: 12,
          },
        ],
      },
    ],
    member: [
      {
        title: "Main Menu",
        items: [
          { label: "My Articles", href: "/articles", icon: Newspaper },
          { label: "Projects", href: "/projects", icon: Briefcase },
          { label: "My Services", href: "/services", icon: ShoppingCart },
          { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
          { label: "Reviews", href: "/reviews", icon: Star },
          { label: "Bookings", href: "/bookings", icon: Calendar },
          { label: "Events", href: "/events", icon: Calendar },
          {
            label: "Messages",
            href: "/messages",
            icon: MessageSquare,
            tag: 12,
          },
        ],
      },
    ],
    client: [
      {
        title: "Services",
        items: [
          { label: "Order History", href: "/orders", icon: ShoppingBag },
          { label: "Bookmarks", href: "/bookmarks", icon: Bookmark },
          { label: "Projects", href: "/projects", icon: Monitor },
          { label: "Invoices", href: "/invoices", icon: FileText },
          { label: "Support", href: "/support", icon: MessageSquare },
        ],
      },
    ],
    applicant: [
      {
        title: "Applications",
        items: [
          { label: "Applications", href: "/applications", icon: FileText },
          { label: "Interviews", href: "/interviews", icon: Calendar },
          { label: "Projects", href: "/projects", icon: Briefcase },
          { label: "Wishlist", href: "/wishlist", icon: Heart },
        ],
      },
    ],
  };

  // Get navigation items based on user role
  const userRoleSections = user?.user_type
    ? roleNavItems[user.user_type] || []
    : [];

  // Add logout option to all users
  const accountSection: NavSection = {
    title: "Account",
    items: [
      {
        label: "Logout",
        href: "#",
        icon: LogOut,
        onClick: () => setShowLogoutDialog(true),
      },
    ],
  };

  const isLinkActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`);
  };

  // Determine sidebar classes based on variant
  const sidebarClasses =
    variant === "full"
      ? cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-background transition-transform duration-300 md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )
      : "rounded-lg shadow-lg bg-card text-card-foreground h-full";

  return (
    <>
      {/* Mobile overlay - only for full variant */}
      {variant === "full" && isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses}>
        {variant === "full" && (
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={logo}
                width={25}
                height={25}
                priority
                alt={aboutData?.name || "Logo"}
                className="transition-transform duration-300 hover:scale-110"
              />
              <span>Home</span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden px-3"
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        )}

        <ScrollArea
          className={
            variant === "full"
              ? "h-[calc(100vh-4rem)]"
              : "max-h-[calc(100vh-8rem)]"
          }
        >
          <div className="px-4 py-4">
            {/* User profile section */}
            <div className="mb-6">
              <Link
                href="/edit-profile"
                className="group flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user?.profile_photo_url || ""}
                    alt={user?.first_name}
                  />
                  <AvatarFallback className="bg-primary/10">
                    {user?.first_name?.[0]}
                    {user?.last_name?.[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {user?.first_name} {user?.last_name}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize">
                    {user?.user_type}
                  </span>
                </div>
              </Link>
            </div>

            <Separator className="my-4" />

            {/* Role-specific navigation */}
            {userRoleSections.map((section, idx) => (
              <div key={idx} className="mb-6">
                {section.title && (
                  <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                    {section.title}
                  </h3>
                )}
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.onClick ? "#" : item.href}
                      onClick={item.onClick}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                        isLinkActive(item.href)
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-muted"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isLinkActive(item.href) ? "text-primary" : ""
                          )}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.tag && (
                        <Badge variant="secondary" className="ml-auto">
                          {item.tag}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </nav>
              </div>
            ))}

            {/* Common navigation */}
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                General
              </h3>
              <nav className="space-y-1">
                {commonNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors",
                      isLinkActive(item.href)
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon
                        className={cn(
                          "h-4 w-4",
                          isLinkActive(item.href) ? "text-primary" : ""
                        )}
                      />
                      <span>{item.label}</span>
                    </div>
                    {item.tag && (
                      <Badge variant="secondary" className="ml-auto">
                        {item.tag}
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Account section with logout */}
            <div className="mb-6">
              <h3 className="px-3 text-xs font-semibold uppercase text-muted-foreground tracking-wider mb-2">
                {accountSection.title}
              </h3>
              <nav className="space-y-1">
                {accountSection.items.map((item, idx) => (
                  <Link
                    key={idx}
                    href={item.onClick ? "#" : item.href}
                    onClick={item.onClick}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Footer - only for full variant */}
          {variant === "full" && (
            <div className="mt-auto p-4 border-t border-border">
              <div className="flex items-center justify-center">
                <div className="text-xs text-muted-foreground">
                  <p>&copy; {new Date().getFullYear()} {aboutData?.name}</p>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </aside>

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
    </>
  );
};

export default Sidebar;
