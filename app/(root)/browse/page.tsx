"use client"

import Login from "@/components/auth/Login";
import MangeAccount from "@/components/auth/mange-account";
import { useGlobalContext } from "@/context/Context"
import { useSession } from "next-auth/react";


const BrowsePage = () => {
  const {account} =  useGlobalContext();
  const {data:session} = useSession()

  
  if(session === null) return <Login />
  if(account === null) return <MangeAccount />
  return (
    <div>
      Bwrwse
    </div>
  )
}

export default BrowsePage
