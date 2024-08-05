import React, { useCallback, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Delimiter from "@editorjs/delimiter";
import Alert from "editorjs-alert";
import Quote from "@editorjs/quote";
import List from "@editorjs/list";
import NestedList from "@editorjs/nested-list";
import Checklist from "@editorjs/checklist";
import ImageTool from "@editorjs/simple-image";
import LinkTool from "@editorjs/link";
import TableTool from "@editorjs/table";
import CodeTool from "@editorjs/code";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUser } from "@clerk/nextjs";
import GenerateTemplateFromAIComponent from "./GenerateTemplateFromAI";

const DocumentRichEditorComponent = ({
  documentId,
}: {
  documentId: string;
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const [documentOutput, setDocumentOutput] = useState([]);

  const { user } = useUser();

  const saveDocument = useCallback(async () => {
    if (editorRef.current) {
      const data = await editorRef.current.save();
      if (!data || !data.blocks.length) return;
      const docRef = doc(db, "DocumentOutputs", documentId);
      try {
        await updateDoc(docRef, {
          output: JSON.stringify(data?.blocks ?? []),
          editedBy: user?.primaryEmailAddress?.emailAddress || "",
        });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    }
  }, [documentId, user?.primaryEmailAddress?.emailAddress]);

  const getDocumentOuput = useCallback(() => {
    try {
      const snapshot = onSnapshot(
        doc(db, "DocumentOutputs", documentId),
        (doc) => {
          const data = doc.data();
          if (data) {
            setDocumentOutput(data.output);
            if (editorRef.current) {
              editorRef.current.render({ blocks: JSON.parse(data.output ?? []) });
            }
          }
        }
      );
    } catch (error) {
      console.error("Error getting document: ", error);
    }
  }, [documentId]);

  const initializeEditor = useCallback(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        onChange: () => {
          saveDocument();
        },
        onReady: () => getDocumentOuput(),
        autofocus: true,
        holder: "editorjs",
        tools: {
          header: Header,
          delimiter: Delimiter,
          alert: Alert,
          quote: Quote,
          list: List,
          nestedList: NestedList,
          checkList: Checklist,
          image: ImageTool,
          link: LinkTool,
          table: TableTool,
          code: CodeTool,
        },
      });
    }
  }, [saveDocument, getDocumentOuput]);

  useEffect(() => {
    initializeEditor();
  }, [initializeEditor]);

  return (
    <div className="">
      <div id="editorjs"></div>
      <div className="fixed bottom-6 md:ml-80 left-0 z-10">
        <GenerateTemplateFromAIComponent setGeneratedTemplate={template => {
          console.log("Generated template: ", template)
          // @ts-ignore
          editorRef?.current?.render({ blocks: template.blocks })
        }} />
      </div>
    </div>
  );
};

export default DocumentRichEditorComponent;
