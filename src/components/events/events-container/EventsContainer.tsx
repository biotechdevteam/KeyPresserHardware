"use client";
import React, { useState, useMemo } from "react";
import SearchContainer from "@/components/events/search-event/SearchContainer";
import { Feedback } from "@/types/feedbackSchema";
import { Event } from "@/types/eventsSchema";
import RegisterDialog from "@/components/register-dialog/RegisterDialog";
import EnrollEventForm from "../events-enroll/EnrollForm";
import EventCard from "../events-card/EventsCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarRange, Filter, Search, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface EventsContainerProps {
  eventsData: Event[];
  feedbacksData: Feedback[];
  pastEvents?: boolean;
  upcomingEvents?: boolean;
}

const EventsContainer: React.FC<EventsContainerProps> = ({
  eventsData,
  feedbacksData,
  pastEvents = false,
  upcomingEvents = false,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [expandedEvents, setExpandedEvents] = useState<Record<string, boolean>>(
    {}
  );
  const [isRegisterDialogOpen, setIsRegisterDialogOpen] = useState(false);
  const [isEnrollFormOpen, setIsEnrollFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const toggleEventDetails = (id: string) => {
    setExpandedEvents((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenRegisterDialog = (event: Event) => {
    setSelectedEvent(event);
    setIsRegisterDialogOpen(true);
  };

  const handleRegisterComplete = () => {
    setIsRegisterDialogOpen(false);
    setIsEnrollFormOpen(true);
  };

  // Get today's date
  const today = new Date();

  // Use useMemo to compute filtered events to avoid unnecessary recalculations
  const { allEvents, pastEventsList, upcomingEventsList } = useMemo(() => {
    // First apply search filter
    const searchFiltered = eventsData.filter((event: Event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Then separate into past and upcoming
    return {
      allEvents: searchFiltered,
      pastEventsList: searchFiltered.filter((event: Event) => {
        const endDate = event.endTime;
        return endDate ? new Date(endDate) < today : false;
      }),
      upcomingEventsList: searchFiltered.filter((event: Event) => {
        const endDate = event.endTime;
        return endDate ? new Date(endDate) >= today : false;
      }),
    };
  }, [eventsData, searchTerm, today]);

  // Determine which event list to show based on props and active tab
  const displayEvents = useMemo(() => {
    if (pastEvents) return pastEventsList;
    if (upcomingEvents) return upcomingEventsList;

    // If viewing tabs
    switch (activeTab) {
      case "past":
        return pastEventsList;
      case "upcoming":
        return upcomingEventsList;
      default:
        return allEvents;
    }
  }, [
    activeTab,
    allEvents,
    pastEventsList,
    upcomingEventsList,
    pastEvents,
    upcomingEvents,
  ]);

  // Count events for badges
  const upcomingCount = upcomingEventsList.length;
  const pastCount = pastEventsList.length;
  const totalCount = allEvents.length;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      {/* Register Dialog for event enrollment */}
      <RegisterDialog
        open={isRegisterDialogOpen}
        onComplete={handleRegisterComplete}
        onCancel={() => setIsRegisterDialogOpen(false)}
      />

      {/* Enrollment Form Modal */}
      {isEnrollFormOpen && selectedEvent && (
        <EnrollEventForm
          eventId={selectedEvent?._id}
          eventTitle={selectedEvent?.title}
          onComplete={() => setIsEnrollFormOpen(false)}
          onCancel={() => setIsEnrollFormOpen(false)}
        />
      )}

      <div className="rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CalendarRange className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">Events</h2>
            <Badge variant="outline" className="ml-2">
              {totalCount} Total
            </Badge>
          </div>

          {/* Search component */}
          <div className="flex-grow md:max-w-xs">
            <SearchContainer
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              filteredData={allEvents}
            />
          </div>
        </div>

        {/* Tabs - only show if not specifically filtered by props */}
        {!pastEvents && !upcomingEvents && (
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="mt-6"
          >
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                All{" "}
                <Badge variant="secondary" className="ml-1">
                  {totalCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Upcoming{" "}
                <Badge variant="secondary" className="ml-1">
                  {upcomingCount}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Past{" "}
                <Badge variant="secondary" className="ml-1">
                  {pastCount}
                </Badge>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <AnimatePresence>
                <EventList
                  events={allEvents}
                  expandedEvents={expandedEvents}
                  toggleEventDetails={toggleEventDetails}
                  handleEnrollClick={handleOpenRegisterDialog}
                  containerVariants={containerVariants}
                  itemVariants={itemVariants}
                />
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="upcoming" className="mt-0">
              <AnimatePresence>
                <EventList
                  events={upcomingEventsList}
                  expandedEvents={expandedEvents}
                  toggleEventDetails={toggleEventDetails}
                  handleEnrollClick={handleOpenRegisterDialog}
                  containerVariants={containerVariants}
                  itemVariants={itemVariants}
                />
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="past" className="mt-0">
              <AnimatePresence>
                <EventList
                  events={pastEventsList}
                  expandedEvents={expandedEvents}
                  toggleEventDetails={toggleEventDetails}
                  handleEnrollClick={handleOpenRegisterDialog}
                  containerVariants={containerVariants}
                  itemVariants={itemVariants}
                />
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        )}

        {/* If specifically filtered by props, show just that list without tabs */}
        {(pastEvents || upcomingEvents) && (
          <AnimatePresence>
            <EventList
              events={displayEvents}
              expandedEvents={expandedEvents}
              toggleEventDetails={toggleEventDetails}
              handleEnrollClick={handleOpenRegisterDialog}
              containerVariants={containerVariants}
              itemVariants={itemVariants}
            />
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

// Extracted component for event lists to avoid repetition
interface EventListProps {
  events: Event[];
  expandedEvents: Record<string, boolean>;
  toggleEventDetails: (id: string) => void;
  handleEnrollClick: (event: Event) => void;
  containerVariants: any;
  itemVariants: any;
}

const EventList: React.FC<EventListProps> = ({
  events,
  expandedEvents,
  toggleEventDetails,
  handleEnrollClick,
  containerVariants,
  itemVariants,
}) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium text-foreground">No events found</h3>
        <p className="text-muted-foreground mt-2">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[600px] pr-4">
      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {events.map((event) => (
          <motion.div key={event._id} variants={itemVariants}>
            <EventCard
              event={event}
              expanded={expandedEvents[event._id]}
              toggleEventDetails={toggleEventDetails}
              handleEnrollClick={() => handleEnrollClick(event)}
            />
          </motion.div>
        ))}
      </motion.div>
    </ScrollArea>
  );
};

export default EventsContainer;
