import type { NextApiRequest, NextApiResponse } from 'next';
import Skill from '@/models/Skill';

import connectDB from '@/lib/connectDB';
import checkAuth from "@/lib/checkAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (!checkAuth(req)) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    if (req.method === 'GET') {
        try {
            const skills = await Skill.find({});
            return res.status(200).json(skills);
        } catch (err: unknown) {
            if (err instanceof Error) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Unexpected error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { name , level } = req.body;
            const newSkill = new Skill({ name , level });
            await newSkill.save();
            return res.status(201).json(newSkill);
        } catch (err: unknown) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Unexpected error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}