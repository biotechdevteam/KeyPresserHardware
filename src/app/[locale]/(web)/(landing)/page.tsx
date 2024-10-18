"use client";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAboutData,
  fetchServices,
  fetchBlogs,
  fetchFAQs,
  fetchFeedbacks,
  fetchEvents,
  fetchProjectsData,
} from "@/lib/fetchUtils";
import LandingContainer from "@/components/landing/container/LandingContainer";
import Loader from "@/components/loader/Loader";
import { About } from "@/types/aboutSchema";
import { Project } from "@/types/projectSchema";
import { Service } from "@/types/ServiceSchema";
import { Blog } from "@/types/blogSchema";
import { FAQs } from "@/types/FAQSchema";
import { Feedback } from "@/types/feedbackSchema";
import { Event } from "@/types/eventsSchema";

// Landing Page component to fetch and display all data
const LandingPage: React.FC = () => {
  // Fetch about data
  const {
    data: aboutData,
    isLoading: aboutLoading,
    isFetching: aboutFetching,
    isError: aboutError,
  } = useQuery({
    queryKey: ["about"],
    queryFn: fetchAboutData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch services data
  const {
    data: servicesData,
    isLoading: servicesLoading,
    isFetching: servicesFetching,
    isError: servicesError,
  } = useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch blogs data
  const {
    data: blogsData,
    isLoading: blogsLoading,
    isFetching: blogsFetching,
    isError: blogsError,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch FAQs data
  const {
    data: faqsData,
    isLoading: faqsLoading,
    isFetching: faqsFetching,
    isError: faqsError,
  } = useQuery({
    queryKey: ["faqs"],
    queryFn: fetchFAQs,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch feedbacks data
  const {
    data: feedbacksData,
    isLoading: feedbacksLoading,
    isFetching: feedbacksFetching,
    isError: feedbacksError,
  } = useQuery({
    queryKey: ["feedbacks"],
    queryFn: fetchFeedbacks,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch events data
  const {
    data: eventsData,
    isLoading: eventsLoading,
    isFetching: eventsFetching,
    isError: eventsError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Fetch projects data
  const {
    data: projectsData,
    isLoading: projectsLoading,
    isFetching: projectsFetching,
    isError: projectsError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjectsData,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  // Handle loading states
  if (
    aboutLoading ||
    aboutFetching ||
    servicesLoading ||
    servicesFetching ||
    blogsLoading ||
    blogsFetching ||
    faqsLoading ||
    faqsFetching ||
    feedbacksLoading ||
    feedbacksFetching ||
    eventsLoading ||
    eventsFetching ||
    projectsLoading ||
    projectsFetching
  ) {
    return <Loader />;
  }

  // Handle error states
  if (
    aboutError ||
    servicesError ||
    blogsError ||
    faqsError ||
    feedbacksError ||
    eventsError ||
    projectsError
  ) {
    return <div>Error loading data...</div>;
  }

  // Render the LandingContainer with the prefetched data
  return (
    <div>
      <LandingContainer
        aboutData={aboutData as About}
        services={servicesData as Service[]}
        blogs={blogsData as Blog[]}
        faqs={faqsData as FAQs}
        feedbacks={feedbacksData as Feedback[]}
        events={eventsData as Event[]}
        projects={projectsData as Project[]}
      />
    </div>
  );
};

export default LandingPage;
