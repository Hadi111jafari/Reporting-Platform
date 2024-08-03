import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

const DocumentHeaderComponent = () => {
  return (
    <div className="flex justify-between items-center p-3 px-7 shadow-md">
      <div></div>
      <OrganizationSwitcher />
      <div className="flex gap-2 items-center">
        <Button>Share</Button>
        <UserButton />
      </div>
    </div>
  );
};

export default DocumentHeaderComponent;
