import { create } from "zustand";
import { persist, PersistStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { User } from "@/types/userSchema";
import { Member } from "@/types/memberSchema";
import {
  applyRequest,
  signInRequest,
  signUpRequest,
  fetchData,
  forgotPasswordRequest,
  resetPasswordRequest,
} from "../lib/utils/fetchUtils";
import { useRouter } from "next/navigation";
import { Applicant } from "@/types/applicant";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  profile: Member | Applicant | null;
  members: Member[];
  applicants: Applicant[];
  loading: boolean;
  error: string | null;
}

interface AuthActions {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    userType: string
  ) => Promise<boolean>;
  getProfile: () => Promise<void>;
  apply: (
    specializationArea: string,
    motivationLetter: string,
    profilePhotoUrl: string,
    resumeUrl?: string,
    referredByMemberId?: string
  ) => Promise<boolean>;
  signOut: () => void;
  createProfile: (
    bio: string,
    skills: string[],
    interests: string[],
    specialization: string,
    address: string,
    socialLinks: string[],
    resumeUrl: string
  ) => Promise<boolean>;
  updateProfile: (
    memberId: string,
    bio: string,
    skills: string[],
    interests: string[],
    specialization: string,
    address: string,
    socialLinks: string[],
    resumeUrl: string
  ) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, newPassword: string) => Promise<boolean>;
  getAllApplicants: () => Promise<void>;
  getAllMembers: () => Promise<void>;
  approveApplication: (applicantId: string) => Promise<boolean>;
  rejectApplication: (applicantId: string) => Promise<boolean>;
}

type AuthStore = AuthState & AuthActions;

// Custom localStorage wrapper
const zustandLocalStorage: PersistStorage<AuthStore> = {
  getItem: (name) => {
    const storedValue = localStorage.getItem(name);
    return storedValue ? JSON.parse(storedValue) : null;
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
};

const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      profile: null,
      loading: false,
      error: null,
      members: [],
      applicants: [],

      // Forgot Password Function
      forgotPassword: async (email) => {
        set({ loading: true, error: null });
        try {
          const message = await forgotPasswordRequest(email);
          console.log("Forgot Password Response:", message);
          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // Reset Password Function
      resetPassword: async (token, newPassword) => {
        set({ loading: true, error: null });
        try {
          const { message, user } = await resetPasswordRequest(
            token,
            newPassword
          );
          console.log("Reset Password Response:", message);

          // Update the store with the new user data if needed
          set({ isAuthenticated: true, user });
          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signIn: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const data = await signInRequest(email, password);
          const { access_token, user } = data;

          Cookies.set("token", access_token, { expires: 7 });
          set({ isAuthenticated: true, user, profile: null });

          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signUp: async (email, password, firstName, lastName, userType) => {
        set({ loading: true, error: null });
        try {
          const data = await signUpRequest(
            email,
            password,
            firstName,
            lastName,
            userType
          );
          const { access_token, user } = data;

          Cookies.set("token", access_token, { expires: 7 });
          set({ isAuthenticated: true, user, profile: null });

          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      getProfile: async () => {
        set({ loading: true, error: null });
        try {
          const user = get().user;
          if (!user || !user._id) throw new Error("User is not authenticated.");

          const response = await fetchData(
            `/auth/${user.user_type}/${user._id}`,
            "GET"
          );
          const profileData = response.data;
          const profile =
            user.user_type === "member"
              ? (profileData as Member)
              : (profileData as Applicant);

          set({ profile });
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
        }
      },

      apply: async (
        profilePhotoUrl,
        motivationLetter,
        specializationArea,
        resumeUrl,
        referredByMemberId
      ) => {
        set({ loading: true, error: null });
        try {
          const user = get().user;
          if (!user || !user._id) throw new Error("User is not authenticated.");

          await applyRequest(
            user._id,
            profilePhotoUrl,
            motivationLetter,
            specializationArea,
            resumeUrl,
            referredByMemberId
          );
          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signOut: () => {
        Cookies.remove("token");
        set({ isAuthenticated: false, user: null, profile: null });
        const router = useRouter();
        router.push("/auth/signin");
      },

      // Method to create a new profile
      createProfile: async (
        bio,
        skills,
        interests,
        specialization,
        address,
        socialLinks,
        resumeUrl
      ) => {
        set({ loading: true, error: null });
        try {
          const user = get().user;
          if (!user || !user._id) throw new Error("User is not authenticated.");

          await fetchData("/auth/register-member", "POST", {
            user_id: user._id,
            bio,
            skills,
            interests,
            specialization,
            address,
            social_links: socialLinks,
            resume_url: resumeUrl,
          });
          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // Method to update an existing profile
      updateProfile: async (
        memberId,
        bio,
        skills,
        specialization,
        address,
        socialLinks,
        resumeUrl
      ) => {
        set({ loading: true, error: null });
        try {
          await fetchData("/auth/update-profile", "PUT", {
            member_id: memberId,
            bio,
            skills,
            specialization,
            address,
            social_links: socialLinks,
            resume_url: resumeUrl,
          });
          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // Fetch all applicants
      getAllApplicants: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetchData("/auth/applicants", "GET");
          const applicants: Applicant[] = response.data;
          set({ applicants });
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
        }
      },

      // Fetch all members
      getAllMembers: async () => {
        set({ loading: true, error: null });
        try {
          const response = await fetchData("/auth/members", "GET");
          const members: Member[] = response.data;
          set({ members });
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
        } finally {
          set({ loading: false });
        }
      },

      // Approve an application
      approveApplication: async (applicantId) => {
        set({ loading: true, error: null });
        try {
          await fetchData(`/auth/accept-application/${applicantId}`, "PUT");
          // Optionally update the applicant's status locally
          const updatedApplicants = get().applicants.map((applicant) =>
            applicant._id === applicantId
              ? { ...applicant, application_status: "approved" as "approved" }
              : applicant
          );
          set({ applicants: updatedApplicants });
          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },

      // Reject an application
      rejectApplication: async (applicantId) => {
        set({ loading: true, error: null });
        try {
          await fetchData(`/auth/reject-application/${applicantId}`, "PUT");
          // Optionally update the applicant's status locally
          const updatedApplicants = get().applicants.map((applicant) =>
            applicant._id === applicantId
              ? { ...applicant, application_status: "rejected" as "rejected" }
              : applicant
          );
          set({ applicants: updatedApplicants });
          return true;
        } catch (err: any) {
          const errorMessage = handleApiError(err);
          set({ error: errorMessage });
          return false;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: zustandLocalStorage,
    }
  )
);

function handleApiError(errorResponse: any): string {
  if (errorResponse.response && errorResponse.response.data) {
    const errorData = errorResponse.response.data;
    if (errorData.messages && errorData.messages.length > 0) {
      return errorData.messages.join(", ");
    }
    return errorData.error || "An error occurred. Please try again.";
  }
  return "An unexpected error occurred. Please try again.";
}

export default useAuth;
