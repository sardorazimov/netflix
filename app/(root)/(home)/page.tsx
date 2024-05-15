"use client"
import { redirect } from "next/navigation"


const HomePage = () => {
 redirect("./browse")
  return (
   
    <div>
      Hello Netflix Clone
    </div>
  )
}

export default HomePage
