'use client';

import Link from "next/link";
import Header from './header'
import Image from "next/image";
import bg from "../assets/9117392.jpg"

export default function Home() {

  return (
    <div>
      {/* <div className="fixed h-screen w-screen">
        <Image
          src={bg}
          alt="bg"
          className=" w-screen h-screen"
        />
      </div> */}
      <div className="flex min-h-screen flex-col items-center justify-between gap-[150px] p-10 z-[99]">
        <Header />
      </div>
    </div>
  );
}
