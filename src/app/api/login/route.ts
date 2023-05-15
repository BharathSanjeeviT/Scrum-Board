import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma.ts'

export async function POST ( request : NextRequest , response : NextResponse){
    const { name }= await request.json();
    const data = await prisma.user.findUnique({
        where : {name},
    })
    console.log(data)

    return( NextResponse.json(data) )
}
