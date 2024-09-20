import Link from "next/link";
import { useState } from "react";
import { useTranslations } from "next-intl";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const t = useTranslations("NavBar");

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-lg font-semibold">
              Biotech Universe
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link
              href="/projects"
              className="text-gray-800 hover:text-indigo-600"
            >
              {t("projects")}
            </Link>
            <Link
              href="/events"
              className="text-gray-800 hover:text-indigo-600"
            >
              {t("events")}
            </Link>
            <Link
              href="/services"
              className="text-gray-800 hover:text-indigo-600"
            >
              {t("services")}
            </Link>
            <Link href="/blog" className="text-gray-800 hover:text-indigo-600">
              {t("blog")}
            </Link>
            <Link
              href="/contact"
              className="text-gray-800 hover:text-indigo-600"
            >
              {t("contact")}
            </Link>
            <Link
              href="/about"
              className="text-gray-800 hover:text-indigo-600"
            >
              {t("about")}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  {/* Icon for Mobile Menu (Hamburger icon or text) */}
                  Menu
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/projects">{t("projects")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/events">{t("events")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services">{t("services")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/blog">{t("blog")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/contact">{t("contact")}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/about">{t("about")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
