import React from 'react'
import Description from '../ui/Description'
import PlatformLogo from '../ui/PlatformLogo'
import content from '../../app/data/welcome.json'

const PlatformSection = ({
    text="",
    classNames=""
}) => {
  return (
    <div className=" bg-white-100 md:flex md:my-[96px]">
        <Description      
            text="Trusted By World's Best Content Distribution Platforms"     
            classNames="py-6 text-black px-4 text-lg xxs:text-xl md:text-[24px] font-bold leading-9 tracking-normal text-center"
        />
        <div className='grid grid-cols-3 -mx-2 md:w-full pb-8 md:pb-0'>
            {content?.platformLogo?.map((item,index)=>{
              return ( <PlatformLogo key={index} source={item?.source} height={item?.height} width={item?.width} /> )
            })
            }
        </div>
    </div>
  )
};

export default PlatformSection;