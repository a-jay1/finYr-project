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
import { insertToDB, signUp } from '../actions/operations';

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

    const handleInputChange = (e, fieldName) => {
        setUserForm({...userForm, [fieldName]: e.target.value });
    }

    const handleInsertion = async (userForm) => {
        try {
            // Call the insertToDB function and wait for its completion
            const result = await signUp(userForm);
    
            // Display the result in an alert
            alert("Insertion completed successfully. Result: " + JSON.stringify(result));
            
            // Navigate to the login page after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (error) {
            // Display any errors that occur during insertion
            alert("Error occurred during insertion: " + error.message);
        }
    };

    const handleSignup = () => {
        
        // Call the handleInsertion function with the userForm data
        //Validation checks
        if (!/\S+@\S+\.\S+/.test(userForm.email)) {
            alert("Invalid email format");
            return;
        }
        if (userForm.password.length < 8) {
            alert("Password should be at least 8 characters long");
            return;
        }
        if (userForm.password !== userForm.confirmPassword) {
            alert("Passwords don't match");
            return;
        }

        // If all validations pass, you can proceed with signup
        handleInsertion(userForm);

    }

    return (
        <>
            <div className="md:flex h-screen">
                <LoginBanner />

                <div className="bg-white-50 bg-cover md:pl-[42px] md:w-[50%] content-center">
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

                        <Button variant="orange" btnText="Submit" onClick={handleSignup} classNames="w-full my-5 border-black-50"/>

                        <OrDivider/>

                        <p className="py-3 text-black-100">Already a member?<a className="pl-1 underline" href="/login">Login</a></p>

                        {/* <Button noFill={true} btnText="Create Account" classNames="border w-full border-black-50"/> */}
                    </div>
                </div>
            </div>
        </>
    )
}