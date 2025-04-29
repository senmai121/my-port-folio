import type { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';
import JobExperience from '@/models/JobExperience';
//import jwt from 'jsonwebtoken';
import connectDB from '@/lib/connectDB';
import checkAuth from "@/lib/checkAuth";



// const JWT_USER = process.env.JWT_USER;
// const JWT_ROLE = process.env.JWT_ROLE;
//
//
// const checkAuth = (req: NextApiRequest): boolean => {
//
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer')) return false;
//     const token = authHeader.split(' ')[1];
//
//     if (!token) {
//         return false;
//     }
//
//     try {
//         // Verify JWT Token
//         if (!process.env.JWT_SECRET) {
//             throw new Error('JWT_SECRET is not defined in environment variables.');
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//
//
//         if (typeof decoded !== 'string' ) {
//
//
//             const {userId, role} = decoded;
//
//             return userId===JWT_USER && role===JWT_ROLE;
//         }
//         else return false;
//
//     }
//     catch{
//         return false;
//     }
// };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (!checkAuth(req)) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    await connectDB();

    if (req.method === 'GET') {
        try {
            const jobs = await JobExperience.find({}).sort({ start: -1 });
         //   console.log("jobs",jobs)
            const formattedJobs = jobs.map(job => ({
                ...job.toObject(),
                start: format(new Date(job.start), 'MMM-yyyy'),
                end: (job.end ? format(new Date(job.end), 'MMM-yyyy') : "Present"),
            }));
            return res.status(200).json(formattedJobs);
        } catch (err: unknown) {
            if (err instanceof Error) {
                return res.status(500).json({ error: err.message });
            }
            return res.status(500).json({ error: 'Unexpected error' });
        }
    } else if (req.method === 'POST') {
        try {
            const { position, company, description, start, end, skills } = req.body;
            const newJob = new JobExperience({ position, company, description, start, end, skills });
            await newJob.save();
            return res.status(201).json(newJob);
        }catch (err: unknown) {
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