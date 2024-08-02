"use client";

import LogoComponent from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import { collection, DocumentData, onSnapshot, query, where } from "firebase/firestore";
import { Bell } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";

const SideNavComponent = ({
  params,
}: {
  params: { workspaceId: string; documentId: string };
}) => {
  const [documentList, setDocumentList] = useState<DocumentData[]>([]);
  const getDocumentList = useCallback(() => {
    const q = query(
      collection(db, "WorkspaceDocuments"),
      where("workspaceID", "==", params.workspaceId)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      for (const doc of querySnapshot.docs) {
        setDocumentList((prev) => [...prev, doc.data()])
      }
    });
  }, [params.workspaceId]);

  useEffect(() => {
    getDocumentList();
  }, [getDocumentList]);

  return (
    <div className="h-screen md:w-72 md:block hidden fixed bg-blue-50 p-5 shadow-md">
      <div className="flex justify-between items-center">
        <LogoComponent />
        <Bell className="w-5 h-5 text-gray-500" />
      </div>
      <hr className="my-5" />
      <div>
        <div className="flex justify-between items-center">
          <h2 className="font-medium">Workspace Name</h2>
          <Button size={"sm"}>+</Button>
        </div>
      </div>
    </div>
  );
};

export default SideNavComponent;
