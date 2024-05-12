

import { connectToDatabase } from "@/database/mongose";
import Account from "@/mongodb/account";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";


export const dynamic = "from-dynamic";

export async function POST(req:Request){
    try{
        await connectToDatabase();
        const {uid,pin,accountId} = await req.json();
        const currentAccount = await Account.findOne({_id:accountId,uid});
        if(!currentAccount){
            return NextResponse.json({success: false, message: "Account not found"});
        }
        const isMatch = await compare(pin,currentAccount.pin)
        if(isMatch){
            return NextResponse.json({success:true, data:currentAccount})
        }else{
            return NextResponse.json({success:false, message:"Incorrect pin"})
        }
    }catch{
        return NextResponse.json({success: false, message: "Somting went wrong"})
    }
}