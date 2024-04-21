"use client";
import Chatbot from "@/components/bridge/chatbot";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = new useRouter();

  const navigate = (pageUrl) => {
    router.push(pageUrl);
  }
  return (
    <>
      <div className="h-screen w-full bg-cover bg-center md:block welcome-bg">
        <div className="flex justify-end">
          <p className="row justify-end text-5xl font-extrabold font-fantasy tracking-widest text-zinc-50 pt-4">Need Help ?</p>
        </div>
        <div className="h-screen w-full content-center bg-cover bg-center">
          <div className="flex justify-center gap-4">
            <Button btnText="Login" onClick={() => navigate('/login')} variant="yellow" />
            <Button btnText="Guest" onClick={() => navigate('/chatbot')} variant="yellow" />
          </div>
        </div>
      </div>
    </>
  );
}
