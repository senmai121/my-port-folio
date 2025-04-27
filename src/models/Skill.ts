import mongoose from 'mongoose';

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: String, required: true },
    type : { type: String, required: true },
},{timestamps: true , collection: 'skill' });

export default mongoose.models.Skill || mongoose.model('Skill', SkillSchema);