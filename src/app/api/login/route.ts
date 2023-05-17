import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma.ts'

export async function POST ( request : NextRequest , response : NextResponse){
    const { name , password }= await request.json();
    const data = await prisma.user.findUnique({
        where : {name},
    })
    if(data==null){
        return ( NextResponse.json({status: 404 }) )
    }else if ( data.password === password ){
        return ( NextResponse.json({status : 200}) )
    }else{
        return ( NextResponse.json({status : 400}) )
    }
}
