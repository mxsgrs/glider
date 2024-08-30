"use client"

import * as React from "react"
import { Menu } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default function NavMenu() {
  const links = [
    { href: "/payments", label: "Payments" },
    { href: "/profile", label: "Profile" },
  ];

  return (
    <div className="ml-auto md:ml-0">
      <div className="hidden md:block px-4">
        <NavMenuContent useSheetClose={false} links={links} />
      </div>
      <div className="md:hidden px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader className="text-left space-y-0">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through the app.</SheetDescription>
            </SheetHeader>
            <NavMenuContent useSheetClose={true} links={links} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

interface NavMenuContentProps {
  links: { href: string; label: string }[];
  useSheetClose?: boolean;
}

export function NavMenuContent({ links, useSheetClose = true }: NavMenuContentProps) {
  const LinkWrapper = useSheetClose ? SheetClose : React.Fragment;

  return (
    <NavigationMenu className="mt-4 md:mt-0">
      <NavigationMenuList className="block space-x-0 space-y-4 md:flex md:space-x-1 md:space-y-0">
        {links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <LinkWrapper className="focus:outline-none active:outline-none">
              <NavigationMenuLink href={link.href} className="text-2xl sm:text-base sm:px-2 font-semibold">
                {link.label}
              </NavigationMenuLink>
            </LinkWrapper>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}