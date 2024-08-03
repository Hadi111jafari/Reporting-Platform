"use client";

import React, { useEffect } from "react";
import SideNavComponent from "../../_components/SideNav";
import DocumentEditorSectionComponent from "../../_components/DocumentEditorSection";

type PageParams = {
  workspaceId: string;
  documentId: string;
};

const WorkspaceDocumentPage = ({ params }: { params: PageParams }) => {
  return (
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
  );
};

export default WorkspaceDocumentPage;
