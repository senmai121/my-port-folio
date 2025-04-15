"use client";


import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export default function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });
    const [error, setError] = useState("");

    const onSubmit = async (data) => {
        const res = await fetch("/api/auth/login/route", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!res.ok) {

            console.log(res);
            setError("Invalid credentials");
            return;
        }

        const { token } = await res.json();
        localStorage.setItem("token", token);
        window.location.href = "/";
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} placeholder="Email" />
                {errors.email && <p>{errors.email.message}</p>}
                <input {...register("password")} type="password" placeholder="Password" />
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit">Login</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}
