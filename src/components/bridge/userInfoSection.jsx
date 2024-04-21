import React from 'react'
import Description from '../ui/Description';
import UserInfoCard from '../ui/UserInfoCard';
import content from '../../app/data/welcome.json';

const UserInfoSection = (props) => {
  return (

    <div className='md:my-[96px]'>
      <Description text='Know Their Opinions' classNames='text-xl xs:text-2xl font-bold leading-9 tracking-normal text-center pt-7 text-black px-10' />
      <div className='flex gap-3 p-3 max-md:overflow-x-scroll no-scrollbar snap-x max-md:max-w-screen md:justify-center md:max-w-[1600px] mx-auto'>
        {content?.personInfo?.map((item,index)=>{
          return(<UserInfoCard key={index} source={item?.source} name={item?.name} role={item?.role} description={item?.description} />) 
        })}
      </div>
    </div>
  )
}

export default UserInfoSection;