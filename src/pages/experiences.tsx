"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import DOMPurify from 'dompurify';


export interface Skill {
    name: string;
    level: string;
}

export interface JobExperienceType {
    _id?: string;             // เพราะเวลา fetch จาก MongoDB จะมี _id
    position: string;
    company: string;
    description: string;
    start: string;
    end: string;
    skills: Skill[];
    createdAt?: Date;
    updatedAt?: Date;
}



const Experience = () => {
    const [data, setData] = useState<JobExperienceType[]>([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);




    useEffect(() => {
        //fetchData(setData);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<JobExperienceType[]>('/api/proxy', {
                    params: { path: '/job-experience' },
                });
                setData(response.data);
            } catch (error) {
                console.error('โหลดข้อมูลไม่สำเร็จ', error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    if (loading) {
        return <div className="text-lg text-black">Loading Job Experience...</div>;
    }
    else if (error) {
        return <div>Error: {error}</div>;
    }
    else
    {
       // console.log("data",data);
        return <section className="article-list">
                <div className="container">
                    <h1 className="justify-center text-[#0a192f] text-lg font-bold">My Work Experience</h1>

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
                                        <p className="mt-2">

                                            <strong>Skill Used :</strong>
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


}

export default Experience
