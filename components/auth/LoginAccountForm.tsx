import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import PinInput from 'react-pin-input';

const LoginAccountForm = () => {
  const [error, setError] = useState(false);
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = (value:string) => {
    setIsLoading(true)
    console.log(value)
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
