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
        { name: "Total Users", data: 500, Icon: User, symbol: "+" },
        { name: "Pending Approvals", data: 20, Icon: Clipboard, symbol: "+" },
        { name: "Courses", data: 150, Icon: BookOpen, symbol: "+" },
      ];
    } else if (user?.user_type === "member") {
      roleCounts = [
        { name: "Enrolled Courses", data: 5, Icon: BookOpen },
        { name: "Wishlist", data: 10, Icon: Heart },
        { name: "Completed Quizzes", data: 12, Icon: CheckCircle },
      ];
    } else if (user?.user_type === "applicant") {
      roleCounts = [
        { name: "Submitted Applications", data: 3, Icon: FileText },
        { name: "Messages", data: 7, Icon: Mail, symbol: "+" },
        { name: "Upcoming Interviews", data: 2, Icon: Calendar },
      ];
    } else if (user?.user_type === "client") {
      roleCounts = [
        { name: "Ongoing Projects", data: 4, Icon: Briefcase },
        { name: "Completed Orders", data: 10, Icon: ShoppingCart, symbol: "+" },
        { name: "Pending Invoices", data: 2, Icon: DollarSign, symbol: "+" },
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
                data-countup-number={count.data} // Set the data attribute for counterUp
              >
                {count.data} +
                {count.symbol && <span>{count.symbol}</span>}
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
