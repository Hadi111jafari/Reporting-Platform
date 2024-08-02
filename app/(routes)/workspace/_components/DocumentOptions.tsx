import { Link2Icon, MoreVerticalIcon, PenBoxIcon, Trash2Icon } from "lucide-react";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DocumentOptionsComponent = () => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVerticalIcon className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="flex gap-2 items-center">
            <Link2Icon className="w-4 h-4" />
            Share Link
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center">
            <PenBoxIcon className="w-4 h-4" />
            Rename
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2 items-center text-red-500">
            <Trash2Icon className="w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DocumentOptionsComponent;
