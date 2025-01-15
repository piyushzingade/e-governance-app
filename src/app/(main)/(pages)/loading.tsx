import { AiOutlineLoading3Quarters } from "react-icons/ai";




export default function Loading(){
  return <div className="flex items-center justify-center min-h-screen bg-[#111827]">
    <AiOutlineLoading3Quarters className=" text-4xl text-blue-600 animate-spin" />
    <span className="ml-4 text-lg text-gray-600">Loading Please Wait.........</span>
  </div>
}