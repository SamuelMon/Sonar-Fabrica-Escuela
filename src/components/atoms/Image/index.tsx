import React from "react";
import Image from "next/image";

const Index = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <div className="relative w-[255px] h-[200px]">
      <Image src={src} alt={alt} layout="fill" />
    </div>
  );
};

export default Index;
