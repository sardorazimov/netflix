import { redirect } from "next/dist/server/api-utils"

const HomePage = () => {

  return redirect('/browse')
}

export default HomePage
