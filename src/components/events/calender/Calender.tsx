"use client";

import { useState, useMemo } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { Event } from "@/types/eventsSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  X,
} from "lucide-react";

// Override default react-big-calendar styles
import "react-big-calendar/lib/css/react-big-calendar.css";
import { cn } from "@/lib/utils";

const localizer = momentLocalizer(moment);

// Custom event props for better typing
interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  resource?: any;
  originalEvent: Event;
}

// Component props with proper typing
interface ActivitiesCalendarPageProps {
  eventsData: Event[];
}

const ActivitiesCalendarPage: React.FC<ActivitiesCalendarPageProps> = ({
  eventsData,
}) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [view, setView] = useState<typeof Views.MONTH>(Views.MONTH);

  // Memoize the mapped events to prevent unnecessary recalculations
  const mappedEvents = useMemo(
    () =>
      eventsData?.map(
        (event: Event): CalendarEvent => ({
          id: event._id,
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          allDay: false, // Changed to false to show proper time slots
          originalEvent: event,
        })
      ),
    [eventsData]
  );

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event.originalEvent);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  // Custom event styling
  const eventStyleGetter = (event: CalendarEvent) => {
    // Create different colors based on some property of the event
    // For example, you could categorize by event type or location
    const startHour = new Date(event.start).getHours();

    let backgroundColor = "#3182ce"; // Default blue

    // Example: Color by time of day
    if (startHour < 12) {
      backgroundColor = "#2C7A7B"; // Morning - teal
    } else if (startHour < 17) {
      backgroundColor = "#6B46C1"; // Afternoon - purple
    } else {
      backgroundColor = "#DD6B20"; // Evening - orange
    }

    return {
      style: {
        backgroundColor,
        borderRadius: "4px",
        opacity: 0.9,
        color: "white",
        border: "0",
        display: "block",
        fontWeight: 500,
      },
    };
  };

  // Custom toolbar component
  const CustomToolbar = ({ label, onView, onNavigate, views }: any) => (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={() => onNavigate("TODAY")}>
          Today
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onNavigate("PREV")}>
          &lt;
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onNavigate("NEXT")}>
          &gt;
        </Button>
        <h2 className="text-lg font-semibold">{label}</h2>
      </div>

      <div className="flex space-x-1">
        {views.map((name: string) => (
          <Button
            key={name}
            variant={view === name ? "default" : "ghost"}
            size="sm"
            onClick={() => {
              setView(name as typeof Views.MONTH);
              onView(name as typeof Views.MONTH);
            }}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-center">
          Calendar of Activities
        </h1>
        <p className="text-muted-foreground text-center mt-2">
          Browse and discover upcoming events and activities
        </p>
      </header>

      <div className="bg-card rounded-xl shadow-sm border">
        <div className="p-4">
          <Calendar
            localizer={localizer}
            events={mappedEvents}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={(event: CalendarEvent) => handleEventClick(event)}
            style={{ height: "70vh" }}
            views={["month", "week", "day", "agenda"]}
            defaultView={Views.MONTH}
            view={view}
            onView={(newView) => setView(newView as typeof Views.MONTH)}
            popup
            eventPropGetter={eventStyleGetter}
            components={{
              toolbar: CustomToolbar,
              event: ({ event }) => (
                <div className="truncate px-1 py-0.5 text-sm">
                  {event.title}
                </div>
              ),
            }}
            dayPropGetter={(date) => {
              // Highlight today differently
              if (moment(date).isSame(moment(), "day")) {
                return {
                  className: "rbc-today",
                  style: {
                    backgroundColor: "rgba(59, 130, 246, 0.05)",
                  },
                };
              }
              return {};
            }}
          />
        </div>
      </div>

      {/* Dialog for event details */}
      {selectedEvent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">
                {selectedEvent.title}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Event details and information
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              {selectedEvent.description && (
                <div className="text-sm text-foreground/90">
                  {selectedEvent.description}
                </div>
              )}

              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(
                      new Date(selectedEvent.startTime),
                      "EEEE, MMMM d, yyyy"
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {format(new Date(selectedEvent.startTime), "h:mm a")} -{" "}
                    {format(new Date(selectedEvent.endTime), "h:mm a")}
                  </span>
                </div>

                {selectedEvent.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{selectedEvent.location}</span>
                  </div>
                )}

                {selectedEvent.attendees && (
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {selectedEvent.attendees.length} attendees
                    </span>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-0">
              <Button
                variant="outline"
                onClick={closeDialog}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
              <Link
                href={`/events/${selectedEvent._id}`}
                className="w-full sm:w-auto"
              >
                <Button className="w-full">View Complete Details</Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ActivitiesCalendarPage;
