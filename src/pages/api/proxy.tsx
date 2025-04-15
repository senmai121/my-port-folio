import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

        if (error instanceof Error) {
          //  console.log(error.message);

            res.status(500).json({
                error: 'Failed to fetch from backend',
                detail: error.message,
            });
        } else {
            //console.log("Unknown error", error);
            res.status(500).json({
                error: 'Unknown error'
            });
        }

    }
}