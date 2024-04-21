import Image from "next/image";

const Card = ({ source = "", text = "", description }) => {
  return (
    <>
      <div className="rounded-lg bg-white-50 flex-col py-4 px-3 text-[14px] font-semibold leading-6 md:py-8">
        <Image
          className=""
          src={source}
          alt="Card Image"
          height={42}
          width={42}
        />
        <div className="flex justify-between">
          <div className="">
            <p className="text-xs xs:text-base">{text}</p>
            <p className="hidden md:block">{description}</p>
          </div>
          <Image
            src={"/assets/Vector.svg"}
            alt="Card Image"
            height={10}
            width={5}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
