import React from "react";
import DocumentHeaderComponent from "./DocumentHeader";
import DocumentInfoComponent from "./DocumentInfo";

const DocumentEditorSectionComponent = ({
  params,
}: {
  params: { workspaceId: string; documentId: string };
}) => {
  return (
    <div>
      {/* Header */}

      <DocumentHeaderComponent />

      <DocumentInfoComponent params={params}/>

      {/* Rich Text Editor */}
    </div>
  );
};

export default DocumentEditorSectionComponent;
