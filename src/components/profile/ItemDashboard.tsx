"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ItemProps {
  name: string;
  path: string;
  icon: ReactNode;
  tag?: number;
  onClick?: () => void;
}

interface ItemDashboardProps {
  item: ItemProps;
}

const ItemDashboard: React.FC<ItemDashboardProps> = ({ item }) => {
  const currentPath = usePathname();
  const { name, path, icon, tag, onClick } = item;

  const isActive = currentPath === path;

  return (
    <li
      className={`py-2.5 border-b border-border dark:border-muted-foreground ${
        tag ? "flex justify-between items-center" : ""
      }`}
    >
      {onClick ? (
        // Render a button for items with an onClick handler (like "Logout")
        <button
          onClick={onClick}
          className={`w-full text-left flex items-center gap-3 ${
            isActive ? "text-primary" : "text-muted dark:text-muted-foreground"
          } hover:text-primary dark:hover:text-primary leading-[1.8]`}
        >
          {icon} {name}
        </button>
      ) : (
        // Render a Link for regular navigation items
        <Link
          href={path}
          className={`${
            isActive ? "text-primary" : "text-muted dark:text-muted-foreground"
          } hover:text-primary dark:hover:text-primary leading-[1.8] flex gap-3 text-nowrap`}
        >
          {icon} {name}
        </Link>
      )}

      {/* Optional tag display */}
      {tag && (
        <span className="text-xs font-medium text-foreground px-2 bg-primary leading-[14px] rounded-2xl">
          {tag}
        </span>
      )}
    </li>
  );
};

export default ItemDashboard;
