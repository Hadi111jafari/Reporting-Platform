"use client";

import React, { useEffect } from "react";
import SideNavComponent from "../../_components/SideNav";
import DocumentEditorSectionComponent from "../../_components/DocumentEditorSection";
import { Room } from "@/app/Room";

type PageParams = {
  workspaceId: string;
  documentId: string;
};

const WorkspaceDocumentPage = ({ params }: { params: PageParams }) => {
  return (
    <Room params={params}>
      <div>
        {/* Side Nav */}
        <div className="">
          <SideNavComponent params={params} />
        </div>

        {/* Document */}
        <div className="md:ml-72">
          <DocumentEditorSectionComponent params={params} />
        </div>
      </div>
    </Room>
  );
};

export default WorkspaceDocumentPage;
