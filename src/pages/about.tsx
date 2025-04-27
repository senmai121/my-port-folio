"use client";
import React, { useState, useEffect } from 'react';
import axios from "axios";
import DOMPurify from 'dompurify';
import Skill from "@/models/Skill";





const About = () => {
    const [data, setData] = useState<Skill[]>([]);
    const [loading] = useState(false);
    const [error] = useState(null);



    let section3=<div>Hello World, Error Load API</div>
    useEffect(() => {
        //fetchData(setData);

        axios.get<Skill[]>('/api/proxy', { params: { path: '/skill' } }).then((response) => {
            setData(response.data);
        });
    }, []); // ทำงานครั้งเดียวเมื่อ component ถูก render


    if (loading) {
        return <div>Loading...</div>;
    }
    else if (error) {
        return <div>Error: {error}</div>;
    }
    else
    {
        console.log("data",data);

        let types =[...new Set(data.map(d=>d.type))];
        let skills =[];
        for(let i=0; i<types.length;i++)
        {
            let tmp = data.filter(s=>s.type===types[i]);
            let skill=
                {
                    type : types[i],
                    skills : tmp
                }
            skills.push(skill);
        }

        console.log("skills",skills)

        section3 =
            <section className="article-list">
                <div className="container">

                    <h1 className="justify-center text-[#0a192f] text-lg font-bold">About Me</h1>

                    <div className="p-4" >

                        <div className="flex bg-extralightgray flex-col p-4 rounded-xl text-gray-800" >
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-tanorange">General Information</p>

                            </div>
                            <hr className="border-gray-300"/>
                            <p className="m-4">
                            <b>Date off Birth</b> 11/01/1984<br/>
                            <b>Address</b> Thonburi, Bangkok 10600, Thailand
                            </p>


                        </div>
                    </div>
                    <div className="p-4" >

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
                    </div>

                    <div className="p-4" >

                        <div className="flex bg-extralightgray flex-col p-4 rounded-xl text-gray-800 no-underline">

                            <div className="flex justify-between items-center">
                                <p className="font-bold text-tanorange">Skill</p>

                            </div>
                            <hr className="border-gray-300"/>
                            <div className="m-4">
                            {skills?.map((skilltype) =>
                                (
                                    <span >
                                        <b>{skilltype.type}</b><br/>
                                        {skilltype.skills?.map((skill) => (
                                            <span key={skill.name+"_space"}><span key={skill.name} className="rounded-xl bg-yellow-200 border border-yellow-300"> &nbsp;{skill.name}&nbsp; </span>&nbsp;</span>
                                        ))}

                                        <br/></span>
                                ))}
                            </div>

                        </div>
                    </div>






                </div>
            </section>
    }



    return section3
}

export default About
