import CoverPickerComponent from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { SmilePlusIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const DocumentInfoComponent = () => {
  const [cover, setCover] = useState("/cover.jpg");
  const [emoji, setEmoji] = useState("");

  return (
    <div>
      {/* Cover */}

      <CoverPickerComponent
        onHandleSelectedCover={(coverURL) => setCover(coverURL)}
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
        <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
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
    </div>
  );
};

export default DocumentInfoComponent;
