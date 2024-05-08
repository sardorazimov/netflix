"use client"

import Login from "@/components/ui/auth/Login";
import { useGlobalContext } from "@/context/Context"


const BrowsePage = () => {
  const {account} =  useGlobalContext();
  if( account === null)
    return <Login />
  return (
    <div>
      Bwrwse
    </div>
  )
}

export default BrowsePage
