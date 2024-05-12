"use client"
import { createAccountSchema } from "@/hooks/form-schema"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import PinInput from "react-pin-input"
import axios from "axios"
import { AccountProps, AccountResponse } from "@/types/route"
import { Dispatch, SetStateAction } from "react"
import { toast } from "../ui/use-toast"


interface CreateAccountFormProps{
  uid:string;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setAccount: Dispatch<SetStateAction<AccountProps []>>;
  account:AccountProps[];
}

const CreateAccountForm = ({
  uid,
  setOpen,
  setAccount,
  account
 }:CreateAccountFormProps) => {
    const form = useForm<z.infer<typeof createAccountSchema>>({
        resolver:zodResolver(createAccountSchema),
        defaultValues:{
            name: "",
            pin: "",
        }
    })
    const { isValid, isSubmitted} = form.formState
    async function onSubmit(values:z.infer<typeof createAccountSchema>){
        try{
          const {data} =  await axios.post <AccountResponse>("api/account",{...values,uid})
          if(data.success){
            setOpen(false)
            form.reset();
            setAccount([...account,data.data as AccountProps])
            return  toast({
              title: "Account create successfull",
              description:" You Account create has been successFull",
              variant: "destructive"
            })

          }else{
           return toast ({
            title:"Error",
            description: data.message

           })
          }
        }catch(error) {
          return toast({
            title:"Error",
            description: "Error you create account Please try again"
          })
        }
    }
  return (
   <> 
     <h1 className="text-white text-center font-bold text-3xl">
        Create your account
     </h1>
     <div className="w-full h-[2px] bg-slate-500/20 mb-4" />
     <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField control={form.control}
             name={"name"}  
             render={({field})  => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                        <Input {...field} autoComplete={"off"} className="h-[56px] rounded border" disabled={isSubmitted} />
                    </FormControl>
                    <FormDescription> Your name is used to identify accounnt </FormDescription>
                    <FormMessage className="text-red-600" />
                </FormItem>
              ) } />  
              <FormField control={form.control} name={"pin"} render={({field}) => (
                 <FormItem>
                 <FormLabel>Password</FormLabel>
                 <FormControl>
                     <PinInput  length={4} initialValue={field.value} secret
                       disabled={isSubmitted} secretDelay={100} inputMode="number" 
                       onChange={(value => field.onChange(value))} 
                       type={"numeric"} 
                       style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}
                       inputStyle={{
                         borderColor: "RGBA(255, 255, 255, 0.16)",
                         height: "56px",
                         width: "100%",
                         fontSize: "40px",
                       }}
                       inputFocusStyle={{ borderColor: "RGBA(255, 255, 255, 0.80)" }}
                       autoSelect={true}  />
                 </FormControl>
                 <FormDescription> Your password is used to identify accounnt </FormDescription>
                 <FormMessage className="text-red-600" />
             </FormItem>
              )} />
              <Button className="w-full bg-red-500 hover:bg-red-800 justify-center mt-4 
              items-center rounded hover:text-white h-[56px]" disabled={isSubmitted} type="submit">Create Account </Button>
        </form>
     </Form>
   </>
  )
}

export default CreateAccountForm
