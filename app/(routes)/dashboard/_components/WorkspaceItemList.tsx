import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WorkspaceItemListComponent = ({
  workspaceList,
}: {
  workspaceList: DocumentData[];
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
      {workspaceList &&
        workspaceList.map((workspace) => {
          return (
            <Link
              key={workspace.id}
              href={`workspace/${workspace.id}`}
            >
              <div className="shadow-md border rounded-xl hover:scale-105 transition-transform cursor-pointer">
                <Image
                  src={workspace.coverURL}
                  alt="Cover"
                  width={400}
                  height={200}
                  className="h-[150px] object-cover rounded-t-xl"
                />
                <div className="p-4 rounded-b-xl">
                  <h2 className="flex gap-2">
                    {workspace.emoji} {workspace.workspaceName}
                  </h2>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
};

export default WorkspaceItemListComponent;
