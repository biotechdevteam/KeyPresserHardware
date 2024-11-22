"use client";
import Image from "next/image";
import Link from "next/link";
import { BookOpen, Award, Star, StarHalf, ArrowRight } from "lucide-react";
import useAuth from "@/lib/useAuth";

const HeroDashboard = () => {
  const { user } = useAuth();
  const isMember = user?.user_type === "member";
  const isApplicant = user?.user_type === "applicant";

  return (
    <section>
      <div className="container-fluid-2">
        <div
          className={`${
            isMember
              ? "bg-primary text-primary-foreground"
              : isApplicant
              ? "bg-muted text-muted-foreground"
              : "bg-accent text-accent-foreground"
          } p-5 md:p-10 rounded-lg flex justify-center md:justify-between items-center flex-wrap gap-2`}
        >
          {/* Profile Section */}
          <div className="flex items-center flex-wrap justify-center sm:justify-start">
            <div className="mr-2 lg:mr-5">
              <Image
                src={user?.profile_photo_url || ""}
                alt="Profile"
                width={100}
                height={100}
                className="w-27 h-27 md:w-22 md:h-22 lg:w-27 lg:h-27 rounded-full p-1 border-2 border-border box-content"
              />
            </div>
            {isMember || isApplicant ? (
              <div className="font-bold text-center sm:text-start">
                <h5 className="text-xl leading-1.2 mb-1">Hello</h5>
                <h2 className="text-2xl leading-1.24">{user?.first_name}</h2>
              </div>
            ) : (
              <div className="font-bold text-center sm:text-start">
                <h5 className="text-2xl leading-1.24 mb-1">
                  {user?.first_name}
                </h5>
                <ul className="flex items-center gap-3">
                  <li className="text-sm font-normal flex items-center gap-1">
                    <BookOpen className="mr-1" size={18} />3 Projects Completed
                  </li>
                  <li className="text-sm font-normal flex items-center gap-1">
                    <Award size={18} /> 5 Certificates
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Star Rating Section for Members */}
          {isMember && (
            <div className="text-center">
              <div className="text-primary-foreground flex items-center justify-center gap-1">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} size={16} />
                ))}
                <StarHalf size={16} />
              </div>
              <p className="text-primary-foreground">4.0 (120 Reviews)</p>
            </div>
          )}

          {/* Action Button */}
          <div>
            <Link
              legacyBehavior
              href={
                isMember
                  ? `/members/create-request`
                  : `/applicants/view-application`
              }
              className={`text-sm border px-6 py-2 rounded group text-nowrap flex gap-1 items-center ${
                isMember
                  ? "bg-primary text-primary-foreground border-primary hover:bg-primary-foreground hover:text-primary"
                  : isApplicant
                  ? "bg-muted text-muted-foreground border-muted hover:bg-muted-foreground hover:text-muted"
                  : "bg-accent text-accent-foreground border-accent hover:bg-accent-foreground hover:text-accent"
              }`}
            >
              {isMember
                ? "Create a New Request"
                : isApplicant
                ? "View Application"
                : "Contact NGO"}
              <ArrowRight className="ml-1" size={24} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroDashboard;
