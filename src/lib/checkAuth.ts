import type { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';


const JWT_USER = process.env.JWT_USER;
const JWT_ROLE = process.env.JWT_ROLE;


const checkAuth = (req: NextApiRequest): boolean => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) return false;
    const token = authHeader.split(' ')[1];

    if (!token) {
        return false;
    }

    try {
        // Verify JWT Token
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined in environment variables.');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        if (typeof decoded !== 'string' ) {


            const {userId, role} = decoded;

            return userId===JWT_USER && role===JWT_ROLE;
        }
        else return false;

    }
    catch{
        return false;
    }
};

export default checkAuth;