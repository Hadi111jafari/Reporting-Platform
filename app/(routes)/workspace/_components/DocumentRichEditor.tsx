import React, { useEffect, useRef } from "react";
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

const DocumentRichEditorComponent = () => {
  const editorRef = useRef<EditorJS | null>(null);

  const saveDocument = async () => {
    if (editorRef.current) {
      const data = await editorRef.current.save();
      console.log(data);
    }
  }

  const initializeEditor = () => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        onChange: (ap, event) => {
          console.log("EditorJS onChange", ap, event);
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
  };

  useEffect(() => {
    initializeEditor();
  }, []);

  return (
    <div className="">
      <div id="editorjs"></div>
    </div>
  );
};

export default DocumentRichEditorComponent;
