import Image from "next/image";
import React from "react";
import Description from "./Description";

const UserInfoCard = ({
  source = "",
  name = "",
  role = "",
  description = "",
}) => {
  return (
      <div className="max-md:min-w-[80%] border-[1px] border-[#F0F1F3] shadow-md rounded m-4  p-4">
        <div className="flex gap-1 p-2">
          <Image src={source} alt={"profile"} height={42} width={42} />
          <div className="flex flex-col items-start">
            <Description text={name} classNames="text-[16px] font-bold" />
            <Description text={role} classNames="text-[12px] text-[#606162]" />
          </div>
        </div>
        <Description
          text={description}
          classNames="text-[#606162] text-[14px]"
        />
      </div>
  );
};

export default UserInfoCard;
