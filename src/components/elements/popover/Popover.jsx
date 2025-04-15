/** @format */

import { Trash2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const PopoverCustom = ({ children, onDelete }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        className='w-40 p-0'
        align='end'>
        <div className='flex flex-col'>
          <button
            onClick={onDelete}
            className='flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-red-50'>
            <Trash2 className='w-4 h-4' />
            <span>Delete</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCustom;
