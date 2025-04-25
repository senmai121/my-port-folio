// models/JobExperience.ts หรือ .js ก็ได้
import mongoose from 'mongoose';

const JobExperienceSchema = new mongoose.Schema({
    position: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    start: { type: Date, required: true },   // เปลี่ยนเป็น Date
    end: { type: Date, required: true },     // เปลี่ยนเป็น Date
    skills: [
        {
            name: String,
            level: String,
        },
    ],
}, { timestamps: true, collection: 'job_experience' });

export default mongoose.models.JobExperience || mongoose.model('JobExperience', JobExperienceSchema);
