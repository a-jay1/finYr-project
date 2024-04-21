'use client';

import Button from '@/components/ui/Button';
import OrDivider from '@/components/ui/OrDivider';
import TextField from '@/components/ui/TextField';
import Image from 'next/image';
import { useState } from 'react';
import data from '../../app/data/checkIn.json';
import { twMerge } from 'tailwind-merge';
import Description from '@/components/ui/Description';
import LoginBanner from '@/components/bridge/loginBanner';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = new useRouter();

  const navigate = (pageUrl) => {
    router.push(pageUrl);
  }

  return (
    <>
      <div className="md:flex">
        <LoginBanner />

        <div className="bg-white-50 bg-cover md:pl-[42px] md:w-full w-[50%] content-center">
            <div className={twMerge(`md:hidden`)}>
                <div className="flex gap-7 px-5 py-4 items-center">
                    <Image src={'assets/search.svg'} alt="Icon" height={18} width={16} />

                    <p className="text-base font-medium">Login</p>
                </div>
                <div className="border-b border-black opacity-15"></div>
            </div>
          <div className="px-5 pt-5 md:w-[50%]">
            <div>
              <p className="font-semibold text-lg mt:pt-[82px]">Login</p>
            </div>

            {data?.login?.map((item, key) => {
              return (
                <TextField
                  key={key}
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type}
                  required={item.required}
                />
              );
            })}

            <p className="font-normal text-xs pt-3">Forgot password?</p>

            <Button variant="orange" onClick={() => navigate('/chatbot')} btnText="Login" classNames="w-full my-5 border-black-50" />

            {/* <Button
              noFill={true}
              btnText="Continue with google"
              imageSrc="/assets/google.svg"
              classNames="border w-full border-black-50"
            /> */}

            <OrDivider className="" />

            <p className="py-3 text-black-100">
              Not a member?<a className="pl-1 underline" href='/signup'>sign up</a>
            </p>

            <Button noFill={true} btnText="Create your account" classNames="border w-full border-black-50" />
          </div>
        </div>
      </div>
    </>
  );
}
