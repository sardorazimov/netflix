"use client"

import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Login from "@/components/auth/Login";
import MangeAccount from "@/components/auth/mange-account";
import { useGlobalContext } from "@/context/Context"
import { useSession } from "next-auth/react";
import { useEffect } from "react";


const BrowsePage = () => {
  const {account,pageLoader,setPageLoader} =  useGlobalContext();
  const {data:session} = useSession()
 
  useEffect(() => {
    setPageLoader(false)
  },[]) 
  
  if(session === null) return <Login />
  if(account === null) return <MangeAccount />
  if(pageLoader) return <Loader />
  return <Navbar />
}

export default BrowsePage
