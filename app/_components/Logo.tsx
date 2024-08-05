import Image from "next/image";
import Link from "next/link";
import React from "react";

const LogoComponent = () => {
  return (
    <Link className="flex items-center gap-2" href={'/dashboard'}>
      <Image
        src={"/logo.png"}
        width={30}
        height={30}
        alt=""
      />
      <h2 className="font-bold text-xl">Loop</h2>
    </Link>
  );
};

export default LogoComponent;
