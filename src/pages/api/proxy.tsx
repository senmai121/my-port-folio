import axios from 'axios';
import jwt from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { path } = req.query;

    if (!path || typeof path !== 'string') {
        return res.status(400).json({ error: "Missing 'path' query parameter" });
    }

    const apiUrl = process.env.PORTFOLIO_API_URL;
    const JWT_USER = process.env.JWT_USER;
    const JWT_ROLE = process.env.JWT_ROLE;
    const JWT_SECRET= process.env.JWT_SECRET;



    const targetUrl = `${apiUrl}${path.startsWith('/') ? path : '/' + path}`;

    try {
        if (!JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables.');
        }
        const token = jwt.sign(
            { userId: JWT_USER,  role: JWT_ROLE},
            JWT_SECRET,
            { expiresIn: '10m' }
        );


        const axiosResponse = await axios.get(targetUrl, {
            headers: {
                Authorization:
                    `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...(req.headers.cookie && { cookie: req.headers.cookie }),
            },
        });

        res.status(axiosResponse.status).json(axiosResponse.data);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                error: 'Failed to fetch from backend',
                detail: error.message,
            });
        } else {
            res.status(500).json({
                error: 'Unknown error'
            });
        }
    }
}
