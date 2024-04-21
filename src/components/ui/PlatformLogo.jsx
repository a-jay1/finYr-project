import Image from 'next/image'
import React from 'react'

const PlatformLogo = ({
    source="",
    height="",
    width="",
}) => {
  return (
    <div className='border border-white-150 border-collapse flex justify-center border-black py-5'>
        <Image 
            src={source}
            alt='Platform Image'
            height={height}
            width={width}
            />
    </div>
  )
}

export default PlatformLogo;