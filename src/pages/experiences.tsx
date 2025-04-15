"use client";
import React, { useState, useEffect ,useRef} from 'react';
import axios from "axios";
import DOMPurify from 'dompurify';



const fetchData = async (setData,data) => {
    //setLoading(true); // ตั้งสถานะการโหลดเป็น true

  //  const [data, setData] = useState(null);
    try {


        const response  = await axios.get('/api/proxy', { params: { path: '/jobs' } })

        console.log("response",response)
        setData(response.data);

      //  setLoading(false); // ตั้งสถานะการโหลดเป็น false
    } catch (error) {
        //setError(error.message);  // อัพเดตสถานะข้อผิดพลาด
        //setLoading(false);        // ตั้งสถานะการโหลดเป็น false
        console.log(error.message);
    }
};
const Experience = () => {
    const [data, setData] = useState(null);
    const [loading] = useState(false);
    const [error] = useState(null);



    let section3=<div>Hello World, Error Load API</div>
    useEffect(() => {
        fetchData(setData,data);
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
        section3 =
            <section className="article-list">
                <div className="container">
                    <h1 className="justify-center">My Work Experience</h1>

                        {data && data.map((post) => (

                            <div className="p-4" key={post.id}>
                                <div className="flex bg-extralightgray flex-col p-4 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <p className="font-bold text-tanorange">{post.position}<br/><span className="text-black">{post.company}</span></p>
                                        <p className="text-gray-400">{post.start} - {post.end}</p>
                                    </div>
                                    <hr className="border-gray-300"/>
                                    <div className="mt-4 text-gray-600">

                                        <div
                                            className="mt-2 text-sm text-gray-800"
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }}
                                        />
                                        <p className="mt-2 p-4">
                                            <strong>Skill Used :</strong>
                                            {post.skills && post.skills.map((skill) =>
                                                (
                                                    <span key={skill.name+"_space"}><span key={skill.name} className="rounded-xl bg-yellow-200 border border-yellow-300"> &nbsp;{skill.name}&nbsp; </span>&nbsp;</span>
                                                ))}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        ))}


                </div>
            </section>
    }



  return section3
}

export default Experience
