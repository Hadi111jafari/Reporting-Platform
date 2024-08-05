"use client"

import React from "react";

import { useThreads } from "@liveblocks/react/suspense";
import { Composer, Thread } from "@liveblocks/react-ui";

const CommentsBoxComponent = () => {
  const { threads } = useThreads();
  return (
    <div className="w-[300px] h-[200px] shadow-lg rounded-lg overflow-y-auto">
      {threads.map((thread) => (
        <Thread
          key={thread.id}
          thread={thread}
        />
      ))}
      <Composer />
    </div>
  );
};

export default CommentsBoxComponent;
