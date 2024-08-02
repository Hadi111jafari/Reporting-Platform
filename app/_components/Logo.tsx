import Image from "next/image";
import React from "react";

const LogoComponent = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src={"/logo.png"}
        width={30}
        height={30}
        alt=""
      />
      <h2 className="font-bold text-xl">Loop</h2>
    </div>
  );
};

export default LogoComponent;
