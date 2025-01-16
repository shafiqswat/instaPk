/** @format */

"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropdownMenuCustom = ({ children, open, onOpenChange, className }) => {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu
      open={open}
      onOpenChange={onOpenChange}>
      <DropdownMenuTrigger asChild>
        {/* Add a trigger element */}
        <div className='hidden'></div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={className}>
        <DropdownMenuRadioGroup
          value={position}
          onValueChange={setPosition}>
          {children}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuCustom;
