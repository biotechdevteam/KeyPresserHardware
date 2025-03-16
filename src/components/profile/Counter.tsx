"use client";

import { useEffect, useState } from "react";
import useAuth from "@/lib/useAuth";
import counterUp from "@/lib/counterUp";
import {
  User,
  Clipboard,
  FileText,
  BookOpen,
  Heart,
  CheckCircle,
  Mail,
  Calendar,
  Briefcase,
  ShoppingCart,
  DollarSign,
  HelpCircle,
  UserCheck,
  Eye,
  HeartHandshake,
  TrendingUp,
  TrendingDown,
  Newspaper,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";

// Define the type for the count item
interface CountItem {
  name: string;
  data: number;
  Icon: React.ComponentType<{ className?: string }>;
  symbol?: string;
  trend?: number; // Percentage change (positive or negative)
  color?: string;
  description?: string;
}

const CounterDashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<CountItem[]>([]);

  // Update counts based on user role
  useEffect(() => {
    let roleCounts: CountItem[] = [];

    if (user?.user_type === "admin") {
      roleCounts = [
        {
          name: "Total Users",
          data: 1200,
          Icon: User,
          symbol: "+",
          trend: 12.5,
          color: "bg-blue-500",
          description: "Active users in the system",
        },
        {
          name: "Pending Approvals",
          data: 15,
          Icon: Clipboard,
          trend: -8.3,
          color: "bg-amber-500",
          description: "Applications awaiting review",
        },
        {
          name: "Active Projects",
          data: 25,
          Icon: Briefcase,
          trend: 4.2,
          color: "bg-green-500",
          description: "Projects in progress",
        },
        {
          name: "Upcoming Events",
          data: 5,
          Icon: Calendar,
          trend: 0,
          color: "bg-purple-500",
          description: "Events in the next 30 days",
        },
        {
          name: "Total Services Booked",
          data: 200,
          Icon: ShoppingCart,
          symbol: "+",
          trend: 15.4,
          color: "bg-pink-500",
          description: "Services booked this month",
        },
        {
          name: "Blog Articles",
          data: 60,
          Icon: BookOpen,
          trend: 7.8,
          color: "bg-emerald-500",
          description: "Published articles",
        },
        {
          name: "New Messages",
          data: 30,
          Icon: Mail,
          symbol: "+",
          trend: 22.5,
          color: "bg-indigo-500",
          description: "Unread messages",
        },
        {
          name: "Revenue",
          data: 5000,
          Icon: DollarSign,
          symbol: "$",
          trend: 9.3,
          color: "bg-sky-500",
          description: "Revenue generated this month",
        },
      ];
    } else if (user?.user_type === "member") {
      roleCounts = [
        {
          name: "Articles Written",
          data: 0,
          Icon: Newspaper,
          trend: 0,
          color: "bg-emerald-500",
          description: "Articles you have written",
        },
        {
          name: "Projects",
          data: 0,
          Icon: FileText,
          trend: 0,
          color: "bg-blue-500",
          description: "Projects you've contributed to",
        },
        {
          name: "Services Provided",
          data: 0,
          Icon: Briefcase,
          trend: 0,
          color: "bg-sky-500",
          description: "Active services you offer",
        },
        {
          name: "Bookings",
          data: 0,
          Icon: Calendar,
          trend: 0,
          color: "bg-purple-500",
          description: "Total bookings received",
        },
        {
          name: "Upcoming Events",
          data: 0,
          Icon: Calendar,
          trend: 0,
          color: "bg-amber-500",
          description: "Events where you're a speaker",
        },
        {
          name: "Wishlist Items",
          data: 0,
          Icon: Heart,
          trend: 0,
          color: "bg-pink-500",
          description: "Items in your wishlist",
        },
        {
          name: "Feedbacks",
          data: 0,
          Icon: CheckCircle,
          trend: 0,
          color: "bg-green-500",
          description: "Feedback received from clients",
        },
        {
          name: "Profile Views",
          data: 0,
          Icon: Eye,
          trend: 0,
          color: "bg-indigo-500",
          description: "Views in the last 30 days",
        },
      ];
    } else if (user?.user_type === "applicant") {
      roleCounts = [
        {
          name: "Applications",
          data: 1,
          Icon: FileText,
          trend: 0,
          color: "bg-blue-500",
          description: "Total applications submitted",
        },
        {
          name: "Interviews",
          data: 0,
          Icon: Calendar,
          trend: 0,
          color: "bg-amber-500",
          description: "Upcoming interviews",
        },
        {
          name: "Messages",
          data: 0,
          Icon: Mail,
          trend: 0,
          color: "bg-indigo-500",
          description: "Messages in your inbox",
        },
        {
          name: "Services Booked",
          data: 0,
          Icon: ShoppingCart,
          trend: 0,
          color: "bg-purple-500",
          description: "Services you've booked",
        },
        {
          name: "Interested Projects",
          data: 0,
          Icon: Heart,
          trend: 0,
          color: "bg-pink-500",
          description: "Projects you're interested in",
        },
        {
          name: "Events",
          data: 0,
          Icon: HeartHandshake,
          trend: 0,
          color: "bg-green-500",
          description: "Events you're interested in",
        },
        {
          name: "Profile Updates",
          data: 0,
          Icon: UserCheck,
          trend: 0,
          color: "bg-emerald-500",
          description: "Recent profile updates",
        },
      ];
    } else if (user?.user_type === "client") {
      roleCounts = [
        {
          name: "Services Booked",
          data: 0,
          Icon: ShoppingCart,
          trend: 0,
          color: "bg-purple-500",
          description: "Services currently booked",
        },
        {
          name: "Ongoing Projects",
          data: 3,
          Icon: Briefcase,
          symbol: "+",
          trend: 7.1,
          color: "bg-blue-500",
          description: "Projects in progress",
        },
        {
          name: "Completed Orders",
          data: 0,
          Icon: ShoppingCart,
          trend: 0,
          color: "bg-green-500",
          description: "Orders completed",
        },
        {
          name: "Pending Invoices",
          data: 3,
          Icon: DollarSign,
          symbol: "+",
          trend: 5.7,
          color: "bg-amber-500",
          description: "Invoices awaiting payment",
        },
        {
          name: "Events",
          data: 6,
          Icon: Calendar,
          trend: 20.0,
          color: "bg-sky-500",
          description: "Upcoming events",
        },
        {
          name: "Feedback Requests",
          data: 0,
          Icon: CheckCircle,
          trend: 0,
          color: "bg-pink-500",
          description: "Pending feedback requests",
        },
        {
          name: "Support Tickets",
          data: 0,
          Icon: HelpCircle,
          trend: 0,
          color: "bg-red-500",
          description: "Active support tickets",
        },
      ];
    }

    setCounts(roleCounts);
  }, [user]);

  useEffect(() => {
    // Initialize counterUp only after the counts are set and the component is mounted
    const timeoutId = setTimeout(() => {
      counterUp();
    }, 100); // small delay to ensure DOM elements are in place

    return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
  }, [counts]);

  return (
    <div
      className="p-6 bg-background rounded-lg"
      data-module="countup" // Add module attribute to ensure counterUp initializes correctly
    >
      <h2 className="text-2xl font-bold mb-6">
        {user?.user_type === "admin"
          ? "Admin Dashboard"
          : user?.user_type === "member"
          ? "Member Statistics"
          : user?.user_type === "client"
          ? "Client Overview"
          : "Applicant Dashboard"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {counts.map((count, idx) => (
          <Card
            key={idx}
            className="overflow-hidden transition-all hover:shadow-md"
          >
            <div className={cn("h-1.5", count.color || "bg-primary")} />
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center text-white",
                    count.color || "bg-primary"
                  )}
                >
                  <count.Icon className="h-6 w-6" />
                </div>
                {count.trend !== undefined && (
                  <div
                    className={cn(
                      "flex items-center text-xs font-medium",
                      count.trend > 0
                        ? "text-green-500"
                        : count.trend < 0
                        ? "text-red-500"
                        : "text-gray-400"
                    )}
                  >
                    {count.trend > 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : count.trend < 0 ? (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    ) : null}
                    {Math.abs(count.trend)}%
                  </div>
                )}
              </div>

              <div className="mt-4">
                <div className="flex items-end gap-1">
                  {count.symbol === "$" && (
                    <span className="text-2xl font-bold">{count.symbol}</span>
                  )}
                  <h3
                    className="text-3xl font-bold"
                    data-countup-number={count.data}
                  >
                    {count.data}
                  </h3>
                  {count.symbol && count.symbol !== "$" && (
                    <span className="text-2xl font-bold">{count.symbol}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {count.name}
                </p>
                {count.description && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {count.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CounterDashboard;
