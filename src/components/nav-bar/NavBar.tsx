"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  Bell,
  BookUser,
  CalendarFold,
  CircleUser,
  HandPlatter,
  Home,
  LibraryBig,
  LogIn,
  LogOut,
  Menu,
  Newspaper,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "../ui/separator";
import { useMediaQuery } from "usehooks-ts";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import { useAuth } from "@/lib/useAuth";

// array of pages
const pages = [
  { title: "home", link: "/", icon: <Home /> },
  { title: "about", link: "/about", icon: <Users /> },
  { title: "services", link: "/services", icon: <HandPlatter /> },
  { title: "projects", link: "/projects", icon: <LibraryBig /> },
  { title: "events", link: "/events", icon: <CalendarFold /> },
  { title: "blog", link: "/blogs", icon: <Newspaper /> },
  { title: "contact", link: "/contact", icon: <BookUser /> },
  { title: "faqs", link: "/faqs", icon: <BookUser /> },
];

const NavBar = () => {
  const t = useTranslations("NavBar");
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { isAuthenticated, user, signOut } = useAuth(); // Use the useAuth hook

  return (
    <nav className="border-b border-gray-200 fixed top-0 left-0 right-0 z-50 bg-card h-[72px]">
      <div className="flex justify-between m-4 md:pr-8 xl:pr-16">
        {/* Logo */}
        <div className="flex-shrink-0 text-center">
          <Link href="/">
            <Image
              src={Logo}
              width={40}
              height={40}
              priority={true}
              alt="Biotech Universe"
              className="rounded"
            />
          </Link>
        </div>

        <div>
          {isSmallDevice ? (
            <div>
              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger>
                  <Menu />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <Separator className="my-4" />
                  {pages.map((page) => (
                    <Link href={page.link} key={page.title}>
                      <p className="flex gap-4 text-md hover:text-primary">
                        {page.icon}
                        {t(page.title)}
                      </p>
                    </Link>
                  ))}
                  <Separator className="my-4" />
                  {!isAuthenticated ? (
                    <Link href="/login">
                      <p className="flex gap-4 text-md hover:text-primary">
                        <LogIn />
                        {t("login")}
                      </p>
                    </Link>
                  ) : (
                    <>
                      <Link href="/profile">
                        <p className="flex gap-4 text-md hover:text-primary">
                          <User />
                          {t("profile")}
                        </p>
                      </Link>
                      <Link href="#" onClick={signOut}>
                        <p className="flex gap-4 text-md hover:text-primary">
                          <LogOut />
                          {t("logout")}
                        </p>
                      </Link>
                    </>
                  )}
                  <SheetFooter></SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex gap-8 xl:gap-48">
              {/* Desktop Menu */}
              <NavigationMenu>
                <NavigationMenuList>
                  {pages.map((page) => (
                    <NavigationMenuItem key={page.title}>
                      <Link href={page.link} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={navigationMenuTriggerStyle()}
                        >
                          {t(page.title)}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex gap-4 sm:gap-1">
                {/* Profile Menu */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <Avatar>
                          <AvatarImage src={user?.profile_photo_url || ""} />
                          <AvatarFallback>
                            <CircleUser />
                          </AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="gap-3 p-2">
                        {!isAuthenticated ? (
                          <NavigationMenuLink
                            href="/auth/signin"
                            className={navigationMenuTriggerStyle()}
                          >
                            <LogIn className="mr-2 h-4 w-4" />
                            {t("login")}
                          </NavigationMenuLink>
                        ) : (
                          <>
                            <NavigationMenuLink
                              href="/profile"
                              className={navigationMenuTriggerStyle()}
                            >
                              <User className="mr-2 h-4 w-4" />
                              {t("profile")}
                            </NavigationMenuLink>
                            <NavigationMenuLink
                              onClick={signOut}
                              className={navigationMenuTriggerStyle()}
                            >
                              <LogOut className="mr-2 h-4 w-4" />
                              {t("logout")}
                            </NavigationMenuLink>
                          </>
                        )}
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
