"use client";
import CardContainer from "@/components/bridge/cardContainer";
import Header from "@/components/bridge/header";
import PlatformSection from "@/components/bridge/platformSection";
import ProductFeatures from "@/components/bridge/productFeatures";
import Button from "@/components/ui/Button";
import Description from "@/components/ui/Description";
import SearchBar from "@/components/ui/SearchBar";
import { useRouter } from "next/navigation";

import content from "../data/welcome.json";
import data from "../data/footer.json";
import UserInfoSection from "@/components/bridge/userInfoSection";
import Footer from "@/components/bridge/footer";

export default function Page(props) {
  const router = useRouter();
console.log(props);
  return (
    <div className="bg-white-50">
      <div
        className="h-[430px] md:h-[545px] bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/Frame 2.svg')` }}
      >
        <Header click={() => router.push("/")} />  

        <Description
          text="Enjoy Your Creative Freedom With Copyva"
          classNames="text-white-50 text-xl font-bold leading-9 tracking-normal text-center pt-6 xxs:text-2xl md:pt-25 px-10 md:text-[42px]"
        />
        <Description
          text="Buy the license of others’ content/ music to enhance your creation while avoiding copyright violations with Copyva. Unlock possibilities for your original creation by selling its license."
          classNames="text-sm md:text-lg py-4 px-6 font-normal leading-5 tracking-normal md:container md:max-w-[60rem] md:mx-auto text-center text-white-50"
        />

        <SearchBar classNames="mt-4" placeHolder="Search by code" />
      </div>

      <CardContainer />

      <PlatformSection/>

      <ProductFeatures />

      <UserInfoSection />

      <Footer {...data}/>
    </div>
  );
}
