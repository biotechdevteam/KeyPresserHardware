"use client";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
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
import Error from "@/app/[locale]/error";
import { GetStaticProps, InferGetStaticPropsType } from "next";

export const getStaticProps: GetStaticProps = async () => {
  try {
    // Fetch events data
    const eventsData = await fetchEvents();

    // Return data as props with ISR enabled
    return {
      props: {
        eventsData,
        isError: false,
      },
      revalidate: 60, // Revalidate data every 60 seconds
    };
  } catch (error) {
    return {
      props: {
        eventsData: [],
        isError: true,
        error: error,
      },
      revalidate: 60,
    };
  }
};

const localizer = momentLocalizer(moment);

const ActivitiesCalendarPage = ({
  eventsData,
  isError,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // Handle loading state (Client-side simulation)
  const isLoading = eventsData.length === 0 && !isError;
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
    setIsDialogOpen(true);
  };
  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedEvent(null);
  };

  // Map events to a format suitable for react-big-calendar
  const mappedEvents = eventsData?.map((event: Event) => ({
    title: event.title,
    start: new Date(event.startTime),
    end: new Date(event.endTime),
    allDay: true,
  }));

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Calendar of Activities
      </h1>
      <Calendar
        localizer={localizer}
        events={mappedEvents}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={(event) => handleEventClick(event)}
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
              <p>{selectedEvent.description}</p>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">Start:</Badge>
                <span>{format(new Date(selectedEvent.startTime), "PPpp")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">End:</Badge>
                <span>{format(new Date(selectedEvent.endTime), "PPpp")}</span>
              </div>
              <div className="text-center">
                <Link href={`/events/${selectedEvent._id}`}>
                  <Button>View Details</Button>
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
