import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { connectDB } from "@/lib/db.js"

export default async function handler(req, res) {

    dotenv.config();

    const connection = await connectDB();

    try {
        const [rows] = await connection.execute("SELECT * FROM users");
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        connection.end(); // ปิดการเชื่อมต่อ
    }
}
