import React from "react";
import DocumentHeaderComponent from "./DocumentHeader";
import DocumentInfoComponent from "./DocumentInfo";
import DocumentRichEditorComponent from "./DocumentRichEditor";

const DocumentEditorSectionComponent = ({
  params,
}: {
  params: { workspaceId: string; documentId: string };
}) => {
  return (
    <div>
      {/* Header */}

      <DocumentHeaderComponent />

      <DocumentInfoComponent params={params} />

      {/* Rich Text Editor */}
      <DocumentRichEditorComponent documentId={params.documentId} />
    </div>
  );
};

export default DocumentEditorSectionComponent;
