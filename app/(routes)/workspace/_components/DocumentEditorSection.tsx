import React, { useState } from "react";
import DocumentHeaderComponent from "./DocumentHeader";
import DocumentInfoComponent from "./DocumentInfo";
import DocumentRichEditorComponent from "./DocumentRichEditor";
import { Button } from "@/components/ui/button";
import { MessageCircle, X } from "lucide-react";
import CommentsBoxComponent from "./CommentsBox";

const DocumentEditorSectionComponent = ({
  params,
}: {
  params: { workspaceId: string; documentId: string };
}) => {
  const [openComment, setOpenComment] = useState(false);
  return (
    <div>
      {/* Header */}

      <DocumentHeaderComponent />

      <DocumentInfoComponent params={params} />

      {/* Rich Text Editor */}
      <DocumentRichEditorComponent documentId={params.documentId} />

      <div className="fixed right-5 bottom-5 z-50">
        <Button onClick={() => setOpenComment(!openComment)}>
          {openComment ? <X /> : <MessageCircle />}
        </Button>
        {openComment && <CommentsBoxComponent />}
      </div>
    </div>
  );
};

export default DocumentEditorSectionComponent;
