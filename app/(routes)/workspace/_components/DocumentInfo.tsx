import CoverPickerComponent from "@/app/_components/CoverPicker";
import Image from "next/image";
import React, { useState } from "react";

const DocumentInfoComponent = () => {
  const [cover, setCover] = useState("/cover.jpg");

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

      {/* File Name */}
    </div>
  );
};

export default DocumentInfoComponent;
