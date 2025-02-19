import React from 'react';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

export default function Footer() {
    return (
        <div className="bg-black text-white px-8 py-4">
            {/* Main Footer Content */}
            <h1 className="text-2xl font-semibold text-center">
                &copy;2024, Project Created By Shahil Afroz
            </h1>
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16 px-4 py-4">
                <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Phone size={20} />
                    <a href="tel:+918910866343" className="text-lg">
                        +91 8910866343
                    </a>
                </div>

                <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Mail size={20} />
                    <a href="mailto:shahilafroz26@gmail.com" className="text-lg">
                        shahilafroz26@gmail.com
                    </a>
                </div>

                <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Linkedin size={20} />
                    <a
                        href="https://www.linkedin.com/in/shahil-afroz/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg"
                    >

                    </a>
                </div>
                <div className="flex items-center gap-2 hover:text-cyan-400 transition-colors">
                    <Github size={20} />
                    <a
                        href="https://github.com/shahil-afroz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg"
                    >
                    </a>
                </div>
            </div>

            {/* Subtle Divider */}
            <div className="w-full border-t border-gray-800 my-4"></div>
            {/* About Project Section */}
            <div className="max-w-3xl mx-auto text-center pb-4">
                <h2 className="text-2xl font-semibold mb-4 ">About Project</h2>
                <p className="text-gray-300 leading-relaxed">
                    "Discover a vast collection of eBooks across multiple genres in our online store. Easily browse, search, and purchase your favorite titles. Once bought, eBooks are instantly accessible on any device, providing a convenient and seamless reading experience anytime, anywhere. Perfect for book lovers on the go!"
                </p>
            </div>
        </div>
    );
}