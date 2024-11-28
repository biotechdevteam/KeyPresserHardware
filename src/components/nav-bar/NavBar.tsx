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
} from "@/components/ui/navigation-menu";
import {
  Bell,
  CircleUser,
  Heart,
  LogIn,
  LogOut,
  Menu,
  User,
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
import { About } from "@/types/aboutSchema";
import { NavCollapsible, NavCollapsibleListItem } from "../ui/collapsible";
import { slideInOut } from "../../../pageTransitions";
import useAuth from "@/lib/useAuth";

// array of pages
type Pages = {
  title: string;
  link: string;
  description?: string;
  icon?: any;
};

const navMenu: Pages[][] = [
  // Home
  [{ title: "home", link: "/" }],

  // About
  [
    {
      title: "story",
      link: "/about/story",
      description:
        "Learn about the history and founding of the association, its origins, and the journey so far.",
    },
    {
      title: "mission & vision",
      link: "/about/mission-&-vision",
      description:
        "Understand the mission and vision that guide the association's long-term goals and core values.",
    },
    {
      title: "executive board",
      link: "/about/executive-board",
      description:
        "Meet the leadership team and executives who drive the association’s strategic direction.",
    },
    {
      title: "achievements",
      link: "/about/achievements",
      description:
        "Discover the milestones and successes the association has achieved over time.",
    },
    {
      title: "partners & sponsors",
      link: "/about/partners-&-sponsors",
      description:
        "Explore the various partners and sponsors that support the association's activities.",
    },
    {
      title: "media",
      link: "/about/media",
      description:
        "Access multimedia content, including videos, images, and press coverage related to the association.",
    },
    {
      title: "faqs",
      link: "/about/faqs",
      description:
        "Find answers to frequently asked questions about the association.",
    },
  ],

  // Membership
  [
    {
      title: "members",
      link: "/members",
      description:
        "A showcase of current members and their contributions to the association.",
    },
    {
      title: "membership qualifications",
      link: "/membership-qualifications",
      description:
        "Information on the criteria required to become a member of the association.",
    },
    {
      title: "membership benefits",
      link: "/membership-benefits",
      description:
        "Explore the benefits and privileges that come with being a member.",
    },
    {
      title: "membership tiers",
      link: "/membership-tiers",
      description:
        "Learn about the different membership tiers and the benefits associated with each level.",
    },
    {
      title: "members directory",
      link: "/members-directory",
      description:
        "A comprehensive directory of members and their contact information.", // *
    },
    {
      title: "membership faqs",
      link: "/membership-faqs",
      description:
        "Answers to common questions about membership processes and benefits.",
    },
  ],

  // Events
  [
    {
      title: "calender",
      link: "/calender",
      description:
        "Stay updated with a calendar of upcoming events, meetings, and important dates.",
    },
    {
      title: "upcoming events",
      link: "/upcoming-events",
      description:
        "Find details on upcoming association-hosted events, workshops, and conferences.",
    },
    {
      title: "exhibitions & sponsorship",
      link: "/exhibitions-&-sponsorship",
      description:
        "Information on exhibitions and sponsorship opportunities within the association.",
    },
    {
      title: "past events",
      link: "/past-events",
      description:
        "Explore details and summaries of past events and their outcomes.",
    },
  ],

  // Resources
  [
    {
      title: "news & insights",
      link: "/news-&-insights",
      description:
        "Stay informed with the latest news, industry insights, and updates from the association.",
    },
    {
      title: "brochure",
      link: "/brochure",
      description:
        "Download the official association brochure to get a detailed overview of its services and activities.",
    },
    {
      title: "whitepapers",
      link: "/whitepapers",
      description:
        "Read in-depth whitepapers on key topics and research areas in the industry.",
    },
    {
      title: "research studies",
      link: "/research-studies",
      description:
        "Explore published research studies and findings conducted by the association.", // *
    },
    {
      title: "industry reports",
      link: "/industry-reports",
      description:
        "Industry reports that provide critical data, trends, and forecasts relevant to the association's work.", // *
    },
    {
      title: "guidelines",
      link: "/guidelines",
      description:
        "Access best practices and guidelines to support professional and industry standards.", // *
    },
  ],

  // Projects
  [
    {
      title: "ongoing projects",
      link: "/ongoing-projects",
      description:
        "Learn about the association's ongoing projects and their current progress.",
    },
    {
      title: "upcoming projects",
      link: "/upcoming-projects",
      description:
        "Details on future projects the association plans to launch.",
    },
    {
      title: "portfolio",
      link: "/portfolio",
      description:
        "View the association’s completed projects and their impacts.",
    },
  ],

  // Contact
  [{ title: "contact us", link: "/contact" }],

  // Donate
  [{ title: "donate", link: "/donate" }],

  // Profile
  [
    { title: "profile", link: "/profile" }, // *
    { title: "dashboard", link: "/dashboard-admin" }, // *
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
  const { isAuthenticated, user, signOut } = useAuth(); // Use the useAuth hook
  const router = useTransitionRouter();

  const handleClick = (e: React.MouseEvent, url: string) => {
    e.preventDefault(); // Prevent default link behavior
    router.push(url, { onTransitionReady: slideInOut });
  };

  const [openIndex, setOpenIndex] = React.useState<number | null>(null); // State to track which collapsible is open
  const handleOpenChange = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle the current index or close it
  };

  let homePage = navMenu[0][0];
  let aboutPages = navMenu[1];
  let membershipPages = navMenu[2];
  let eventsPages = navMenu[3];
  let resourcesPages = navMenu[4];
  let projectsPages = navMenu[5];
  let contactPage = navMenu[6][0];
  let donationPage = navMenu[7][0];
  let profilePage = navMenu[8][0];
  let adminPage = navMenu[8][1];
  let LoginPage = navMenu[9][0];
  let servicesPage = navMenu[10][0];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 bg-card h-auto">
      <div className="flex justify-between items-center m-4">
        {/* Logo */}
        <div className="flex-shrink-0 text-center">
          <Link
            href={homePage.link}
            legacyBehavior
            onClick={(e) => handleClick(e, homePage.link)}
          >
            <Image
              src={logo}
              width={50}
              height={50}
              priority
              alt={aboutData?.name}
              className="rounded"
            />
          </Link>
        </div>

        <div>
          {isSmallDevice ? (
            <div className="flex justify-between gap-2">
              {/* Notifications Menu */}
              {user && (
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>
                        <Bell />
                        <Badge>17</Badge>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        {/* Logic enters here */}
                        <NavigationMenuLink
                          href="#"
                          asChild
                          onClick={(e) => handleClick(e, "#")}
                        >
                          <em className="text-foreground">
                            No new notifications.
                          </em>
                        </NavigationMenuLink>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger className="bg-transparent">
                  <Menu className="transition-transform transform hover:rotate-90 duration-500 h-10 w-10 text-foreground" />
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle className="flex justify-between items-end">
                      Menu
                      {/* Toggle Login or profile photo*/}
                      {!isAuthenticated ? (
                        <SheetClose asChild>
                          <Link
                            href={LoginPage.link}
                            legacyBehavior
                            className="uppercase border border-border px-3 py-2 rounded text-xs font-semibold text-primary-foreground flex gap-2"
                            onClick={(e) => handleClick(e, LoginPage.link)}
                          >
                            {LoginPage.title}
                            <LogIn className="w-4 h-4" />
                          </Link>
                        </SheetClose>
                      ) : (
                        <Avatar>
                          <AvatarImage src={user?.profile_photo_url} />
                          <AvatarFallback>
                            <CircleUser />
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </SheetTitle>
                    <Separator className="my-4 bg-primary-foreground" />
                  </SheetHeader>

                  <SheetBody>
                    <NavCollapsible
                      triggerText="About Us"
                      isOpen={openIndex === 0}
                      onOpenChange={() => handleOpenChange(0)}
                    >
                      <ul>
                        {aboutPages.map((page, index) => (
                          <SheetClose asChild key={page.title}>
                            <NavCollapsibleListItem
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.title}
                            </NavCollapsibleListItem>
                          </SheetClose>
                        ))}
                      </ul>
                    </NavCollapsible>

                    <NavCollapsible
                      triggerText="Membership"
                      isOpen={openIndex === 1}
                      onOpenChange={() => handleOpenChange(1)}
                    >
                      <ul>
                        {membershipPages.map((page, index) => (
                          <SheetClose asChild key={page.title}>
                            <NavCollapsibleListItem
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.title}
                            </NavCollapsibleListItem>
                          </SheetClose>
                        ))}
                      </ul>
                    </NavCollapsible>

                    <NavCollapsible
                      triggerText="Events"
                      isOpen={openIndex === 2}
                      onOpenChange={() => handleOpenChange(2)}
                    >
                      <ul>
                        {eventsPages.map((page, index) => (
                          <SheetClose asChild key={page.title}>
                            <NavCollapsibleListItem
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.title}
                            </NavCollapsibleListItem>
                          </SheetClose>
                        ))}
                      </ul>
                    </NavCollapsible>

                    <NavCollapsible
                      triggerText="Resources"
                      isOpen={openIndex === 3}
                      onOpenChange={() => handleOpenChange(3)}
                    >
                      <ul>
                        {resourcesPages.map((page, index) => (
                          <SheetClose asChild key={page.title}>
                            <NavCollapsibleListItem
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.title}
                            </NavCollapsibleListItem>
                          </SheetClose>
                        ))}
                      </ul>
                    </NavCollapsible>

                    <NavCollapsible
                      triggerText="Projects"
                      isOpen={openIndex === 4}
                      onOpenChange={() => handleOpenChange(4)}
                    >
                      <ul>
                        {projectsPages.map((page, index) => (
                          <SheetClose asChild key={page.title}>
                            <NavCollapsibleListItem
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.title}
                            </NavCollapsibleListItem>
                          </SheetClose>
                        ))}
                      </ul>
                    </NavCollapsible>

                    <NavCollapsible
                      triggerText="Projects"
                      isOpen={openIndex === 4}
                      onOpenChange={() => handleOpenChange(4)}
                    >
                      <SheetClose asChild key={servicesPage.title}>
                        <NavCollapsibleListItem
                          href={servicesPage.link}
                          onClick={(e) => handleClick(e, servicesPage.link)}
                        >
                          {servicesPage.title}
                        </NavCollapsibleListItem>
                      </SheetClose>
                    </NavCollapsible>

                    {/* Profile */}
                    {isAuthenticated && (
                      <div className="space-y-4 mt-4">
                        <SheetClose asChild>
                          <NavigationMenu>
                            <NavigationMenuList>
                              <NavigationMenuItem>
                                <NavigationMenuLink
                                  href={profilePage.link}
                                  onClick={(e) =>
                                    handleClick(e, profilePage.link)
                                  }
                                  className="capitalize font-semibold text-md flex gap-2"
                                >
                                  {profilePage.title}
                                  <User className="w-4 h-4" />
                                </NavigationMenuLink>
                              </NavigationMenuItem>
                            </NavigationMenuList>
                          </NavigationMenu>
                        </SheetClose>
                        <SheetClose asChild>
                          <Link
                            href="#"
                            onClick={signOut}
                            legacyBehavior
                            className="uppercase border border-border px-3 py-2 rounded text-xs font-semibold text-primary-foreground flex gap-2"
                          >
                            <span className="flex gap-2 justify-center items-center">
                              {t("logout")}
                              <LogOut className="w-4 h-4" />
                            </span>
                          </Link>
                        </SheetClose>
                      </div>
                    )}
                  </SheetBody>
                  <SheetFooter>
                    &copy; {new Date().getFullYear()} {aboutData?.name}
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="flex justify-center gap-4 xl:gap-16">
              {/* Desktop Menu */}
              <div className="flex justify-between">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul>
                          {aboutPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Membership</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul>
                          {membershipPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Events</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul>
                          {eventsPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul>
                          {resourcesPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul>
                          {projectsPages.map((page) => (
                            <ListItem
                              key={page.title}
                              title={page.title}
                              href={page.link}
                              onClick={(e) => handleClick(e, page.link)}
                            >
                              {page.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href={servicesPage.link}
                        onClick={(e) => handleClick(e, servicesPage.link)}
                        className="uppercase"
                      >
                        {servicesPage.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="flex justify-center gap-4">
                {/* Contact Us CTA */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href={contactPage.link}
                        onClick={(e) => handleClick(e, contactPage.link)}
                        className="uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      >
                        {contactPage.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Donation CTA */}
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuLink
                        href={donationPage.link}
                        onClick={(e) => handleClick(e, donationPage.link)}
                        className="uppercase border border-primary bg-primary hover:text-primary text-primary-foreground hover:bg-transparent"
                      >
                        {donationPage.title}
                        <Heart className="ml-2 w-4 h-4" />
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>

                {/* Notifications Menu */}
                {user && (
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Bell />
                          <Badge>17</Badge>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          {/* Logic enters here */}
                          <NavigationMenuLink
                            href="#"
                            asChild
                            onClick={(e) => handleClick(e, "#")}
                          >
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
                    {!isAuthenticated ? (
                      <NavigationMenuItem>
                        <NavigationMenuLink
                          href={LoginPage.link}
                          className="uppercase border border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                        >
                          {LoginPage.title}
                          <LogIn className="ml-2 h-4 w-4" />
                        </NavigationMenuLink>
                      </NavigationMenuItem>
                    ) : (
                      <NavigationMenuItem>
                        <NavigationMenuTrigger>
                          <Avatar>
                            <AvatarImage src={user?.profile_photo_url} />
                            <AvatarFallback>
                              <CircleUser />
                            </AvatarFallback>
                          </Avatar>
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul>
                            <ListItem
                              title={profilePage.title}
                              href={profilePage.link}
                              // <User className="mr-2 h-4 w-4" />
                            ></ListItem>
                            <ListItem
                              title={t("logout")}
                              href=""
                              onClick={signOut}
                              // <LogOut className="mr-2 h-4 w-4" />
                            ></ListItem>
                          </ul>
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
