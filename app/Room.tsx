"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

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
    >
      <RoomProvider id={`${params.workspaceId}_${params.documentId}`}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
