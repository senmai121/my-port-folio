import mysql from "mysql2/promise";
import dotenv from "dotenv";

export async function connectDB() {
    dotenv.config();
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST, // หรือ IP ของ MySQL Server
        user: process.env.DB_USER, // ชื่อผู้ใช้ MySQL
        password: process.env.DB_PASSWORD, // รหัสผ่าน MySQL
        database: process.env.DB_NAME, // ชื่อฐานข้อมูล
    });

    return connection;
}

