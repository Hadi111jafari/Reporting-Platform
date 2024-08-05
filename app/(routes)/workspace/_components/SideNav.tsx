"use client";

import LogoComponent from "@/app/_components/Logo";
import { Button } from "@/components/ui/button";
import { db } from "@/config/firebase";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Bell, Loader2Icon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import DocumentListComponent from "./DocumentList";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const SideNavComponent = ({
  params,
}: {
  params: { workspaceId: string; documentId?: string };
}) => {
  const [documentList, setDocumentList] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const MAX_FILE = 5;

  const getDocumentList = useCallback(() => {
    const q = query(
      collection(db, "WorkspaceDocuments"),
      where("workspaceID", "==", params.workspaceId)
    );


    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setDocumentList([]);
      for (const doc of querySnapshot.docs) {
        setDocumentList((prev) => [...prev, doc.data()]);
      }
    });
  }, [params.workspaceId]);

  const { user } = useUser();
  const router = useRouter();

  const addDocument = async () => {
    if (documentList.length >= MAX_FILE) {
      toast.error("Upgrade to add more files", {
        description: "You have reached the maximum limit of files. Upgrade your plan to add unlimited files",
        action: {
          label: "Upgrade",
          onClick: () => {
            console.info("Upgrade plan");
          },
        },
      });
      return;
    }

    setIsLoading(true);
    try {
      const docID = uuid4();
      await setDoc(doc(db, "WorkspaceDocuments", docID), {
        workspaceID: params.workspaceId,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        coverImage: null,
        emoji: null,
        id: docID,
        documentOutput: [],
        documentName: "Untitled Document",
      });

      await setDoc(doc(db, "DocumentOutputs", docID), {
        docID,
        output: [],
      });
      router.replace(`/workspace/${params.workspaceId}/${docID}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
          <Button
            size={"sm"}
            onClick={addDocument}
          >
            {isLoading ? (
              <Loader2Icon className="animate-spin w-4 h-4" />
            ) : (
              <>+</>
            )}
          </Button>
        </div>
      </div>

      {/* Document list */}
      <DocumentListComponent
        documentList={documentList}
        params={params}
      />

      {/* Progress Bar */}
      <div className="absolute bottom-10 w-[85%]">
        <Progress value={(documentList.length / MAX_FILE) * 100} />
        <h2 className="text-sm font-light my-2">
          <strong>{documentList.length}</strong> Out of <strong>5</strong> Files
          used
        </h2>
        <h2 className="text-sm font-light">
          Upgrade your plan to add more files
        </h2>
      </div>
    </div>
  );
};

export default SideNavComponent;
