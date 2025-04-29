"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";



export interface SkillType {
    _id: string;
    name: string;
    level: string;
    type: string;
    createdAt?: Date;
    updatedAt?: Date;
}





const About = () => {
    const [data, setData] = useState<SkillType[]>([]);
    const [loading,setLoading] = useState(false);





    useEffect(() => {
        //fetchData(setData);
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<SkillType[]>('/api/proxy', {
                    params: { path: '/skill' },
                });
                setData(response.data);
            } catch (error) {
                console.error('โหลดข้อมูลไม่สำเร็จ', error);

            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    // if (loading) {
    //     return <div>Loading...</div>;
    // }
    // else if (error) {
    //     return <div>Error: {error}</div>;
    // }
    // else
    // {


        const types =[...new Set(data.map(d=>d.type))];
        const skills =[];
        for(let i=0; i<types.length;i++)
        {
            const tmp = data.filter(s=>s.type===types[i]);
            const skill=
                {
                    _id : types[i],
                    type : types[i],
                    skills : tmp
                }
            skills.push(skill);
        }



        return <section className="article-list">
                <div className="container">

                    <h1 className="justify-center text-[#0a192f] text-lg font-bold">About Me</h1>

                    <div className="md:pt-4 md:pl-4 md:pr-4" >

                        <div className="flex bg-extralightgray flex-col p-4 rounded-xl text-gray-800" >
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-tanorange">General Information</p>

                            </div>
                            <hr className="border-gray-300"/>
                            <p className="m-4">
                            <b>Date off Birth :</b> 11/01/1984<br/>
                            <b>Address :</b> Thonburi, Bangkok 10600, Thailand<br/>
                            <b>Education :</b> Bachelor of Computer Engineering ,Kasetsart University (GPA: 3.49)
                            </p>


                        </div>
                    </div>
                    <br/>
                    <div className="md:pt-4 md:pl-4 md:pr-4" >

                        <div className="flex bg-extralightgray flex-col p-4 rounded-xl text-gray-800 no-underline">

                            <div className="flex justify-between items-center">
                                <p className="font-bold text-tanorange">Overview</p>

                            </div>
                            <hr className="border-gray-300"/>
                            <u className="no-underline m-4">
                                <li>Experiences in C# ASP.net Software Development and Design for about 10+ years but open to learn a new technologies</li>
                                <li>Experiences in cloud-base ERP software (Oracle Netsuite) customization called for 6+ years</li>
                                <li>Participated in almost process of SDLC (Requirement Gathering, Prototyping, Development, UAT and User Training) so I also have the skills of Designing and Analyzing</li>
                                <li>Documentations, presentations and supporting for almost systems that I developed</li>
                                <li>Usually work with complicate business process</li>
                            </u>
                        </div>
                    </div><br/>

                    <div className="md:pt-4 md:pl-4 md:pr-4" >

                        <div className="flex bg-extralightgray flex-col p-4 rounded-xl text-gray-800 no-underline">

                            <div className="flex justify-between items-center">
                                <p className="font-bold text-tanorange">Skill</p>

                            </div>
                            <hr className="border-gray-300"/>
                            {loading ? <div className="m-4">Loading..</div>:
                            <div className="m-4">
                            {skills?.map((skilltype) =>
                                (
                                    <span key={skilltype._id}>
                                        <b>{skilltype.type}</b><br/>
                                        {skilltype.skills?.map((skill) => (
                                            <span key={skill._id+"_space"}><span key={skill.name} className="rounded-xl bg-yellow-200 border border-yellow-300"> &nbsp;{skill.name}&nbsp; </span>&nbsp;</span>
                                        ))}

                                        <br/></span>
                                ))}
                            </div>
                            }

                        </div>
                    </div>
                    <br />
                    <div className="md:pt-4 md:pl-4 md:pr-4" >

                        <div className="flex bg-extralightgray flex-col p-4 rounded-xl text-gray-800" >
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-tanorange">Certifications</p>

                            </div>
                            <hr className="border-gray-300"/>
                            <p className="m-4">
                               <li><a href="/doc/Kanachai Niyomslipchai-NetSuite Certified SuiteFoundation.pdf">Netsuite Suitefoundation 2024-2025</a></li>
                            </p>


                        </div>
                    </div>






                </div>
            </section>





}

export default About
