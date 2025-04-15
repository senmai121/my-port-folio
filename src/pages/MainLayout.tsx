
'use client';
import "../app/globals.css"
import "./experiences";
 // ถ้าใช้ app dir ของ Next 13+

import { useState } from 'react';
import Image from 'next/image';
import Experience from "@/pages/experiences";
import { Facebook, Linkedin ,Mail,Instagram } from 'lucide-react';

export default function Home() {
    const [activeSection, setActiveSection] = useState<'about' | 'projects' | 'contact'>('about');

    const renderSection = () => {
        switch (activeSection) {
            case 'about':
                return <p className="text-gray-300">This is the About section.</p>;
            case 'experiences':
                return <Experience />
            case 'contact':
                return <p className="text-gray-300">Get in touch at you@example.com</p>;
        }
    };

    return (
        <main className="min-h-screen bg-white text-gray-300 flex flex-col lg:flex-row">
            {/* Left Side - Fixed Name */}


            <div className="lg:w-1/3 bg-[#0a192f] backdrop-opacity-50 w-full border-r border-gray-800 p-16 flex flex-col justify-top lg:sticky top-0 lg:h-screen sm:h-1/2">

                {/*<div className="absolute inset-0 bg-white bg-white/30 backdrop-invert backdrop-opacity-30"></div>*/}
                <div className="flex-1 relative z-10">
                    <p className="text-tanorange text-lg">Senior Software Engineer</p>
                    <h1 className="text-3xl font-bold mt-2">Kanachai Niyomsilpchai</h1>
                </div>
                <div className="flex-1 flex justify-center items-start">
                    <Image
                        src="/images/IMG_3075.jpg"
                        alt="My Profile"
                        width={128}
                        height={128}
                        className="rounded-full object-cover relative z-10  shadow-xl" loading="lazy"/>

                </div>
                <div className="flex-1 flex justify-start items-end">
                <nav className="flex relative z-10 flex-row md:flex-col space-x-4 md:space-x-0 md:space-y-4 text-2xl lg:items-start">
                    <button
                        className={`hover:text-bluesky ${activeSection === 'experiences' ? 'text-tanorange' : ''}`}
                        onClick={() => setActiveSection('experiences')}
                    >
                        Experiences
                    </button>
                    <button
                        className={`hover:text-bluesky ${activeSection === 'contact' ? 'text-tanorange' : ''}`}
                        onClick={() => setActiveSection('contact')}
                    >
                        Education
                    </button>
                    <button
                        className={`hover:text-bluesky ${activeSection === 'contact' ? 'text-tanorange' : ''}`}
                        onClick={() => setActiveSection('about')}
                    >
                        Others
                    </button>
                </nav>
                </div>

                <div className="flex-1 flex items-end justify-center relative z-10">
                    <div className="flex space-x-4  space-y-4">
                        <a href="https://www.facebook.com/nes.kanachai" target="_blank" rel="noopener noreferrer">
                            <Facebook className="w-6 h-6 text-gray-300"  /></a>
                        <a href="https://www.linkedin.com/in/kanachai-niyomsilpchai-674671141/" target="_blank" rel="noopener noreferrer">
                            <Linkedin className="w-6 h-6 text-gray-300" /></a>
                        <a href="https://www.instagram.com/nessuke121/" target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-gray-300" /></a>
                    </div>
                </div>
            </div>

            {/* Right Side - Dynamic Content  */}
            <div className="lg:w-2/3 w-full p-10 lg:overflow-y-auto bg-cover bg-center min-h-screen bg-white">


                <div className="transition-all duration-300 ease-in-out">
                    {renderSection()}
                </div>
            </div>
        </main>
    );
}