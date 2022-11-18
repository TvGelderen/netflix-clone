import React from "react";

const Hero: React.FC = () => {
    return (
        <div 
          className="flex items-center justify-center mb-12 h-[360px] lg:h-[720px] bg-contain lg:bg-center bg-no-repeat"
          style={{backgroundImage: 'url("https://i.ytimg.com/vi/tGpTpVyI_OQ/maxresdefault.jpg")'}}  
        >
            <div className='absolute top-0 left-0 right-0 h-1/4 lg:h-4/6 z-[2]' />
        </div>
    )
}

export default Hero;