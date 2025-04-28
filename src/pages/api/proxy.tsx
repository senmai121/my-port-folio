import axios from 'axios';
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
    const username = process.env.PORTFOLIO_API_USER;
    const password = process.env.PORTFOLIO_API_PASSWORD;

    console.log("url", apiUrl);
    console.log("user", username);

    const targetUrl = `${apiUrl}${path.startsWith('/') ? path : '/' + path}`;

    try {
        const axiosResponse = await axios.get(targetUrl, {
            headers: {
                Authorization:
                    'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
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
