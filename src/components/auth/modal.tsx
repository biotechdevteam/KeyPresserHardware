"use client";

import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SignUpForm from "./lform";
import SignInForm from "./rform";
import ForgotPassword from "./lpassword";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "../../../public/images/logo.png";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal: FC<AuthModalProps> = ({ open, onClose }) => {
  const [activeForm, setActiveForm] = useState<
    "signin" | "signup" | "forgotpassword"
  >("signin");

  const renderForm = () => {
    switch (activeForm) {
      case "signup":
        return (
          <>
            <div className="flex flex-col items-center">
              <Image
                src={Logo}
                alt={"logo"}
                width={50}
                height={50}
                className="rounded"
              />
              <h1 className="text-2xl font-semibold mt-4">Sign Up</h1>
            </div>
            <SignInForm onClose={onClose} />
          </>
        );
      case "signin":
        return (
          <>
            <div className="flex flex-col items-center">
              <Image
                src={Logo}
                alt={"logo"}
                width={50}
                height={50}
                className="rounded"
              />
              <h1 className="text-2xl font-semibold mt-4">Sign In</h1>
            </div>
            <SignUpForm onClose={onClose} />
          </>
        );
      case "forgotpassword":
        return <ForgotPassword onClose={onClose} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{renderForm()}</div>
        {activeForm === "signin" && (
          <div className="mt-4 flex justify-between">
            <div
              className="cursor-pointer"
              onClick={() => setActiveForm("forgotpassword")}
            >
              <a>Forgot Password?</a>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setActiveForm("signup")}
            >
              <a>Members Only? Sign Up</a>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => useRouter().push("/apply")}
            >
              <a>Not a member? Apply</a>
            </div>
          </div>
        )}
        {activeForm !== "signin" && (
          <div
            className="cursor-pointer"
            onClick={() => setActiveForm("signin")}
          >
            <a>Back to Sign In</a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
