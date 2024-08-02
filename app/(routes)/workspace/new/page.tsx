"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SmilePlus } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const CreateWorkspace = () => {
  const [cover, setCover] = useState("/cover.jpg");
  const [workspaceName, setWorkspaceName] = useState("");
  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        {/* Cover Image */}
        <div className="relative group cursor-pointer">
          <h2 className="hidden group-hover:flex absolute p-4 w-full h-full items-center justify-center">
            Change Cover
          </h2>
          <div className="group-hover:opacity-70">
            <Image
              src={cover}
              alt="cover"
              width={400}
              height={400}
              className="w-full h-[150px] object-cover rounded-t-xl"
            />
          </div>
        </div>

        {/* Input Section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="text-sm mt-2">
            This is shared space where you can callaborate with your team. You
            can always rename it later.
          </h2>
          <div className="mt-8 flex gap-2 items-center">
            <Button variant={"outline"}>
              <SmilePlus />
            </Button>
            <Input
              placeholder="Workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>

          <div className="mt-7 flex justify-end gap-2">
            <Button disabled={!workspaceName}>Create</Button>
            <Button variant={"outline"}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
