// pages/api/auth/[...nextauth].ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//import { PrismaClient } from "@prisma/client";
import {connectDB} from "@/lib/db";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async function (credentials, req) {
                const {username, password} = credentials;

                const db = await connectDB();
               // const hashedPassword = await bcrypt.hash(password, 10);

                // Check if the email is already registered
                const [user] = await db.execute("SELECT * FROM users WHERE  username = ? ", [username]);
                if (user.length == 0) {
                    throw new Error("User not found");
                }
                else {

                    //const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
                    const isValid = await bcrypt.compare(password, user[0].password);

                    if (!isValid) {
                        throw new Error("Invalid password");
                    }

                    return {
                        "id": user[0].id,
                        "username": user[0].username,
                        "email": user[0].email
                            //  "token" : token
                    };

                }
                //ตัวอย่าง login ตรวจสอบเอง หรือ query จาก DB
                // if (username === "admin" && password === "123456") {
                //     return {
                //         id: "1",
                //         name: "Admin",
                //         email: "admin@example.com",
                //         role: "admin",
                //     };
                // }

                // ถ้า login ไม่ผ่าน ให้ return null
                return null;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.username = user.username;
             //   token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.username = token.username;
           // session.user.role = token.role;
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },

    logger: {
        error(code, metadata) {
            console.error("[next-auth:error]", code, metadata);
        },
        warn(code) {
            console.warn("[next-auth:warn]", code);
        },
        debug(code, metadata) {
            console.debug("[next-auth:debug]", code, metadata);
        },
    },

    // ✅ หรือจะเปิด debug mode เพิ่มก็ได้
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
