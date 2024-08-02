"use client";
import LogoComponent from "@/app/_components/Logo";
import { OrganizationSwitcher, useAuth, UserButton } from "@clerk/nextjs";
import React from "react";

const HeaderComponent = () => {
  const { orgId } = useAuth();
  console.info({
    orgId,
  });
  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      <LogoComponent />
      <OrganizationSwitcher
        afterCreateOrganizationUrl={"/dashboard"}
        afterLeaveOrganizationUrl="/dashboard"
      />
      <UserButton />
    </div>
  );
};

export default HeaderComponent;
