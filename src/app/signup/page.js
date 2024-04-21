"use client"
import { twMerge } from 'tailwind-merge';
import Button from "@/components/ui/Button";
import OrDivider from "@/components/ui/OrDivider";
import TextField from "@/components/ui/TextField";
import Image from "next/image";
import { useState } from "react";
import data from "../../app/data/checkIn.json";
import LoginBanner from "@/components/bridge/loginBanner";
import { useRouter } from 'next/navigation';

export default function Page() {

    const router = new useRouter();

    const navigate = (pageUrl) => {
        router.push(pageUrl);
      }

    const [userForm, setUserForm] = useState({
        email: "",
        fullName: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (props) => {
        console.log({...props});
    }

    return (
        <>
            <div className="md:flex">
                <LoginBanner />

                <div className="bg-white-50 bg-cover md:pl-[42px] md:w-full w-[50%] content-center">
                    <div className={twMerge(`md:hidden`)}>
                        <div className="flex gap-7 px-5 py-4 items-center">
                            <Image src={'assets/search.svg'} alt="Icon" height={18} width={16} />

                            <p className="text-base font-medium">Create Account</p>
                        </div>
                        <div className="border-b border-black opacity-15"></div>
                    </div>
                    <div className="px-5 pt-5 md:w-[50%]">
                    <div>
                        <p className="font-semibold text-lg mt:pt-[82px]">Create Account</p>
                    </div>
                        {
                            data?.signup?.map((item, key) => (
                                <TextField 
                                  key={key} 
                                  label={item.label} 
                                  value={userForm[item.field]} 
                                  onChange={(e) => handleInputChange(e, item.field)} 
                                  placeholder={item.placeholder} 
                                  type={item.type} 
                                  required={item.required} 
                                />
                              ))
                        }

                        <Button variant="orange" btnText="Submit" classNames="w-full my-5 border-black-50"/>

                        <OrDivider/>

                        <p className="py-3 text-black-100">Already a member?<a className="pl-1 underline" href="/login">Login</a></p>

                        <Button noFill={true} btnText="Create Account" classNames="border w-full border-black-50"/>
                    </div>
                </div>
            </div>
        </>
    )
}