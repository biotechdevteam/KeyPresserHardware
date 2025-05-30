import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Applicant } from "@/types/applicant";
import useAuth from "@/lib/useAuth";
import { AxiosError } from "axios";
import { verifyPayment } from "@/lib/utils/fetchUtils";
import { Button } from "../ui/button";

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

export default function NotificationBanner() {
  const [visible, setVisible] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const { user, profile, getProfile } = useAuth();

  useEffect(() => {
    if (!profile) {
      getProfile();
    }
  }, [profile, getProfile]);

  const isApplicant = profile && (profile as Applicant).user_id;
  const transactionId = profile && (profile as Applicant).transactionId;
  const externalId = profile && (profile as Applicant).user_id;

  useEffect(() => {
    const checkPayment = async () => {
      if (transactionId && externalId) {
        try {
          const result = await verifyPayment(externalId, transactionId);
          const status = result?.details?.status;

          setPaymentStatus(status);

          switch (status) {
            case "CREATED":
              setStatusMessage("🎉 Payment initiated. Awaiting confirmation.");
              break;
            case "PENDING":
              setStatusMessage(
                "⏳ Payment is still pending. Please wait or retry."
              );
              break;
            case "SUCCESSFUL":
              setStatusMessage("✅ Payment successful! You’re all set.");
              break;
            case "FAILED":
              setStatusMessage("❌ Payment failed. Please try again.");
              break;
            case "EXPIRED":
              setStatusMessage(
                "⌛ Payment session expired. Please initiate again."
              );
              break;
            default:
              setStatusMessage("⚠️ Unknown payment status.");
          }
        } catch (error: any) {
          if ((error as AxiosError)?.response?.status === 404) {
            setStatusMessage(
              "❗ Payment not found. Please check your transaction ID."
            );
          } else {
            const friendlyError = handleApiError(error);
            setStatusMessage(`⚠️ ${friendlyError}`);
          }
        }
      } else if (isApplicant) {
        setStatusMessage("ℹ️ You haven’t initiated a payment yet.");
      }
    };

    if (isApplicant) {
      checkPayment();
    }
  }, [transactionId, externalId, isApplicant]);

  if (!visible || !isApplicant || !statusMessage) return null;

  return (
    <div className="bg-yellow-100 text-yellow-800 px-4 py-3 text-sm border-b border-yellow-300 flex justify-between items-center">
      <div className="flex flex-col sm:items-center gap-1 sm:gap-3">
        <span className="font-semibold">
          🚧 Heads up! Some features may be under development.
        </span>
        <span>Payment Status: {statusMessage}</span>
      </div>
      {user?.user_type === "applicant" && (
        <div className="flex flex-col sm:items-center gap-1 sm:gap-3">
          <span>Applicant ID: {externalId}</span>
          <span>Transaction ID: {transactionId ? transactionId : "-"}</span>
        </div>
      )}
      <Button
        variant="outline"
        onClick={() => setVisible(false)}
        className="h-7 w-7 p-1"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </Button>
    </div>
  );
}
