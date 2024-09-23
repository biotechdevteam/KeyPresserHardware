"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { AvatarIcon, BellIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Dialog,
  Badge,
  Box,
  Flex,
  IconButton,
  Em,
  Separator,
} from "@radix-ui/themes";

// array of pages
const pages = [
  {
    title: "home",
    link: "/",
  },
  {
    title: "about",
    link: "/about",
  },
  {
    title: "services",
    link: "/services",
  },
  {
    title: "projects",
    link: "/projects",
  },
  {
    title: "events",
    link: "/events",
  },
  {
    title: "blog",
    link: "/blogs",
  },
  {
    title: "contact",
    link: "/contact",
  },
];

const NavBar = () => {
  const t = useTranslations("NavBar");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    // Logout logic here
  };

  const handleNotificationsMenu = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <Flex gap="8" m="4">
        {/* Logo */}
        <Box className="flex-grow flex-shrink-0">
          <Link href="/" className=" text-lg font-semibold color-blue-500">
            <img src="" alt="" className="w-32 h-auto" />
            Biotech Universe
          </Link>
        </Box>

        {/* Desktop Menu */}
        <Flex gap="8" justify="between">
          <Flex gap="4">
            {pages.map((page) => (
              <Link
                href={page.link}
                key={page.title}
                className="text-blue-500 hover:text-blue-600"
              >
                {t(page.title)}
              </Link>
            ))}
          </Flex>

          <Flex gap="8">
            {/* {user && ( */}
            <>
              {/* Notifications */}
              <Flex gap="4" direction="column">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <IconButton
                      radius="full"
                      variant="soft"
                      aria-label="Show Notifications"
                      className="relative hover:bg-transparent cursor-pointer"
                    >
                      <BellIcon className="w-6 h-6 text-blue-500" />
                      {/* <Badge className="w-1 h-1 text-red-500 ">17</Badge> */}
                    </IconButton>
                  </DropdownMenuTrigger>

                  {/* Notifications Menu */}
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild onClick={handleNotificationsMenu}>
                      {/* Add your notifications logic here */}
                      <Em>No new notifications</Em>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </Flex>
            </>
            {/* )} */}

            {/* Profile Menu */}
            <Flex gap="4" direction="column">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Link href="#">
                    <Avatar
                      src="/profile-pic-url"
                      fallback={
                        <AvatarIcon className="w-6 h-6 text-blue-500" />
                      }
                      radius="full"
                      className="cursor-pointer"
                    ></Avatar>
                  </Link>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {/* {!user ? ( */}
                  <DropdownMenuItem asChild>
                    <Link href="/login">{t("login")}</Link>
                  </DropdownMenuItem>
                  {/* ) : ( */}
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">{t("profile")}</Link>
                    </DropdownMenuItem>
                    {/* {user === "admin" && ( */}
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">{t("dashboard")}</Link>
                    </DropdownMenuItem>
                    {/* )} */}
                    <DropdownMenuItem asChild>
                      <Link href="#" onClick={handleLogout}>
                        {t("logout")}
                      </Link>
                    </DropdownMenuItem>
                  </>
                  {/* )} */}
                </DropdownMenuContent>
              </DropdownMenu>
            </Flex>
          </Flex>
        </Flex>

        {/* Mobile Menu */}
        <Dialog.Root>
          <Dialog.Trigger>
            <Button aria-label="Open Menu">
              <HamburgerMenuIcon />
            </Button>
          </Dialog.Trigger>

          <Dialog.Content>
            <Dialog.Title>Menu</Dialog.Title>

            <Flex gap="4" direction="column">
              <Flex gap="4" direction="column">
                {pages.map((page) => (
                  <Link
                    href={page.link}
                    key={page.title}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {t(page.title)}
                  </Link>
                ))}
              </Flex>

              <Separator my="3" size="4" />

              <Flex gap="4" direction="column">
                {/* {!user ? ( */}
                <Link
                  href="/login"
                  className="text-blue-500 hover:text-blue-600"
                >
                  {t("login")}
                </Link>
                {/* ) : ( */}
                <>
                  <Link
                    href="/profile"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {t("profile")}
                  </Link>
                  {/* {user === "admin" && ( */}
                  <Link
                    href="/dashboard"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {t("dashboard")}
                  </Link>
                  {/* )} */}
                  <Link
                    href="/dashboard"
                    onClick={handleLogout}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    {t("logout")}
                  </Link>
                </>
                {/* )} */}
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </nav>
  );
};

export default NavBar;
