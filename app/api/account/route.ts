import { connectToDatabase } from "@/database/mongose";
import Account from "@/mongodb/account";
import { NextResponse } from "next/server";
import {hash} from "bcryptjs"

export const dynamic = "force-dynamic";
export async function POST(req:Request){
    try{
        await connectToDatabase();
        const {name,pin,uid} = await req.json();
        const isExit = await Account.findOne({name});
        const  allAcount = await Account.find({uid});
        //console.log(isExit);
        //console.log(allAcount);

        if(isExit){
            return NextResponse.json({success:false,message: "You alerdy have an account"});
        }

        if(allAcount && allAcount.length > 3){
            return NextResponse.json({success:false,message:"You can only have 4 accounts"})
        }

        const hashPin = await hash(pin,10);

        const account = await Account.create({
            name,
            pin:hashPin,
            uid
        })
        
        return NextResponse.json({success:true,data:account}); 
    }catch(error) {
        return NextResponse.json({success:false,message:"Somting went wrong"});
    }
}

 export async function GET(req:Request){
    try{
       await connectToDatabase();

       const {searchParams} = new URL(req.url);
       const uid = searchParams.get("uid");

       if(!uid){
        return NextResponse.json({success: false,message:" Account id requierd"})
       }

       const accountt = await Account.find({uid});
       return NextResponse.json({success:true, data: accountt});
       
    }catch(error) {
        return NextResponse.json({success:false, message:"Somting went wrong"});
    }
 }


 export async function DELETE(req:Request){
    try{
        await connectToDatabase();

        const {searchParams} = new URL(req.url);
        const id = searchParams.get("uid");

        if(!id){
            return NextResponse.json({success: false,message:" Account id requierd"})
           }
        await Account.findByIdAndDelete(id);
        return NextResponse.json({success: true,message:"Account delete successFull See Again"})

    }catch{

    }
 }