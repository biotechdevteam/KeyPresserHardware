"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { fetchEvents } from "@/lib/utils/fetchUtils";
import Loader from "@/components/loader/Loader";
import { Event } from "@/types/eventsSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import Link from "next/link";

const localizer = momentLocalizer(moment);

const ActivitiesCalendarPage = () => {
  const {
    data: eventsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-center">Error loading calendar events...</div>;
  }

  // Map events to a format suitable for react-big-calendar
  const mappedEvents = eventsData?.map((event: Event) => ({
    title: event.title,
    start: new Date(event.startTime),
    end: new Date(event.endTime),
    allDay: true,
    rawEvent: event,
  }));

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Activity Calendar</h1>
      <Calendar
        localizer={localizer}
        events={mappedEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => handleEventClick(event.rawEvent)}
        style={{ height: "75vh" }}
        className="shadow-lg border rounded-lg"
        views={["month", "week", "day", "agenda"]}
        defaultView="month"
        popup
      />

      {/* Dialog for event details */}
      {selectedEvent && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedEvent.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-gray-700">{selectedEvent.description}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Start:</Badge>
                <span>{format(new Date(selectedEvent.startTime), "PPpp")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">End:</Badge>
                <span>{format(new Date(selectedEvent.endTime), "PPpp")}</span>
              </div>
              <div className="text-center">
                <Link href={`/event/${selectedEvent._id}`}>
                  <Button>View Event Details</Button>
                </Link>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ActivitiesCalendarPage;
