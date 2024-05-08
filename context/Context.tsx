"use client";

import { ChildProps, ContextType } from "@/types/route"
import { createContext, useContext } from "react"

export const Contex = createContext<ContextType | null>(null)

export const useGlobalContext = ({}) => {
  const context = useContext(Context)
  if (context === null) {
    throw new Error('useGlobalContext must be used within a GlobalContext')
  }
  return context
}


const Context = ({
  children
}:ChildProps) => {
  return (
    <Contex.Provider value={null}>
      {children}
    </Contex.Provider>
  )
}

export default Context
