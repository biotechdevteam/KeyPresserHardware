"use client";
import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { Event } from "@/types/eventsSchema";
import { Button } from "@/components/ui/button";

// CalendarProps
interface CalendarProps {
  events: Event[];
}

// Set up the date localizer
const locales = {
  "en-US": enUS,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const CalendarPage: React.FC<CalendarProps> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
  };

  return (
    <div className="p-8 mx-auto max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">Events Calendar</h1>
        <p className="text-lg mt-4">View and stay updated on our events and activities.</p>
      </header>

      <BigCalendar
        localizer={localizer}
        events={events.map((event) => ({
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime),
        }))}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={(event) => handleEventSelect(event as Event)} // Work needs to be done here!!!
      />

      {selectedEvent && (
        <div className="mt-8 p-4 border rounded-lg shadow-lg bg-card text-center">
          <h3 className="text-2xl font-semibold">{selectedEvent.title}</h3>
          <p className="mt-2">
            {format(new Date(selectedEvent.startTime), "PPP p")} -{" "}
            {format(new Date(selectedEvent.endTime), "p")}
          </p>
          <Button className="mt-4" onClick={() => setSelectedEvent(null)}>
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
