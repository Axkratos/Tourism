import React, { useState } from 'react';

export default function Widget() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { src: 'https://placekitten.com/300/200', alt: 'Tourism Image 1' },
        { src: 'https://placekitten.com/301/200', alt: 'Tourism Image 2' },
        { src: 'https://placekitten.com/302/200', alt: 'Nature Image 1' },
        { src: 'https://placekitten.com/303/200', alt: 'Nature Image 2' },
    ];

    const handleNextSlide = () => {
        setCurrentSlide((currentSlide + 1) % slides.length);
    };

    const handlePrevSlide = () => {
        setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div className="relative bg-custom-image bg-opacity-25 bg-cover bg-center h-screen">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-start justify-center h-full text-left text-white pl-10">
                <h1 className="text-5xl font-bold">FIND A LOCAL</h1>
                <h2 className="text-3xl mt-2">TO SHOW YOU AROUND</h2>
                <div className="mt-6 flex items-center bg-white rounded-full overflow-hidden shadow-lg">
                    <input type="text" placeholder="Where next?" className="p-4 text-zinc-700 outline-none w-64" />
                    <button className="bg-blue-500 text-white px-6 py-4">BROWSE LOCALS</button>
                </div>
                <p className="mt-4 text-sm">Top Destinations: <span className="font-bold">Paris, Istanbul, Barcelona, Tbilisi, Kiev, Lisbon</span></p>
            </div>
            <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-full shadow-lg">
                            <img src="https://placekitten.com/100/100" alt="How it works" className="w-24 h-24" />
                            <h3 className="mt-4 text-lg font-bold">HOW IT WORKS</h3>
                            <p className="mt-2 text-sm">Find. Browse locals. Find the one you like.</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-between px-4">
                        <button onClick={handlePrevSlide} className="text-white text-2xl">&lt;</button>
                        <button onClick={handleNextSlide} className="text-white text-2xl">&gt;</button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {slides.map((_, index) => (
                            <span key={index} className={`w-2 h-2 ${index === currentSlide ? 'bg-white' : 'bg-zinc-400'} rounded-full`}></span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
