import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import { FileClockIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import DocumentOptionsComponent from "./DocumentOptions";
import { db } from "@/config/firebase";
import { toast } from "sonner";

const DocumentListComponent = ({
  documentList,
  params,
}: {
  documentList: DocumentData[];
  params: { workspaceId: string; documentId: string };
}) => {
  const router = useRouter();

  const onDeleteDocument = async (docId: string) => {
    console.info("Delete document", docId);
    try {
      await deleteDoc(doc(db, "WorkspaceDocuments", docId));
      toast.success("Document deleted successfully");
    } catch (error) {
      toast.error("Failed to delete document");
    }
  };

  return (
    <div>
      {documentList.map((doc, index) => {
        return (
          <div
            onClick={() =>
              router.push(`/workspace/${params.workspaceId}/${doc.id}`)
            }
            key={index}
            className={`mt-3 p-2 px-2 hover:bg-gray-200 rounded-lg cursor-pointer flex justify-between items-center ${
              doc.id === params.documentId ? "bg-white" : ""
            }`}
          >
            <div className="flex gap-2 items-center">
              {!doc.emoji && <FileClockIcon className="text-primary" />}
              <h2 className="flex gap-2">
                {doc?.emoji}
                {doc.documentName}
              </h2>
            </div>
            <DocumentOptionsComponent
              doc={doc}
              onDeleteDocument={(docId) => onDeleteDocument(docId)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default DocumentListComponent;
