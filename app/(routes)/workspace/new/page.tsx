"use client";
import CoverPickerComponent from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebase";
import { useAuth, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { LoaderCircle, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const CreateWorkspace = () => {
  const [cover, setCover] = useState("/cover.jpg");
  const [workspaceName, setWorkspaceName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useUser();
  const { orgId } = useAuth();

  const router = useRouter();

  const OnCreateWorkspace = async () => {
    setIsLoading(true);
    try {
      const docID = Math.random().toString(36).substring(2, 9);
      await setDoc(doc(db, "Workspaces", docID), {
        workspaceName,
        emoji,
        coverURL: cover,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        id: docID,
        orgId: orgId ? orgId : user?.primaryEmailAddress?.emailAddress,
      });

      setEmoji("");
      setWorkspaceName("");
      setCover("/cover.jpg");

      router.replace(`/workspace/${docID}`);

      console.info("Workspace created successfully");
    } catch (error) {
      console.error("Error creating workspace", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        {/* Cover Image */}
        <CoverPickerComponent
          onHandleSelectedCover={(cover) => setCover(cover)}
        >
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
        </CoverPickerComponent>

        {/* Input Section */}
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="text-sm mt-2">
            This is shared space where you can callaborate with your team. You
            can always rename it later.
          </h2>
          <div className="mt-8 flex gap-2 items-center">
            <EmojiPickerComponent
              setEmojiIcon={(selectedEmoji) => setEmoji(selectedEmoji)}
            >
              <Button variant={"outline"}>
                {emoji ? emoji : <SmilePlus />}
              </Button>
            </EmojiPickerComponent>
            <Input
              placeholder="Workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>

          <div className="mt-7 flex justify-end gap-2">
            <Button
              disabled={!workspaceName || isLoading}
              onClick={OnCreateWorkspace}
              className="flex gap-2"
            >
              <span>Create</span>
              {isLoading && <LoaderCircle className="animate-spin" />}
            </Button>
            <Button variant={"outline"}>Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
