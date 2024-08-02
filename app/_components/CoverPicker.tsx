import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { coverOptions } from "../_shared/coverOptions";
import Image from "next/image";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

const CoverPickerComponent = ({ children, onHandleSelectedCover }: { children: React.ReactNode, onHandleSelectedCover: (coverURL: string) => void }) => {
  const [selectedCover, setSelectedCover] = useState("");

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>
          <DialogDescription>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
              {coverOptions.map((cover, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedCover(cover.imageURL)}
                  className={`p-[1px] border-[3px] rounded-lg ${
                    selectedCover === cover.imageURL
                      ? "border-primary "
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={cover.imageURL}
                    alt="cover"
                    width={200}
                    height={140}
                    className="h-[70px] object-cover rounded-md w-full cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              onClick={() => onHandleSelectedCover(selectedCover)}
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CoverPickerComponent;
