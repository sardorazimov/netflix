import { connectToDatabase } from "@/database/mongose";
import { NextResponse } from "next/server";


export const dynamic = "force-dynamic";
export async function POST(req:Request){
    try{
        await connectToDatabase();
        return NextResponse.json({message:"Loy siz"});
    }catch(error) {
        return NextResponse.json({success:false,message:"Somting went wrong"});
    }
}