"use client";

import { Link, useTransitionRouter } from "next-view-transitions";
import { useTranslations } from "next-intl";
import React from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  ListItem,
  useNavigationItemTheme,
} from "@/components/ui/navigation-menu";
import {
  Bell,
  CircleUser,
  Heart,
  Info,
  LogIn,
  LogOut,
  Menu,
  User,
  Users,
  Calendar,
  FileText,
  FolderOpen,
  Briefcase,
  Newspaper,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetBody,
  SheetClose,
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
import { NavCollapsible, NavCollapsibleListItem } from "../ui/collapsible";
import { slideInOut } from "../../lib/utils/pageTransitions";
import useAuth from "@/lib/useAuth";
import { About } from "@/types/aboutSchema";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// array of pages
type Pages = {
  title: string;
  link: string;
  description?: string;
  icon?: React.ReactNode;
};

const navMenu: Pages[][] = [
  // Home
  [{ title: "home", link: "/" }],

  // About
  [{ title: "about us", link: "/about" }],

  // Membership
  [
    {
      title: "members",
      link: "/members",
      description:
        "A showcase of current members and their contributions to the association.",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "membership qualifications",
      link: "/membership-qualifications",
      description:
        "Information on the criteria required to become a member of the association.",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "membership benefits",
      link: "/membership-benefits",
      description:
        "Explore the benefits and privileges that come with being a member.",
      icon: <Heart className="h-4 w-4" />,
    },
    {
      title: "membership tiers",
      link: "/membership-tiers",
      description:
        "Learn about the different membership tiers and the benefits associated with each level.",
      icon: <Users className="h-4 w-4" />,
    },
    {
      title: "membership faqs",
      link: "/membership-faqs",
      description:
        "Answers to common questions about membership processes and benefits.",
      icon: <FileText className="h-4 w-4" />,
    },
  ],

  // Events
  [
    {
      title: "calender of activities",
      link: "/calender-of-activities",
      description:
        "Stay updated with our calendar of upcoming events, meetings, and important dates.",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "upcoming events",
      link: "/upcoming-events",
      description:
        "Find details on upcoming association-hosted events, workshops, and conferences.",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "exhibitions & sponsorship",
      link: "/exhibitions-&-sponsorship",
      description:
        "Information on exhibitions and sponsorship opportunities within the association.",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      title: "past events",
      link: "/past-events",
      description:
        "Explore details and summaries of past events and their outcomes.",
      icon: <Calendar className="h-4 w-4" />,
    },
  ],

  // Resources
  [
    {
      title: "news & insights",
      link: "/news-&-insights",
      description:
        "Stay informed with the latest news, industry insights, and updates from the association.",
      icon: <Newspaper className="h-4 w-4" />,
    },
    // {
    //   title: "brochure",
    //   link: "/brochure",
    //   description:
    //     "Download the official association brochure to get a detailed overview of its services and activities.",
    // },
    {
      title: "whitepapers",
      link: "/whitepapers",
      description:
        "Read in-depth whitepapers on key topics and research areas in the industry.",
      icon: <FileText className="h-4 w-4" />,
    },
  ],

  // Projects
  [
    {
      title: "ongoing projects",
      link: "/ongoing-projects",
      description:
        "Learn about the association's ongoing projects and their current progress.",
      icon: <FolderOpen className="h-4 w-4" />,
    },
    {
      title: "upcoming projects",
      link: "/upcoming-projects",
      description:
        "Details on future projects the association plans to launch.",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      title: "portfolio",
      link: "/portfolio",
      description:
        "View the association's completed projects and their impacts.",
      icon: <FolderOpen className="h-4 w-4" />,
    },
  ],

  // Contact
  [{ title: "contact us", link: "/contact" }],

  // Donate
  [{ title: "support", link: "/donate" }],

  // Profile
  [
    { title: "profile", link: "/profile" },
    { title: "dashboard", link: "/dashboard-admin" },
  ],

  // Login
  [{ title: "login", link: "/auth/signin" }],

  // Services
  [{ title: "services", link: "/services" }],
];

const NavBar: React.FC<{ aboutData: About }> = ({ aboutData }) => {
  const t = useTranslations("NavBar");
  const logo = aboutData?.logo_url || Logo;
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const { isAuthenticated, user, profile, signOut } = useAuth();
  const router = useTransitionRouter();
  const pathname = usePathname();
  const themeClass = useNavigationItemTheme({ theme: "auto" });
  const isLandingPage = pathname === "/en/home" || pathname === "/fr/home";

  const handleClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    router.push(url, { onTransitionReady: slideInOut });
  };

  function handleLogout(e: React.MouseEvent, url: string) {
    signOut();
    handleClick(e, url);
  }

  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const handleOpenChange = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let homePage = navMenu[0][0];
  let aboutPage = navMenu[1][0];
  let membershipPages = navMenu[2];
  let eventsPages = navMenu[3];
  let resourcesPages = navMenu[4];
  let projectsPages = navMenu[5];
  let contactPage = navMenu[6][0];
  let donationPage = navMenu[7][0];
  let profilePage = navMenu[8][0];
  let LoginPage = navMenu[9][0];
  let servicesPage = navMenu[10][0];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent h-auto backdrop-blur-sm">
      <div className="flex lg:justify-evenly justify-between items-center m-4">
        {/* Logo */}
        <div className="flex-shrink-0 text-center cursor-pointer">
          <Link href={homePage.link}>
            <Image
              src={logo}
              width={50}
              height={50}
              priority
              alt={aboutData?.name}
              className="transition-transform duration-300 hover:scale-110"
            />
          </Link>
        </div>

        <div>
          {/* Mobile Menu */}
          {isSmallDevice ? (
            <Sheet>
              <SheetTrigger
                aria-label="Open menu"
                className="hover:bg-primary/10 transition-colors duration-300"
              >
                <Menu className="h-6 w-6 text-foreground hover:text-primary focus:text-primary transition-all duration-300" />
              </SheetTrigger>
              <SheetContent size="md" className="flex flex-col">
                <SheetHeader className="mb-0">
                  <div className="flex justify-between items-center mb-2">
                    <SheetTitle className="text-2xl tracking-tight font-bold text-primary">
                      Menu
                    </SheetTitle>
                    {!isAuthenticated ? (
                      <SheetClose asChild>
                        <Link
                          href={LoginPage.link}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-medium transition-all duration-300 hover:bg-primary/90 hover:text-primary-foreground hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          <span>{LoginPage.title}</span>
                          <LogIn className="w-4 h-4" />
                        </Link>
                      </SheetClose>
                    ) : (
                      <SheetClose asChild>
                        <Link
                          href={profilePage.link}
                          className="flex items-center gap-2 group"
                        >
                          <Avatar className="h-8 w-8 border-transparent group-hover:border-primary transition-all shadow-sm">
                            <AvatarImage
                              src={profile?.profile_photo_url as string}
                              alt="Profile"
                            />
                            <AvatarFallback className="bg-primary/10 text-primary">
                              <CircleUser className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        </Link>
                      </SheetClose>
                    )}
                  </div>
                  <Separator
                    className={cn("my-2", isLandingPage && "bg-gray-200")}
                  />
                </SheetHeader>

                <SheetBody className="flex-1 overflow-y-auto py-4 space-y-2">
                  <NavCollapsible
                    triggerText="About Us"
                    isOpen={openIndex === 0}
                    onOpenChange={() => handleOpenChange(0)}
                    variant="subtle"
                    size="md"
                    icon={<Briefcase className="h-4 w-4 text-primary" />}
                  >
                    <ul className="space-y-1 py-1 pl-2">
                      <SheetClose asChild key={aboutPage.title}>
                        <NavCollapsibleListItem
                          href={aboutPage.link}
                          active={pathname === aboutPage.link}
                          className="group justify-start"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {aboutPage.title}
                          </span>
                        </NavCollapsibleListItem>
                      </SheetClose>
                    </ul>
                  </NavCollapsible>

                  <NavCollapsible
                    triggerText="Membership"
                    isOpen={openIndex === 1}
                    onOpenChange={() => handleOpenChange(1)}
                    variant="subtle"
                    size="md"
                    icon={<Users className="h-4 w-4 text-primary" />}
                  >
                    <ul className="space-y-1 py-1 pl-2">
                      {membershipPages.map((page) => (
                        <SheetClose asChild key={page.title}>
                          <NavCollapsibleListItem
                            href={page.link}
                            active={pathname === page.link}
                            className="group justify-start"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {page.title}
                            </span>
                          </NavCollapsibleListItem>
                        </SheetClose>
                      ))}
                    </ul>
                  </NavCollapsible>

                  <NavCollapsible
                    triggerText="Events"
                    isOpen={openIndex === 2}
                    onOpenChange={() => handleOpenChange(2)}
                    variant="subtle"
                    size="md"
                    icon={<Calendar className="h-4 w-4 text-primary" />}
                  >
                    <ul className="space-y-1 py-1 pl-2">
                      {eventsPages.map((page) => (
                        <SheetClose asChild key={page.title}>
                          <NavCollapsibleListItem
                            href={page.link}
                            active={pathname === page.link}
                            className="group justify-start"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {page.title}
                            </span>
                          </NavCollapsibleListItem>
                        </SheetClose>
                      ))}
                    </ul>
                  </NavCollapsible>

                  <NavCollapsible
                    triggerText="Resources"
                    isOpen={openIndex === 3}
                    onOpenChange={() => handleOpenChange(3)}
                    variant="subtle"
                    size="md"
                    icon={<FileText className="h-4 w-4 text-primary" />}
                  >
                    <ul className="space-y-1 py-1 pl-2">
                      {resourcesPages.map((page) => (
                        <SheetClose asChild key={page.title}>
                          <NavCollapsibleListItem
                            href={page.link}
                            active={pathname === page.link}
                            className="group justify-start"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {page.title}
                            </span>
                          </NavCollapsibleListItem>
                        </SheetClose>
                      ))}
                    </ul>
                  </NavCollapsible>

                  <NavCollapsible
                    triggerText="Projects"
                    isOpen={openIndex === 4}
                    onOpenChange={() => handleOpenChange(4)}
                    variant="subtle"
                    size="md"
                    icon={<FolderOpen className="h-4 w-4 text-primary" />}
                  >
                    <ul className="space-y-1 py-1 pl-2">
                      {projectsPages.map((page) => (
                        <SheetClose asChild key={page.title}>
                          <NavCollapsibleListItem
                            href={page.link}
                            active={pathname === page.link}
                            className="group justify-start"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {page.title}
                            </span>
                          </NavCollapsibleListItem>
                        </SheetClose>
                      ))}
                    </ul>
                  </NavCollapsible>

                  <NavCollapsible
                    triggerText="Services"
                    isOpen={openIndex === 5}
                    onOpenChange={() => handleOpenChange(5)}
                    variant="subtle"
                    size="md"
                    icon={<Briefcase className="h-4 w-4 text-primary" />}
                  >
                    <ul className="space-y-1 py-1 pl-2">
                      <SheetClose asChild key={servicesPage.title}>
                        <NavCollapsibleListItem
                          href={servicesPage.link}
                          active={pathname === servicesPage.link}
                          className="group justify-start"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {servicesPage.title}
                          </span>
                        </NavCollapsibleListItem>
                      </SheetClose>
                    </ul>
                  </NavCollapsible>

                  {/* Quick Action Buttons for Mobile */}
                  {!isAuthenticated && (
                    <div className="mt-6 space-y-3 px-1">
                      <SheetClose asChild>
                        <Link
                          href={contactPage.link}
                          className="flex items-center justify-center rounded-lg border border-primary text-primary px-4 py-2 hover:bg-primary/10 transition-all duration-300"
                        >
                          <span>{contactPage.title}</span>
                        </Link>
                      </SheetClose>

                      <SheetClose asChild>
                        <Link
                          href={donationPage.link}
                          className="rounded-lg bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 hover:text-primary-foreground hover:shadow-md transition-all duration-300 flex items-center justify-center"
                        >
                          <span>{donationPage.title}</span>
                          <Heart className="ml-2 w-4 h-4" />
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </SheetBody>

                <SheetFooter
                  sticky
                  className={cn(
                    "border-t bg-card/90 py-3 px-6 mt-auto",
                    isLandingPage && "border-gray-200"
                  )}
                >
                  <div className="w-full flex justify-center gap-2 text-xs">
                    <span
                      className={cn(
                        "text-muted-foreground",
                        isLandingPage && "text-gray-200"
                      )}
                    >
                      &copy; {new Date().getFullYear()} {aboutData?.name}
                    </span>
                  </div>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex justify-evenly">
              {/* Main Navigation Items */}
              <div className="flex items-center">
                {/* Use a single Navigation Menu for all main menu items */}
                <NavigationMenu theme="auto" size="md">
                  <NavigationMenuList>
                    {/* About Us */}

                    <NavigationMenuItem>
                      <NavigationMenuLink href={aboutPage.link}>
                        {aboutPage.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>

                    {/* Membership */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Membership</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[700px] gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
                          {membershipPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              description={page.description}
                              icon={page.icon}
                              className="hover:bg-primary/5 border border-transparent hover:border-primary/10 rounded-lg transition-all duration-300"
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Events */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[700px] gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
                          {eventsPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              description={page.description}
                              icon={page.icon}
                              className="hover:bg-primary/5 border border-transparent hover:border-primary/10 rounded-lg transition-all duration-300"
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Resources */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[700px] gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
                          {resourcesPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              description={page.description}
                              icon={page.icon}
                              className="hover:bg-primary/5 border border-transparent hover:border-primary/10 rounded-lg transition-all duration-300"
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Projects */}
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[700px] gap-3 p-4 md:w-[800px] md:grid-cols-3 lg:w-[900px]">
                          {projectsPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              description={page.description}
                              icon={page.icon}
                              className="hover:bg-primary/5 border border-transparent hover:border-primary/10 rounded-lg transition-all duration-300"
                            />
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Services */}
                    <NavigationMenuItem>
                      <NavigationMenuLink href={servicesPage.link}>
                        {servicesPage.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              {/* Action Buttons and User Menu */}
              <div className="flex items-center space-x-2">
                {!user && (
                  <NavigationMenu className="flex items-center space-x-2">
                    {/* Contact Us CTA */}
                    <NavigationMenuLink
                      href={contactPage.link}
                      className={cn(
                        "rounded-full border border-primary-foreground text-primary-foreground px-4 py-2 hover:bg-primary hover:border-ring hover:text-primary-foreground transition-all duration-300",
                        themeClass
                      )}
                    >
                      {contactPage.title}
                    </NavigationMenuLink>

                    {/* Donation CTA */}
                    <NavigationMenuLink
                      href={donationPage.link}
                      className="rounded-full bg-primary text-primary-foreground px-4 py-2 hover:bg-primary/90 hover:text-primary-foreground hover:shadow-md transition-all duration-300 flex items-center justify-center"
                    >
                      {donationPage.title}
                      <Heart className="ml-2 w-4 h-4" />
                    </NavigationMenuLink>
                  </NavigationMenu>
                )}

                {/* Notifications Menu (for logged in users) */}
                {user && (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Bell className="h-5 w-5" />
                          {/* Show badge if there are notifications */}
                          {/* {user.notifications?.length > 0 && (
                            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                          )} */}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="p-4 w-64">
                            <h3 className="font-medium mb-2 text-sm">
                              Notifications
                            </h3>
                            {/* {user.notifications?.length > 0 ? (
                              <ul className="space-y-2"> */}
                            {/* Render notifications here */}
                            {/* <li className="text-sm text-muted-foreground">
                                  No new notifications yet.
                                </li>
                              </ul>
                            ) : (
                              <p className="text-sm text-muted-foreground">
                                No new notifications.
                              </p>
                            )} */}
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                )}

                {/* Profile/Login Menu */}
                <NavigationMenu>
                  <NavigationMenuList>
                    {!isAuthenticated ? (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href={LoginPage.link}
                          className={cn(
                            "rounded-full border border-primary-foreground text-primary-foreground px-4 py-2 hover:bg-primary hover:border-ring hover:text-primary-foreground transition-all duration-300",
                            themeClass
                          )}
                        >
                          {LoginPage.title}
                          <LogIn className="ml-2 h-4 w-4" />
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Avatar className="h-10 w-10 mr-2">
                            <AvatarImage
                              src={profile?.profile_photo_url as string}
                              alt={user?.first_name || "User"}
                            />
                            <AvatarFallback>
                              <CircleUser className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="w-auto">
                            {/* User info section */}
                            <div className="flex  items-center p-2 mb-2 border-b">
                              <Avatar className="h-10 w-10 mr-2">
                                <AvatarImage
                                  src={profile?.profile_photo_url as string}
                                  alt={user?.first_name || "User"}
                                />
                                <AvatarFallback>
                                  <CircleUser className="h-5 w-5" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="space-y-0.5">
                                <p className="text-sm font-medium mb-0">
                                  {user?.first_name}
                                </p>
                                <p className="text-xs  truncate max-w-[120px]">
                                  {user?.email}
                                </p>
                              </div>
                            </div>

                            {/* Menu items */}
                            <ul className="-space-y-10">
                              <ListItem
                                title={profilePage.title}
                                href={profilePage.link}
                                icon={<User className="h-4 w-4" />}
                              />
                              <ListItem
                                title="Logout"
                                href={LoginPage.link}
                                onClick={(e) => handleLogout(e, LoginPage.link)}
                                icon={<LogOut className="h-4 w-4" />}
                              />
                            </ul>
                          </div>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )}
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
