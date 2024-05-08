import Image from "next/image"
import { Button } from "../button"
import { Github } from "lucide-react"


const Login = () => {
  return (
    <div className={"w-full h-screen"}>
      <div className="absolute inset-0">
       <Image src={"/trnetflix.jpg"}  alt="Login"  fill/>  
      </div>
       <div className="relative z-10 w-[600px] bg-slate-900/40 h-[50vh]
        left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md px-8">
          <div className="flex h-full items-center justify-center">
            <Button className="mt-4  flex items-center gap-2 w-full h-[56px]
              bg-red-600 text-white hover:bg-white hover:text-black rounded" variant={"outline"}>
            <Github className="w-8 h-8  " />
            Sign in GitHub
          </Button>
          </div>
        
        </div>
    </div>
  )
}

export default Login
