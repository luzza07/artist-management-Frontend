"use client";

import React from "react";
//import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, HelpCircle, Bell, Mail } from "lucide-react"; // Import Lucide icons
//import { ThemeToggle } from "../theme-toggle";

const Navbar = () => {
  return (
    <div className="flex items-center justify-end gap-4 p-2 right-0">
      {/* Profile Dropdown */}
      
      <DropdownMenu>
   

        <DropdownMenuContent
          align="end"
          className="w-48 rounded-lg bg-white dark:bg-gray-900 backdrop-blur-md shadow-lg border border-white/20"
        >
          {/* Profile */}
          <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>

          {/* Help */}
          <DropdownMenuItem className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer">
            <HelpCircle className="mr-2 h-4 w-4" />
            <span>Help</span>
          </DropdownMenuItem>

          {/* Logout */}
          <DropdownMenuItem className="flex items-center p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-md cursor-pointer text-red-600 dark:text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;