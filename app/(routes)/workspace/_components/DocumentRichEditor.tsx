import React, { useCallback, useEffect, useRef } from "react";
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
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const DocumentRichEditorComponent = ({
  documentId,
}: {
  documentId: string;
}) => {
  const editorRef = useRef<EditorJS | null>(null);

  const saveDocument = useCallback(async () => {
    if (editorRef.current) {
      const data = await editorRef.current.save();
      const docRef = doc(db, "DocumentOutputs", documentId);
      await updateDoc(docRef, {
        output: data,
      });
    }
  }, [documentId]);

  const initializeEditor = useCallback(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        onChange: () => {
          saveDocument();
        },
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
  }, [saveDocument]);

  useEffect(() => {
    initializeEditor();
  }, [initializeEditor]);

  return (
    <div className="">
      <div id="editorjs"></div>
    </div>
  );
};

export default DocumentRichEditorComponent;
