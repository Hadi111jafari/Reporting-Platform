"use client";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { AlignLeft, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const WorkspaceListComponent = () => {
  const { user } = useUser();
  const [workspaceList, setWorkspaceList] = useState([]);

  return (
    <div className="my-10 p-10 md:px-24 lg:px-36 xl:px-52">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-xl">Hello, {user?.fullName} </h2>
        <Link href={"/workspace/new"}>
          <Button>+</Button>
        </Link>
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

      {workspaceList.length ? (
        <div>Workspace List</div>
      ) : (
        <div className="flex flex-col justify-center items-center my-10 gap-2">
          <Image
            src={"/workspace.png"}
            alt=""
            width={200}
            height={200}
          />
          <h2>Create new workspace</h2>
          <Link href={"/workspace/new"}>
            <Button className="">+ New Workspace</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WorkspaceListComponent;
