'use client'

import { Delete, LockKeyhole, Trash } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Dialog, DialogContent } from "../ui/dialog"
import LoginAccountForm from "./LoginAccountForm"
import CreateAccountForm from "./CreateAccountForm"
import { AccountResponse, AccountProps } from "@/types/route"
import axios from "axios"
import { useSession } from "next-auth/react"
import { toast } from "../ui/use-toast"



const MangeAccount = () => {

  const [ isDelete, setIsDelete ] = useState<boolean>(false);
  const [ open, setOpen ] = useState(false);

  const [ control,setControl ] = useState< "Login" | "Create">("Create");
  const [account,setAccount ] = useState<AccountProps[]>([]);
  
  const {data:session }: any = useSession();
  const [currentAccount, setCurrentAccount] = useState<AccountProps  | null>(null)

 const onDelete = async (id:string) => {
   try{
    const isConfirm =  confirm('Are you sure you want to delete this account?');
    if(isConfirm){
      const {data} = await axios.delete<AccountResponse>(`/api/account?id=${id})`);
      if(data.success){
        setAccount(account.filter(account => account._id !== id))
        return toast({
          title:"Deleted",
          description:"Your account has ben deleted successFull!",
        })
      }else{
        return toast({
          title:"Error",
          description:"An error occurred deleting your account",
        })
      }
    }
   }catch (error){
    return toast({
      title:"Error",
      description:"Your delete account successFull",
      variant:"destructive",
    })
   }
 }
  useEffect(() => {
    const getAllAccounts = async () =>{
      try{
        const {data}  = await axios.get <AccountResponse>(`/api/account?uid=${session?.user?.uid}`)
        console.log(data)
        data.success && setAccount(data.data as AccountProps[]);
      }catch(error) {
       return toast({
        title:"Error",
        description: "You create account error please try again ",
        variant:"destructive",
       })
      }
    }
    getAllAccounts()
  },[])



  return (
    <div className='min-h-screen flex justify-center flex-col items-center relative'>
      <div className='flex justify-center flex-col items-center'>
        <h1 className='text-white font-bold text-5xl my-12'>
          Whos Watching
        </h1>
        <ul className='flex p-0 my-12'>
          {account.map(() => (
              <li key={session._id} 
               onClick={() => { 
               if(isDelete) return
               setOpen(true);
               setControl("Login")
               setCurrentAccount(account)
              }}
               className='max-w-[200px] w-[155px] cursor-pointer flex flex-col items-center gap-3 min-w-[200px]'>
            <div className="relative">
             <div className="max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px] object-cover w-[155px] h-[155px] relative">
               <Image  src={"/smile.png"} alt="account" fill/>
             </div>
             {isDelete ? (
              <div onClick={() => onDelete(account._id)} className="absolute transform bottom-0 z-10 cursor-pointer">
                <Trash  className="text-red-600 w-8 h-8"/>
              </div>
             ): null}
            </div>
            <div className="flex items-center gap-1">
              <span className="font-mono font-bold text-xl">
                {session.name}
              </span>
              <LockKeyhole className="h-8 w-8" />
            </div> 
          </li>
          ))}
          {account && account.length < 4 ? (
              <li onClick={() => { setOpen(true); setControl('Create')} }
             className="border  bg-slate-700 font-bold text-xl w-[155px]
            border-gray-600 max-w-[200px] rounded min-w-[84px] max-h-[200px] min-h-[84px]
             flex cursor-pointer justify-center items-center">Add Account</li>
          ):null}
          
        </ul>
        <Button onClick={() => setIsDelete(prev => !prev)}
         className="border border-gray-100 cursor-pointer tracking-wide inline-flex
          text-sm px-[1.5em] py-[0.5em] bg-transparent rounded-none hover:bg-white hover:text-gray-700" >
          Manage Account
         </Button>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {control === 'Login' && <LoginAccountForm currentAccount={currentAccount} />}
          {control === 'Create' && <CreateAccountForm 
           uid={session?.user?.uid} 
           setOpen={setOpen}
           setAccount={setAccount} 
           account={account}
           />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default MangeAccount
