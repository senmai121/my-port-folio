"use client";
import React from 'react';
import DOMPurify from 'dompurify';


export interface Skill {
    name: string;
    level: string;
}

export interface JobExperienceType {
    _id?: string;
    position: string;
    company: string;
    description: string;
    start: string;
    end: string;
    skills: Skill[];
}

interface ExperienceProps {
    data: JobExperienceType[];
}

const Experience = ({ data }: ExperienceProps) => {
    return <section className="article-list">
                <div className="container">
                    <h1 className="justify-center text-[#0a192f] text-lg font-bold">My Work Experiences</h1>

                        {data?.map((post) => (

                            <div className="md:pt-4 md:pl-4 md:pr-4"  key={post._id}>
                                <div className="flex bg-extralightgray flex-col p-4 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-tanorange">{post.position}<br/><span className="text-black">{post.company}</span></p>
                                        <p className="text-gray-400">{post.start} - {post.end}</p>
                                    </div>
                                    <hr className="border-gray-300"/>
                                    <div className="mt-4 text-gray-600">

                                        <div
                                            className="mt-2 text-gray-800"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
                                        />
                                        <br/>
                                        <p className="mt-2 text-gray-800">

                                            <strong>Skills Used :</strong>
                                            {post.skills?.map((skill) =>
                                                (
                                                    <span key={skill.name+"_space"}><span key={skill.name} className="rounded-xl bg-yellow-200 border border-yellow-300"> &nbsp;{skill.name}&nbsp; </span>&nbsp;</span>
                                                ))}
                                        </p>
                                    </div>
                                </div>
                                <br/>
                            </div>
                        ))}


                </div>
            </section>
}

export default Experience
