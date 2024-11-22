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
} from "lucide-react";
import { Card } from "@/components/ui/card"; // Import the Card component

// Define the type for the count item
interface CountItem {
  name: string;
  data: number;
  Icon: React.ComponentType; // Icon component from Lucide
  symbol?: string;
}

const CounterDashboard = () => {
  const { user } = useAuth();
  const [counts, setCounts] = useState<CountItem[]>([]);

  // Update counts based on user role
  useEffect(() => {
    let roleCounts: CountItem[] = [];

    if (user?.user_type === "admin") {
      roleCounts = [
        { name: "Total Users", data: 1200, Icon: User, symbol: "+" },
        { name: "Pending Approvals", data: 15, Icon: Clipboard },
        { name: "Active Projects", data: 25, Icon: Briefcase },
        { name: "Upcoming Events", data: 5, Icon: Calendar },
        {
          name: "Total Services Booked",
          data: 200,
          Icon: ShoppingCart,
          symbol: "+",
        },
        { name: "Blog Articles Published", data: 60, Icon: BookOpen },
        { name: "New Messages", data: 30, Icon: Mail, symbol: "+" },
        {
          name: "Revenue Generated",
          data: 5000,
          Icon: DollarSign,
          symbol: "$",
        },
      ];
    } else if (user?.user_type === "member") {
      roleCounts = [
        { name: "Courses Managed", data: 8, Icon: BookOpen },
        { name: "Projects Contributed", data: 12, Icon: FileText },
        { name: "Services Provided", data: 18, Icon: Briefcase },
        { name: "Bookings Received", data: 22, Icon: Calendar, symbol: "+" },
        { name: "Upcoming Events as Speaker", data: 3, Icon: Calendar },
        { name: "Wishlist Items", data: 10, Icon: Heart },
        { name: "Feedback Received", data: 15, Icon: CheckCircle },
        { name: "Articles Written", data: 5, Icon: BookOpen },
        { name: "Profile Views", data: 150, Icon: Eye, symbol: "+" },
      ];
    } else if (user?.user_type === "applicant") {
      roleCounts = [
        { name: "Submitted Applications", data: 6, Icon: FileText },
        { name: "Upcoming Interviews", data: 3, Icon: Calendar },
        { name: "Messages Received", data: 12, Icon: Mail },
        { name: "Services Booked", data: 4, Icon: ShoppingCart },
        { name: "Projects Interested In", data: 5, Icon: Heart },
        { name: "Events Interested In", data: 5, Icon: HeartHandshake },
        { name: "Profile Updates", data: 2, Icon: UserCheck },
      ];
    } else if (user?.user_type === "client") {
      roleCounts = [
        { name: "Services Booked", data: 4, Icon: ShoppingCart },
        { name: "Ongoing Projects", data: 4, Icon: Briefcase },
        { name: "Enrolled Courses", data: 8, Icon: BookOpen },
        { name: "Completed Orders", data: 15, Icon: ShoppingCart, symbol: "+" },
        { name: "Pending Invoices", data: 3, Icon: DollarSign },
        { name: "Events Scheduled", data: 6, Icon: Calendar },
        { name: "Messages from Team", data: 9, Icon: Mail },
        { name: "Feedback Requests", data: 2, Icon: CheckCircle },
        { name: "Blog Posts Read", data: 20, Icon: BookOpen },
        { name: "Support Tickets", data: 1, Icon: HelpCircle },
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
      className="p-6 bg-background shadow-md rounded-lg"
      data-module="countup" // Add module attribute to ensure counterUp initializes correctly
    >
      <div className="counter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {counts.map((count, idx) => (
          <Card key={idx} className="flex items-center gap-4 p-6 shadow-lg">
            <div className="text-primary">
              <count.Icon />
            </div>
            <div>
              <h3
                className="text-3xl font-bolder text-foreground"
                data-countup-number={count.data} 
              >
              </h3>
              <p className="text-lg font-medium text-foreground">{count.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CounterDashboard;
