import dotenv from "dotenv";
import axios from 'axios';

export default async function handler(req, res) {
    const { path } = req.query;

    if (!path || typeof path !== 'string') {
        return res.status(400).json({ error: "Missing 'path' query parameter" });
    }

    const apiUrl = process.env.PORTFOLIO_API_URL;
    const username = process.env.PORTFOLIO_API_USER;
    const password = process.env.PORTFOLIO_API_PASSWORD;

    const targetUrl = `${apiUrl}${path.startsWith('/') ? path : '/' + path}`;

    try {
        const axiosResponse = await axios({
            method: req.method,
            url: targetUrl,
            headers: {
                Authorization:
                    'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
                'Content-Type': 'application/json',
                // คัดลอก header เพิ่มเติมตามต้องการ เช่น cookies
                ...(req.headers.cookie && { cookie: req.headers.cookie }),
            },
            data: req.body, // สำหรับ POST, PUT, PATCH
        });

        res.status(axiosResponse.status).json(axiosResponse.data);
    } catch (error) {
        console.error('Proxy error:', error.response?.data || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Failed to fetch from backend',
            detail: error.response?.data || error.message,
        });
    }
}