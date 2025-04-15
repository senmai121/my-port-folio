import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
//import { PrismaClient } from "@prisma/client";
import {connectDB} from "@/lib/db";

//const prisma = new PrismaClient();

export default async function POST(req, res) {
    const { email, password } = await req.body;

    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user) {
    //     return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    // }
    //
    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const db = await connectDB();

    // Check if the email is already registered
    const [user] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length == 0) {
        return res.status(400).json({ message: "User not found" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    //return NextResponse.json({ token });
    return res.status(201).json({ message: "login successfully" ,token : token});
}