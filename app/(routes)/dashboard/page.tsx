import { UserButton } from "@clerk/nextjs";
import React from "react";
import HeaderComponent from "./_components/Header";
import WorkspaceListComponent from "./_components/WorkspaceList";

const DashboardHomepage = () => {
  return (
    <div>
      <HeaderComponent />
      <WorkspaceListComponent />
    </div>
  );
};

export default DashboardHomepage;
