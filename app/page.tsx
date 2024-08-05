"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function Home() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.replace("/dashboard");
  }, [router]);
  return (
    <div className="flex justify-center items-center">
      <h2>Landing Page</h2>
    </div>
  );
}
