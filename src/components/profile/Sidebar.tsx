"use client";
import {
  Home,
  User,
  MessageSquare,
  Bookmark,
  Star,
  Settings,
  LogOut,
  Monitor,
  ShoppingBag,
} from "lucide-react";
import ItemsDashboard from "./ItemsDashboard";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/lib/useAuth";

interface SidebarItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  tag?: number;
  onClick?: () => void;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

const SidebarDashboard = () => {
  const { user, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const handleLogoutClick = () => setShowModal(true);
  const handleSignOut = () => {
    signOut();
    setShowModal(false);
    router.push("/");
  };
  const closeModal = () => setShowModal(false);

  const createSidebarItems = (userType: string): SidebarSection[] => {
    const commonItems: SidebarSection[] = [
      {
        title: `WELCOME, ${user?.first_name}`,
        items: [
          {
            name: "Dashboard",
            path: "/profile/",
            icon: <Home size={18} />,
          },
          {
            name: "My Profile",
            path: "/profile/profile",
            icon: <User size={18} />,
          },
          {
            name: "Messages",
            path: "/profile",
            icon: <MessageSquare size={18} />,
            tag: 12,
          },
          {
            name: "Settings",
            path: "/profile/settings",
            icon: <Settings size={18} />,
          },
        ],
      },
      {
        title: userType.toUpperCase(),
        items: [
          {
            name: "Logout",
            path: "#",
            icon: <LogOut size={18} />,
            onClick: handleLogoutClick,
          },
        ],
      },
    ];

    switch (userType) {
      case "admin":
        return [
          ...commonItems,
          {
            title: "",
            items: [
              {
                name: "Users",
                path: "/profile",
                icon: <Bookmark size={18} />,
              },
              {
                name: "Reviews",
                path: "/profile",
                icon: <Star size={18} />,
              },
            ],
          },
        ];
      case "member":
        return [
          ...commonItems,
          {
            title: "",
            items: [
              {
                name: "Bookmarks",
                path: "/profile",
                icon: <Bookmark size={18} />,
              },
              {
                name: "Reviews",
                path: "/profile",
                icon: <Star size={18} />,
              },
            ],
          },
        ];
      case "applicant":
        return [
          ...commonItems,
          {
            title: "",
            items: [
              {
                name: "Applications",
                path: "/profile",
                icon: <Bookmark size={18} />,
              },
            ],
          },
        ];
      case "client":
        return [
          ...commonItems,
          {
            title: "",
            items: [
              {
                name: "Projects",
                path: "/profile",
                icon: <Monitor size={18} />,
              },
              {
                name: "Order History",
                path: "/profile",
                icon: <ShoppingBag size={18} />,
              },
            ],
          },
        ];
      default:
        return [];
    }
  };

  const items = createSidebarItems(user?.user_type || "client");

  return (
    <>
      <div className="lg:col-start-1 lg:col-span-3">
        <div className="p-6 lg:p-5 rounded-lg shadow-accordion dark:shadow-accordion-dark bg-foreground dark:bg-background">
          {items.map((item, idx) => (
            <ItemsDashboard key={idx} item={item} />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-container absolute">
          <div className="modal fixed top-0 left-0 w-full h-full bg-opacity-50 bg-gray-900 z-50 flex items-center justify-center">
            <div className="modal-content bg-foreground p-5 rounded shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
              <p>Are you sure you want to logout?</p>
              <div className="flex justify-end mt-4 gap-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-muted rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 bg-danger text-white rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarDashboard;
