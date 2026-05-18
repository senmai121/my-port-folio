import React from 'react';
import MainLayout from "@/components/MainLayout";
import connectDB from '@/lib/connectDB';
import JobExperience from '@/models/JobExperience';
import Skill from '@/models/Skill';
import { format } from 'date-fns';
import type { JobExperienceType } from '@/components/experiences';
import type { SkillType } from '@/components/about';

const Home = async () => {
  await connectDB();

  const jobDocs = await JobExperience.find({}).sort({ start: -1 }).lean();
  const jobExperiences: JobExperienceType[] = jobDocs.map((job: Record<string, unknown>) => ({
    _id: String(job._id),
    position: job.position as string,
    company: job.company as string,
    description: job.description as string,
    start: format(new Date(job.start as string), 'MMM-yyyy'),
    end: job.end ? format(new Date(job.end as string), 'MMM-yyyy') : 'Present',
    skills: (job.skills as Array<{ name: string; level: string }>).map(s => ({
      name: s.name,
      level: s.level,
    })),
  }));

  const skillDocs = await Skill.find({}).lean();
  const skills: SkillType[] = skillDocs.map((s: Record<string, unknown>) => ({
    _id: String(s._id),
    name: s.name as string,
    level: s.level as string,
    type: s.type as string,
  }));

  return <MainLayout jobExperiences={jobExperiences} skills={skills} />;
}

export default Home;
