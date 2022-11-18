import React from "react";

const Hero: React.FC = () => {
    return (
        <div className='absolute flex align-center justify-center 2xl:h-3/4 lg:h-4/6 w-full bg-black/10 mt-16 lg:mt-0 overflow-hidden'>
            <img src="https://i.ytimg.com/vi/tGpTpVyI_OQ/maxresdefault.jpg" alt="" className="object-cover" />
            <div className="absolute left-10 top-1/4">
                <h1 className="text-4xl lg:text-6xl">Pulp Fiction</h1>
                <div className="flex mt-8">
                    <div className="flex mr-4 px-5 py-2 justify-evenly rounded bg-gray-100 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                        <p className="text-black font-semibold">&nbsp;&nbsp;Play</p>
                    </div>
                    <div className="flex px-5 py-2 justify-evenly rounded bg-gray-700 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <p className="text-gray-100 font-semibold">&nbsp;&nbsp;My List</p>
                    </div>
                </div>
                <div className="w-1/4 mt-5">
                    <p>
                        Vincent Vega and Jules Winnfield are hitmen with a penchant for philosophical discussions. In this ultra-hip, multi-strand crime movie, their storyline is interwoven with those of their boss, gangster Marsellus Wallace...
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Hero;