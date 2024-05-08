"use client"

import Context from "@/context/Context"
import { ChildProps } from "@/types/route"
import { useContext } from "react"

export const useGlobalContext = () => {
  const contex = useContext()
  if (contex === null) {
    throw new Error('useGlobalContext must be used within a GlobalContext')
  }
  return contex
}