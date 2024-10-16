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
import Logo from "../../../public/images/logo.png";
import { useAuth } from "@/lib/useAuth";
import { About } from "@/types/aboutSchema";

// array of pages
const pages = [
  { title: "home", link: "/", icon: <Home /> },
  { title: "about", link: "/about", icon: <Users /> },
  { title: "services", link: "/services", icon: <HandPlatter /> },
  { title: "projects", link: "/projects", icon: <LibraryBig /> },
  { title: "events", link: "/events", icon: <CalendarFold /> },
  { title: "blog", link: "/blogs", icon: <Newspaper /> },
  { title: "contact", link: "/contact", icon: <BookUser /> },
];

const NavBar: React.FC<{aboutData: About}> = ({aboutData}) => {
  const t = useTranslations("NavBar");
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { isAuthenticated, user, signOut } = useAuth(); // Use the useAuth hook
  const logo = aboutData?.logo_url || Logo;

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent h-auto">
      <div className="flex justify-between m-4 md:px-8 xl:px-16">
        {/* Logo */}
        <div className="flex-shrink-0 text-center">
          <Link href="/">
            <Image
              src={logo}
              width={40}
              height={40}
              priority={true}
              alt={aboutData?.name}
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
                    <Separator className="my-4" />
                  </SheetHeader>
                  <div className="py-8">
                    {pages.map((page) => (
                      <Link href={page.link} key={page.title}>
                        <p className="flex gap-4 text-md hover:text-primary hover:no-underline">
                          {page.icon}
                          {t(page.title)}
                        </p>
                      </Link>
                    ))}
                    <Separator className="my-4" />
                    {!isAuthenticated ? (
                      <Link href="/auth/signin">
                        <p className="flex gap-4 text-md hover:text-primary hover:no-underline">
                          <LogIn />
                          {t("login")}
                        </p>
                      </Link>
                    ) : (
                      <>
                        <Link href="/profile">
                          <p className="flex gap-4 text-md hover:text-primary hover:no-underline">
                            <User />
                            {t("profile")}
                          </p>
                        </Link>
                        <Link href="#" onClick={signOut}>
                          <p className="flex gap-4 text-md hover:text-primary hover:no-underline">
                            <LogOut />
                            {t("logout")}
                          </p>
                        </Link>
                      </>
                    )}
                  </div>
                  <SheetFooter className="absolute bottom-8 left-0 right-0 text-xs text-center text-muted-foreground">
                    {aboutData?.name}
                  </SheetFooter>
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
                      <NavigationMenuLink href={page.link}>
                        {t(page.title)}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <div className="flex gap-4 sm:gap-1">
                {/* Notifications Menu */}
                {user && (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Bell />
                          <Badge>17</Badge>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="flex flex-column gap-3 p-2">
                          {/* Logic enters here */}
                          <NavigationMenuLink href="" asChild>
                            <em className="text-foreground">
                              No new notifications.
                            </em>
                          </NavigationMenuLink>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                )}

                {/* Profile Menu */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <Avatar>
                          <AvatarImage src={user?.profile_photo_url} />
                          <AvatarFallback>
                            <CircleUser />
                          </AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="gap-3 p-2">
                        {!isAuthenticated ? (
                          <NavigationMenuLink href="/auth/signin">
                            <LogIn className="mr-2 h-4 w-4" />
                            {t("login")}
                          </NavigationMenuLink>
                        ) : (
                          <>
                            <NavigationMenuLink href="/profile">
                              <User className="mr-2 h-4 w-4" />
                              {t("profile")}
                            </NavigationMenuLink>
                            <NavigationMenuLink href="" onClick={signOut}>
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
