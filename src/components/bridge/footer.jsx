import Image from "next/image";
import React from "react";
import SearchBar from "../ui/SearchBar";

const Footer = (data) => {
  const { footertext, socialmedialogos, privacytext,copyright } = data;
  return (
    <div className="bg-[#181717] text-white md:px-[96px] md:py-[32px]">
      <div className="flex justify-between mb-4 p-5 pb-0 md:mb-6">
        <Image src={"/assets/image 33.svg"} alt="img" width={67} height={19} />
        <div className="hidden md:!block">

       <div className="flex gap-12">
        {footertext.map((text, index) => (
          <p className="text-white-50 text-[12px]" key={index}>
            {text}
          </p>
        ))}
      </div>
        </div>
        <div className="flex gap-2">
          {socialmedialogos.map((item, index) => (
            <Image key={index} src={item} alt="img" width={16} height={16} />
          ))}
        </div>
      </div>
      <div className="flex justify-evenly md:!hidden">
        {footertext.map((text, index) => (
          <p className="text-white-50 text-[12px]" key={index}>
            {text}
          </p>
        ))}
      </div>
      <hr className=" border-[1px] border-[#606162] my-4"></hr>
      <SearchBar placeHolder="Check license number " />
      <div className="md:flex md:justify-between md:items-center">

      <div className="flex justify-evenly md:gap-4 md:px-5">
        {privacytext.map((content, index) => (
          <p className="text-white-50 text-[9px] my-4 md:text-[12px]"key={index}>
            {content}
          </p>
        ))}
      </div>
      <p className="text-white-50 text-[8px] pb-5 text-center md:pb-0 md:text-[12px]">{copyright}</p>
      </div>
    </div>
  );
};

export default Footer;
