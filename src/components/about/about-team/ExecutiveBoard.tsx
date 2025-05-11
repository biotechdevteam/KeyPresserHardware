import Members from "@/components/about/about-team/AboutTeam";
import { Separator } from "@/components/ui/separator";
import { About } from "@/types/aboutSchema";
import { Member } from "@/types/memberSchema";

const ExecutiveBoard: React.FC<{ aboutData: About; members: Member[] }> = ({
  aboutData,
  members,
}) => {
  return (
    <div className="col-span-1 lg:col-span-2 m-8 text-center min-h-screen">
      <h2 className="text-3xl font-bold">Our Leadership Team</h2>
      <Separator className="w-24 mx-auto mt-4" />
      <p className="text-base py-8 px-4 max-w-3xl mx-auto">
        Our board members are seasoned professionals dedicated to driving
        innovation and excellence in biotechnology. With diverse expertise and a
        shared vision for the future, they lead{" "}
        {aboutData?.name || "our organization"} towards groundbreaking
        discoveries and impactful solutions.
      </p>

      <Members members={members} isExecutiveBoard={true} />
    </div>
  );
};

export default ExecutiveBoard;
