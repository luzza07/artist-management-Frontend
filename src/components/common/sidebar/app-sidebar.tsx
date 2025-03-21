"use client";

import {
  Calendar,
  Library,
  Music,
  Settings,
  User,
  LayoutDashboard,
} from "lucide-react";
import * as React from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Define the type for a navigation item
type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Define the type for the NavMain component's props
type NavMainProps = {
  items: NavItem[];
};

// NavMain component
export function NavMain({ items }: NavMainProps) {
  return (
    <nav>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {/* Use Link for each navigation item */}
            <Link
              href={item.url}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded transition-colors"
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="transition-all duration-200 group-[.collapsed]:opacity-0 group-[.collapsed]:w-0 overflow-hidden">
                {item.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// Sample data.
const data = {
  teams: [
    {
      name: "MelodySphere",
      logo: Music,
      plan: "admin",
    },
  ],
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Artists", url: "/artists", icon: User },
    { title: "Music", url: "/music", icon: Music },
    { title: "Albums", url: "/albums", icon: Library },
    { title: "Events", url: "/events", icon: Calendar },
    { title: "Settings", url: "/settings", icon: Settings },
  ],
};

// AppSidebar component
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" variant="floating" {...props} className="group">
      <SidebarHeader>
        <Link href={"/dashboard"} className="flex items-center gap-2 p-2">
          {/* Ensure the Music icon is always visible */}
          <Music className="h-6 w-6 flex-shrink-0" />
          {/* Hide the text when collapsed */}
          <span className="text-xl font-bold transition-all duration-200 group-[.collapsed]:opacity-0 group-[.collapsed]:w-0 overflow-hidden">
            MelodySphere
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="ml-3 mt-10">
        {/* Pass the navMain data to NavMain */}
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}