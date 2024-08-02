"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid } from "lucide-react";
import React from "react";

const WorkspaceListComponent = () => {
  const { user } = useUser();
  return (
    <div className="my-10 p-10 md:px-24 lg:px-36 xl:px-52">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Hello, {user?.fullName} </h2>
        <Button>+</Button>
      </div>

      <div className="mt-10 flex justify-between">
        <div>
          <h2 className="font-medium text-primary">Workspaces</h2>
        </div>
        <div className="flex gap-2">
          <LayoutGrid />
          <AlignLeft />
        </div>
      </div>
    </div>
  );
};

export default WorkspaceListComponent;
