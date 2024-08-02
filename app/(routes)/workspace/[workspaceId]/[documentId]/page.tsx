"use client";

import React, { useEffect } from "react";
import SideNavComponent from "../../_components/SideNav";

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
      <div className="md:ml-72">Document</div>
    </div>
  );
};

export default WorkspaceDocumentPage;
