import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";

const ProductFeatures = () => {
  const mobileFeaturesData = {
    heading: "Placeholder Heading",
    description: "Placeholder Description",
    contents: [
      {
        title: "Placeholder Title",
        content: "Placeholder Content",
        screenshot: "/placeholder-screenshot",
        icon: "/placeholder-icon",
      },
      {
        title: "Placeholder Title",
        content: "Placeholder Content",
        screenshot: "/placeholder-screenshot",
        icon: "/placeholder-icon",
      },
      {
        title: "Placeholder Title",
        content: "Placeholder Content",
        screenshot: "/placeholder-screenshot",
        icon: "/placeholder-icon",
      },
    ],
  };

  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) =>
        prev < mobileFeaturesData.contents.length - 1 ? prev + 1 : 0
      );
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  }, [active]);

  const handleGetStartedClick = () => {
    Router.push("/onboarding");
  };

  return (
    <div className="p-4 md:max-w-[1600px] md:mx-auto pb-5">
      <div className="bg-[#181717] rounded-lg md:rounded-2xl p-1 md:p-[52px] text-white-50">
        <h1 className="text-2xl md:text-4xl text-center font-medium px-3 pt-3 md:py-4">
          {mobileFeaturesData?.heading}
        </h1>
        <p className="text-center max-md:p-3 font-normal max-md:text-[16px] md:text-lg md:pt-4 md:pb-[40px]">
          {mobileFeaturesData?.description}
        </p>
        <div className="md:flex md:justify-between relative">
          <div className="cursor-pointer w-full">
            {mobileFeaturesData?.contents?.map((item, index) => (
              <div
                key={index}
                className={`md:p-6 relative ${
                  index == active
                    ? "transition-all max-md:px-4 max-md:pt-4 bg-[#222121] before:w-full before:h-1 before:absolute before:top-0 before:left-0 before:bg-[linear-gradient(180deg,#F4C05C_0%,#D8A136_100%)] before:animate-timer before:z-[1] after:w-full after:h-1 after:absolute after:top-0 after:left-0 after:bg-white-50"
                    : "bg-[#3E3E3E33] p-4 "
                } ${
                  index < mobileFeaturesData?.contents?.length - 1
                    ? "border-b-[1px] border-[rgba(2,43,80,0.1)]"
                    : "md:border-b-[1px] md:border-[rgba(2,43,80,0.1)]"
                }`}
                onClick={() =>
                  setActive((prev) => (prev != index ? index : prev))
                }
              >
                <div className="flex gap-2">
                  {item?.icon && (
                    <Image
                      src={`/assets/customBullet.svg`}
                      width="30"
                      height="30"
                      alt={"list"}
                      className="self-start flex-shrink-0 md:mt-[-1px] max-md:w-[22px] max-md:h-[22px]"
                    />
                  )}
                  <div className="flex flex-col gap-3">
                    <h1 className="font-medium md:text-xl ">{item?.title}</h1>
                    {index == active && (
                      <p className="text-[#606162]">{item?.content}</p>
                    )}
                    {index == active && (
                      <button
                        onClick={handleGetStartedClick}
                        className="text-lg text-[#FFBD3E] font-medium inline-flex items-center gap-[12px] hover:gap-[24px] transition-all duration-700"
                      >
                        Get Started
                        <Image
                          src={`/assests/right-arrow.svg`}
                          width="16"
                          height="16"
                          alt="image"
                        />
                      </button>
                    )}
                    {index == active && (
                      <Image
                        src={`/assets/dashboard.svg`}
                        width="240"
                        height="240"
                        alt="mobile"
                        className="md:hidden"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="max-md:hidden relative w-full">
            {mobileFeaturesData?.contents?.map(
              (item, index) =>
                index == active && (
                  <Image
                    className="pl-40 h-full w-full"
                    src={`/assets/dashboard.svg`}
                    alt="mobile"
                    layout="fill"
                    key={""}
                  />
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductFeatures;
