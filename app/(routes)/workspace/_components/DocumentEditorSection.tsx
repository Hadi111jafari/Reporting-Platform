import React from "react";
import DocumentHeaderComponent from "./DocumentHeader";
import DocumentInfoComponent from "./DocumentInfo";

const DocumentEditorSectionComponent = () => {
  return (
    <div>
      {/* Header */}

      <DocumentHeaderComponent />

      <DocumentInfoComponent />

      {/* Rich Text Editor */}
    </div>
  );
};

export default DocumentEditorSectionComponent;
