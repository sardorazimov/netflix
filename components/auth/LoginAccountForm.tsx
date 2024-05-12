"use client";

import { AccountProps, AccountResponse } from '@/types/route';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import PinInput from 'react-pin-input';
import { toast } from '../ui/use-toast';
import { useGlobalContext } from '@/context/Context';
import { usePathname, useRouter } from 'next/navigation';

interface LoginAccountFormProps{
  currentAccount:AccountProps | null
}

const LoginAccountForm = ({
  currentAccount
}:LoginAccountFormProps) => {
  const [error, setError] = useState(false);
  const [pin, setPin] = useState("")

  const [isLoading, setIsLoading] = useState(false);
  const {setAccount} = useGlobalContext()

  const pathname = usePathname();
  const router = useRouter()

  //console.log(pathname)
  const onSubmit = async (value:string) => {
    setIsLoading(true)
    try{
      const {data} =  await axios.post<AccountResponse>(`/api/account/login`, {
        uid:currentAccount?.uid,
        accountId: currentAccount?._id,
        pin: value,

      })
      if(data.success){
        setAccount(data.data as AccountProps);
        sessionStorage.setItem("account",JSON.stringify(data.data));
        router.push(pathname);
        return toast({
          title: "Account unBlocked",
          description: "Your Account has benn unblocked seccessFull",
        })
      }else{
        setError(true)
      }
    }catch(error) {
      return toast({
        title:"Error",
        description:"An error occurred while loging in",
        variant:"destructive"
      })
    }finally{
      setIsLoading(false)
    }
  }
  return (
   <>
     <h1 className='text-gray-400 font-bold text-[19px] mb-4'>
      Profile Lock is current ON
     </h1>
     {error ? (
      <h2 className='text-red-500 text-center font-bold text-[20px]'>
        Whoops wrong pin Please try again
      </h2>
     ): (
      <h2 className='tezt-white text-center font-bold text-[20px]'>
        Enter you PIN ro acces this prifile
      </h2>
     )}
     <div className='flex items-center justify-center'>
      <PinInput
          length={4}
          initialValue={pin}
          secret
          secretDelay={100}
          onChange={(value) => setPin(value)}
          type="numeric"
          inputMode="number"
          style={{ padding: "20px", display: "flex", gap: "10px" }}
          inputStyle={{
            borderColor: "white",
            height: "70px",
            width: "70px",
            fontSize: "40px",
          }}
          disabled={isLoading}
          inputFocusStyle={{ borderColor: "white" }}
          onComplete={(value) => onSubmit(value)}
          autoSelect={true} />
          {isLoading && <Loader2 className='animate-spin' />}
     </div>
   </>
  )
}

export default LoginAccountForm
