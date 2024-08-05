"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebase";

export function Room({
  children,
  params,
}: {
  children: ReactNode;
  params: { workspaceId: string; documentId: string };
}) {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const q = query(collection(db, "Users"), where("email", "in", userIds));
        const snapshot = await getDocs(q);
        const userList: DocumentData[] = [];
        snapshot.forEach((doc) => {
          userList.push(doc.data());
        });
        return userList as any;
      }}
    >
      <RoomProvider id={`${params.workspaceId}_${params.documentId}`}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
