"use client";
import Image from "next/image";
import React, { useState } from "react";

const CreateWorkspace = () => {
  const [cover, setCover] = useState("/cover.jpg");
  return (
    <div className="p1- md:px-36 lg:px-52 xl:px-80 py-20">
      <div>
        {/* Cover Image */}
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
              className="w-full h-[150px] object-cover rounded-t-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;
