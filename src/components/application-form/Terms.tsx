import { Button } from "@/components/ui/button";
import CustomCheckbox from "@/components/ui/mycustomcheckbox";
import { About } from "@/types/aboutSchema";
import React, { useState } from "react";
import MembershipAgreement from "../Policies/MembershipAgreement";

interface TermsProps {
  aboutData: About;
  onAccept: () => void; // Handler for accepting the terms
  onCancel: () => void; // Handler for canceling the process
}

const Terms: React.FC<TermsProps> = ({ aboutData, onAccept, onCancel }) => {
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  return (
    <div className="max-h-screen flex flex-col border border-muted">
      {/* Scrollable Terms */}
      <div className="overflow-y-auto flex-1 p-4">
        <MembershipAgreement aboutData={aboutData} />
      </div>

      {/* Fixed footer */}
      <div className="p-6 flex flex-col space-y-4">
        <div className="mx-auto">
          <CustomCheckbox
            checked={agreedToTerms}
            onCheckedChange={setAgreedToTerms}
            label="I agree to all the terms and conditions"
          />
        </div>

        {/* Apply Now and Cancel buttons */}
        <div className="flex justify-between">
          <Button onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={onAccept} disabled={!agreedToTerms}>
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Terms;
