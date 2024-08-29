import NavMenu from "./nav-menu"
import { Bebas_Neue } from 'next/font/google';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import LocaleSwitcher from "@/components/ui/locale";

const bebasNeue = Bebas_Neue({
  weight: "400",
  style: "normal",
  subsets: ['latin']
});

export default function NavBar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className={`text-3xl ${bebasNeue.className}`}>Glider</div>
        <NavMenu />
        <div className="hidden ml-auto items-center space-x-4 md:flex">
          <LocaleSwitcher />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  )
}