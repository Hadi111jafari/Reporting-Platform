import CoverPickerComponent from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { db } from "@/config/firebase";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { SmilePlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const DocumentInfoComponent = ({
  params,
}: {
  params: { workspaceId: string; documentId: string };
}) => {
  const [cover, setCover] = useState("/cover.jpg");
  const [emoji, setEmoji] = useState("");
  const [documentInfo, setDocumentInfo] = useState<DocumentData>({});

  const getDocumentInfo = useCallback(async () => {
    // Fetch document info
    const docRef = doc(db, "WorkspaceDocuments", params.documentId);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      const data = snapshot.data();
      setDocumentInfo(data);
      setEmoji(data?.emoji);
      setCover(data?.coverImage ?? "/cover.jpg");
    }
  }, [params]);

  const updateDocumentInfo = async (key: string, value: any) => {
    try {
      const docRef = doc(db, "WorkspaceDocuments", params.documentId);
      await updateDoc(docRef, {
        [key]: value,
      });
      toast.success("Document info updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update document info");
    }
  };

  useEffect(() => {
    getDocumentInfo();
  }, [getDocumentInfo]);

  return (
    <div>
      {/* Cover */}

      <CoverPickerComponent
        onHandleSelectedCover={(coverURL) => {
          setCover(coverURL);
          updateDocumentInfo("coverImage", coverURL);
        }}
      >
        <div className="relative group cursor-pointer">
          <h2 className="hidden group-hover:flex absolute p-4 w-full h-full items-center justify-center">
            Change Cover
          </h2>
          <div className="group-hover:opacity-70">
            <Image
              src={cover}
              alt="cover"
              width={400}
              height={400}
              className="w-full h-[200px] object-cover rounded-t-xl"
            />
          </div>
        </div>
      </CoverPickerComponent>

      {/* Emoji Picker */}

      <div className="absolute ml-10 mt-[-35px] cursor-pointer">
        <EmojiPickerComponent setEmojiIcon={(v) => {
          setEmoji(v)
          updateDocumentInfo("emoji", v)
        }}>
          <div className="bg-[#ffffffb0] p-4 rounded-md">
            {emoji ? (
              <span className="text-5xl">{emoji}</span>
            ) : (
              <SmilePlusIcon className="w-10 h-10 text-gray-500" />
            )}
          </div>
        </EmojiPickerComponent>
      </div>

      {/* File Name */}
      <div className="mt-10 p-10">
        <input
          type="text"
          placeholder="Untitled Document"
          defaultValue={documentInfo?.documentName}
          className="font-bold text-4xl outline-none"
          onBlur={(e) => updateDocumentInfo("documentName", e.target.value)}
        />
      </div>
    </div>
  );
};

export default DocumentInfoComponent;
