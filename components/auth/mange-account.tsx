'use client'

import { Delete, LockKeyhole, Trash } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import LoginAccountForm from "./LoginAccountForm"
import CreateAccountForm from "./CreateAccountForm"

const MangeAccount = () => {
  const [ isDelete, setIsDelete ] = useState<boolean>(false);
  const [ open, setOpen] = useState(false);
  const [control,setControl] = useState< "Login" | "Create">("Create");
  return (
    <div className='min-h-screen flex justify-center flex-col items-center relative'>
      <div className='flex justify-center flex-col items-center'>
        <h1 className='text-white font-bold text-5xl my-12'>
          Whos Watching
        </h1>
        <ul className='flex p-0 my-12'>
          <li  onClick={() => { setOpen(true); setControl("Login")}}
            className='max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]'>
            <div className="relative">
             <div className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative">
               <Image  src={"/smile.png"} alt="account" fill/>
             </div>
             {isDelete ? (
              <div className="absolute transform bottom-0 z-10 cursor-pointer">
                <Trash  className="text-red-600 w-8 h-8"/>
              </div>
             ): null}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-xl">Azimov</span>
              <LockKeyhole className="h-8 w-8" />
            </div> 
          </li>
          <li onClick={() => { setOpen(true); setControl('Create')} }
           className="border  bg-slate-700 font-bold text-xl w-[155px]
            border-gray-600 max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px]
             flex cursor-pointer justify-center items-center">Add Account</li>
        </ul>
        <Button onClick={() => setIsDelete(prev => !prev)}
         className="border border-gray-100 cursor-pointer tracking-wide inline-flex
          text-sm px-[1.5em] py-[0.5em] bg-transparent rounded-none hover:bg-white hover:text-gray-700" >
          Manage Account
         </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {control === 'Login' && <LoginAccountForm />}
          {control === 'Create' && <CreateAccountForm />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MangeAccount
