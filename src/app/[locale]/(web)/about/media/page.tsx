import AboutMediaPage from "@/components/about/about-media/AboutMedia";
import Error from "@/app/[locale]/error";

const sampleVideos = [
  {
    url: "../../../../../../videos/Biologist.mp4",
    description: "Our first conference video.",
  },
  {
    url: "../../../../../../videos/Flowered-DNA.mp4",
    description: "Highlights from our annual biotech workshop.",
  },
];

const sampleImages = [
  {
    src: "/images/event1.jpg",
    alt: "Biotech Workshop",
    description: "Attendees at the Biotech Workshop.",
  },
  {
    src: "/images/event2.jpg",
    alt: "Conference Panel",
    description: "Panelists discussing biotech innovations.",
  },
];

const samplePressMentions = [
  {
    title: "Biotech Association Hosts Annual Conference",
    url: "https://www.newssite.com/article/biotech-conference",
    source: "NewsSite",
  },
  {
    title: "Innovative Biotech Solutions by Biotech Universe",
    url: "https://www.techmag.com/biotech-solutions",
    source: "TechMag",
  },
];

export default async function MediaPage() {
  try {
    const aboutData = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/about`,
      {
        cache: "force-cache",
      }
    ).then((res) => res.json());

    return (
      <div className="col-span-1 lg:col-span-2 my-8">
        {/* <AboutVideos videos={aboutData.videos || []} /> */}
        <AboutMediaPage
          videos={sampleVideos}
          images={sampleImages}
          pressMentions={samplePressMentions}
        />
      </div>
    );
  } catch (error: any) {
    return (
      <Error
        error={error.message || "Failed to load data. Please try again."}
      />
    );
  }
}
