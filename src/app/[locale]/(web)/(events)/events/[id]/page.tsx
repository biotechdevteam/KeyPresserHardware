"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Event } from "@/types/eventsSchema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Share2,
  ChevronLeft,
  Star,
  MessageSquare,
  User,
  CalendarPlus,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

// Placeholder data - replace with actual API call
const mockEvent: Event = {
  _id: "event123",
  title: "Annual Community Festival",
  summary: "A vibrant gathering celebrating community culture and talent.",
  description:
    "Join us for a day of fun, food, and community bonding. This annual event brings together local artists, vendors, musicians, and residents for a celebration of our community's diversity and talents. Activities include live performances, workshops, a farmer's market, children's games, and more!",
  startTime: "2025-03-15T10:00:00.000Z",
  endTime: "2025-03-15T18:00:00.000Z",
  location: "Community Park, 123 Main Street",
  eventType: "physical",
  eventImageUrl: "https://example.com/event-image.jpg",
  registrationDeadline: "2025-03-10T23:59:59.000Z",
  createdAt: "2025-01-15T10:00:00.000Z",
  updatedAt: "2025-02-15T10:00:00.000Z",
  isRegistrationOpen: true,
  speakers: [
    {
      _id: "speaker1",
      eventId: "event123",
      memberId: {
        _id: "member123",
        email: "speaker@example.com",
        first_name: "John",
        last_name: "Doe",
        user_type: "member",
        user_id: {
          _id: "user123",
          email: "speaker@example.com",
          first_name: "John",
          last_name: "Doe",
          user_type: "member",
          profile_photo_url: "https://example.com/speaker.jpg",
          created_at: new Date("2024-12-01T12:00:00.000Z"),
          updated_at: new Date("2025-01-01T12:00:00.000Z"),
        },
      },
      speakerRole: "Keynote Speaker",
      createdAt: new Date("2025-01-01T10:00:00.000Z"),
    },
  ],
  attendees: Array(24)
    .fill(null)
    .map((_, i) => ({
      _id: `attendee${i + 1}`,
      eventId: "event123",
      userId: {
        _id: `user${i + 1}`,
        email: `attendee${i + 1}@example.com`,
        first_name: `Attendee`,
        last_name: `${i + 1}`,
        user_type: "member",
        profile_photo_url: `https://example.com/avatar${i + 1}.jpg`,
        created_at: new Date("2025-01-01T10:00:00.000Z"),
        updated_at: new Date("2025-02-01T10:00:00.000Z"),
      },
      attendeeStatus: "confirmed",
      createdAt: new Date("2025-01-05T12:00:00.000Z"),
    })),
};

// Comments type
interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  createdAt: string;
}

// Mock comments
const mockComments: Comment[] = [
  {
    _id: "comment1",
    user: {
      _id: "user1",
      name: "Jane Smith",
      avatar: "/placeholder/140/140",
    },
    content:
      "Looking forward to this event! Will there be vegetarian food options available?",
    createdAt: "2025-03-01T14:25:00.000Z",
  },
  {
    _id: "comment2",
    user: {
      _id: "user2",
      name: "Michael Johnson",
      avatar: "/placeholder/142/142",
    },
    content:
      "Attended last year and it was amazing. Highly recommend for families with kids!",
    createdAt: "2025-03-02T09:15:00.000Z",
  },
  {
    _id: "comment3",
    user: {
      _id: "user3",
      name: "Lisa Chen",
      avatar: "/placeholder/144/144",
    },
    content: "What time does the live music start?",
    createdAt: "2025-03-05T11:30:00.000Z",
  },
];

