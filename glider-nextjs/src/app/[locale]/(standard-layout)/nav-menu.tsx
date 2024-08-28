"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from 'lucide-react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function NavMenu() {
  return (
    <div className="ml-auto md:ml-0">
      <div className="hidden md:block px-4">
        <NavMenuContent />
      </div>
      <div className="md:hidden px-4">
        <Sheet>
          <SheetTrigger><Menu /></SheetTrigger>
          <SheetContent>
            <SheetHeader className="text-left space-y-0">
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navigate through the app.</SheetDescription>
            </SheetHeader>
            <NavMenuContent />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export function NavMenuContent() {
  return (
    <NavigationMenu className="mt-4 md:mt-0">
      <NavigationMenuList className="block space-x-0 space-y-4 md:flex md:space-x-1 md:space-y-0">
        <NavigationMenuItem>
          <Link href="/data" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <div className="text-2xl md:text-sm">
                Data
              </div>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/profile" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <div className="text-2xl md:text-sm">
                Profile
              </div>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}