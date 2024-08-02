import LogoComponent from "@/app/_components/Logo";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import React from "react";

const HeaderComponent = () => {
  return (
    <div className="flex justify-between items-center p-3 shadow-sm">
      <LogoComponent />
      <OrganizationSwitcher />
      <UserButton />
    </div>
  );
};

export default HeaderComponent;