const EventDetailsPage = () => {
  const router = useRouter();
  const params = useParams();
  const eventId = params?.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAttending, setIsAttending] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  // Simulate data fetching
  useEffect(() => {
    // Replace with actual API call
    const fetchEventDetails = async () => {
      try {
        // In real app: const response = await fetch(`/api/events/${eventId}`);
        // const data = await response.json();
        setIsLoading(false);
        setEvent(mockEvent);
        setComments(mockComments);

        // Check if user is already attending
        // In real app: const isUserAttending = mockEvent.attendees.some(attendee => attendee._id === currentUserId);
        setIsAttending(false);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const handleAttendEvent = () => {
    if (isAttending) {
      setShowConfirmDialog(true);
    } else {
      // In real app: API call to register attendance
      setIsAttending(true);
      // Update attendee count
    }
  };

  const handleCancelAttendance = () => {
    // In real app: API call to cancel attendance
    setIsAttending(false);
    setShowConfirmDialog(false);
    // Update attendee count
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // In real app: API call to add comment
    const newCommentObj: Comment = {
      _id: `comment${Date.now()}`,
      user: {
        _id: "currentUser",
        name: "Current User",
        avatar: "/placeholder/150/150",
      },
      content: newComment,
      createdAt: new Date().toISOString(),
    };

    setComments([...comments, newCommentObj]);
    setNewComment("");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: event?.title || "Event Details",
          text: event?.description || "Check out this event!",
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification (not implemented here)
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6">
        <div className="flex items-center mb-6">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-24 ml-2" />
        </div>

        <Skeleton className="h-10 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full rounded-lg mb-6" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />

            <div className="space-y-4">
              <Skeleton className="h-6 w-1/3" />
              <div className="flex space-x-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>
          </div>

          <div>
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Event Not Found</h1>
        <p className="text-muted-foreground mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/events">Browse Events</Link>
        </Button>
      </div>
    );
  }

  // Calculate if event is upcoming, ongoing, or past
  const now = new Date();
  const startDate = new Date(event.startTime);
  const endDate = new Date(event.endTime);
  const eventStatus =
    now < startDate ? "upcoming" : now > endDate ? "past" : "ongoing";

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Calendar
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 mb-2">
          {/* <Badge variant="secondary">{event.category}</Badge> */}
          category
          {eventStatus === "upcoming" && (
            <Badge className="bg-blue-500">Upcoming</Badge>
          )}
          {eventStatus === "ongoing" && (
            <Badge className="bg-green-500">Happening Now</Badge>
          )}
          {eventStatus === "past" && (
            <Badge variant="outline">Past Event</Badge>
          )}
          {/* {event.isVirtual && (
            <Badge variant="outline" className="border-indigo-500 text-indigo-500">Virtual</Badge>
          )} */}
          is virtual
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          {event.title}
        </h1>
      </div>

      {event.eventImageUrl && (
        <div className="relative w-full h-64 sm:h-80 mb-8 rounded-xl overflow-hidden">
          <Image
            src={event.eventImageUrl}
            alt={event.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attendees">
                Attendees ({event.attendees?.length || 0})
              </TabsTrigger>
              <TabsTrigger value="comments">
                Comments ({comments.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">About this event</h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {event.description}
                </p>
              </div>
              {/* {event.tags && event.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              )} */}
              tags
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">
                  Organized by
                </h3>
                <div className="flex items-center">
                  {/* <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={event.organizer?.avatar} alt={event.organizer?.name} />
                    <AvatarFallback>{event.organizer?.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{event.organizer?.name}</p>
                    {event.organizer?.email && (
                      <p className="text-xs text-muted-foreground">{event.organizer.email}</p>
                    )}
                  </div> */}
                  organizer
                </div>
              </div>
            </TabsContent>

            <TabsContent value="attendees" className="space-y-4">
              {/* <p className="text-sm text-muted-foreground">
                {event.maxAttendees ? `${event.attendees?.length || 0} / ${event.maxAttendees} attendees` : `${event.attendees?.length || 0} people attending`}
              </p> */}
              max attendees
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
                {event.attendees?.map((attendee) => (
                  <div
                    key={attendee._id}
                    className="flex items-center p-2 rounded-lg hover:bg-accent/50"
                  >
                    {/* <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={attendee.avatar} alt={attendee.name} />
                      <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate">{attendee.name}</p>
                    </div> */}
                    attendee
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="comments" className="space-y-6">
              <form onSubmit={handleAddComment} className="mb-6">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src="/placeholder/150/150"
                      alt="Current User"
                    />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <textarea
                      className="w-full rounded-lg border-muted bg-background p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                      rows={3}
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                    />
                    <div className="mt-2 flex justify-end">
                      <Button
                        type="submit"
                        disabled={!newComment.trim()}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Post
                      </Button>
                    </div>
                  </div>
                </div>
              </form>

              {comments.length > 0 ? (
                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="bg-accent/30 rounded-lg p-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={comment.user.avatar}
                            alt={comment.user.name}
                          />
                          <AvatarFallback>
                            {comment.user.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">
                          {comment.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(comment.createdAt), "MMM d, yyyy")}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                  <p className="text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <div className="bg-accent/30 rounded-xl p-4 space-y-4">
            <h3 className="font-medium">Event Details</h3>

            <div className="flex items-start gap-3">
              <CalendarIcon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium">
                  {format(new Date(event.startTime), "EEEE, MMMM d, yyyy")}
                </p>
                {/* {!event.isAllDay && (
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(event.startTime), 'h:mm a')} - {format(new Date(event.endTime), 'h:mm a')}
                  </p>
                )} */}
                is all day
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">
                  {formatDuration(
                    new Date(event.startTime),
                    new Date(event.endTime)
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">{event.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="text-sm">
                  {/* {event.maxAttendees 
                    ? `${event.attendees?.length || 0} / ${event.maxAttendees} attendees`
                    : `${event.attendees?.length || 0} people attending`
                  } */}
                  max attendees
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={handleAttendEvent}
              className={
                isAttending
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : eventStatus === "past"
                  ? "bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted"
                  : "bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
              }
              disabled={eventStatus === "past"}
            >
              {isAttending ? (
                <>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Cancel Attendance
                </>
              ) : (
                <>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  {eventStatus === "past"
                    ? "Event has ended"
                    : "Attend this event"}
                </>
              )}
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="w-full"
                  >
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Event
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share this event with friends</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel your attendance?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel your attendance to this event?
              Your spot may be given to someone else.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, keep my spot</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelAttendance}
              className="bg-red-500 hover:bg-red-600"
            >
              Yes, cancel my attendance
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Helper function to format duration
const formatDuration = (start: Date, end: Date): string => {
  const durationMs = end.getTime() - start.getTime();
  const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor(
    (durationMs % (1000 * 60 * 60)) / (1000 * 60)
  );

  if (durationHours === 0) {
    return `${durationMinutes} minute${durationMinutes !== 1 ? "s" : ""}`;
  } else if (durationMinutes === 0) {
    return `${durationHours} hour${durationHours !== 1 ? "s" : ""}`;
  } else {
    return `${durationHours} hour${
      durationHours !== 1 ? "s" : ""
    } ${durationMinutes} minute${durationMinutes !== 1 ? "s" : ""}`;
  }
};

export default EventDetailsPage;
