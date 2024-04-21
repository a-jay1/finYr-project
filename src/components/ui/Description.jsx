import Image from "next/image";
import { twMerge } from "tailwind-merge";

const Description = ({ text = "", classNames = "" ,containerClass = "text-center"}) => {
  return (
    <>
      <div className={twMerge(`${containerClass}`)}>
        <div className={classNames}>{text}</div>
      </div>
    </>
  );
};

export default Description;
