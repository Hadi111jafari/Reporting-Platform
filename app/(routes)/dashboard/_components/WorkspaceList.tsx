"use client";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { AlignLeft, LayoutGrid } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import WorkspaceItemListComponent from "./WorkspaceItemList";

const WorkspaceListComponent = () => {
  const { user } = useUser();
  const { orgId } = useAuth();
  const [workspaceList, setWorkspaceList] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState(true);

  const getWorkspaceList = useCallback(async () => {
    try {
      const q = query(
        collection(db, "Workspaces"),
        where(
          "orgId",
          "==",
          orgId ? orgId : user?.primaryEmailAddress?.emailAddress
        )
      );
      const snapshot = await getDocs(q);
      const workspaces = snapshot.docs.map((doc) => doc.data());
      setWorkspaceList(workspaces);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
      setLoading(false);
    }
  }, [orgId, user?.primaryEmailAddress?.emailAddress]);

  useEffect(() => {
    if (user) {
      getWorkspaceList();
    }
  }, [getWorkspaceList, user]);

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

      {loading ? (
        <div>Loading...</div>
      ) : workspaceList.length ? (
        <div>
          <WorkspaceItemListComponent workspaceList={workspaceList} />
        </div>
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
