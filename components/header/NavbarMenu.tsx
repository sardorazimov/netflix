"use client"

import { menuItems } from "@/icon"
import { MenuItemProps } from "@/types/route"
import { Search } from "lucide-react"
import Image from "next/image"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useGlobalContext } from "@/context/Context"
import { Button } from "../ui/button"
import { signOut } from "next-auth/react"
import { useState } from "react"
import SearchBar from "./Search"


const NavbarMenu = () => {
  const {account,setAccount} = useGlobalContext();
  const [ showSearchBar, setShowSearchBar ] = useState(false);
  const logOut = () => {
    sessionStorage.removeItem("account");
    signOut();
    setAccount(null);
  }
  return (
    <div className="relative ">
      <header className="header h-[10vh] hover:bg-[#141414]">
        <div className="flex items-center h-full space-x-2  md:space-x-10">
          <Image src={"https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"}
            alt="Netflix"
            width={120} height={120}
            className="object-contain cursor-pointer" />
          <ul className="hidden md:space-x-4 md:flex cursor-pointer">
            {menuItems.map((item: MenuItemProps) => (
              <li key={item.path} className="cursor-pointer text-[16px] font-light
                 text-[#e5e5e6] transition duration-[.4s] hover:text-[#b3b3b3]">
                {item.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="font-light flex items-center space-x-4 text-sm">
          {showSearchBar ? (
             <SearchBar setShowSearchBar={setShowSearchBar} />
          ) : (
             <Search  onClick={() => setShowSearchBar(prev => prev)}
             className="hidden sm:inline sm:w-6 sm:h-6 cursor-pointer" />
          )}
         
          <Popover>
            <PopoverTrigger>
              <div className="flex gap-2 items-center cursor-pointer">
                <img
                  src="/smile.png"
                  alt="Current Profile"
                  className="max-w-[30px] rounded min-w-[20px] max-h-[30px] min-h-[20px] object-cover w-[30px] h-[30px]"
                />
                <p>{account && account.name}</p>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <Button onClick={logOut}
                className=" bg-white text-slate-800 font-bold hover:text-white mt-4 text-center w-full text-sm  hover:bg-slate-800 rounded py-2 border border-white">
                Sign out Netflix
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </header>
    </div>
  )
}

export default NavbarMenu
