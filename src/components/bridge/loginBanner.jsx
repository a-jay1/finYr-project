import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import Description from '../ui/Description'

const LoginBanner = () => {
  return (
    <div className={twMerge(`hidden px-[54px] pt-[82px] w-[45%] h-screen bg-cover md:block`)} style={{backgroundImage: `url('/assets/medical/image3.svg')`}}>
        {/* <Image src={'/assets/image 33.svg'} alt="logo" height={42} width={147} />
        <Description text="Welcome to Copyva" classNames="text-white-50 pt-[60px] pb-[14px] text-[32px] font-semibold leading-[48px]" containerClass="text-start" />
        <Description text="Your one-stop destination to buy & sell licence" classNames="text-white-50 text-[22px] font-normal leading-8" containerClass="text-start"/> */}
    </div>
  )
}

export default LoginBanner