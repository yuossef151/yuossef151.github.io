import React from "react";

export default function Feature() {
  const arry = [
    {
      img: "/img-1.png",
      title: "Fast & Reliable Shipping",
      dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
    {
      img: "/img-2.png",
      title: "Secure Payment",
      dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
    {
      img: "/img-3.png",
      title: "Easy Returns",
      dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
    {
      img: "/img-4.png",
      title: "24/7 Customer Support",
      dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.",
    },
  ];
  return (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 sm:max-md:grid sm:max-md:grid-cols-2 lg:flex-row lg:grid lg:grid-cols-4 py-30 lg:px-5 px-5 gap-15.5 lg:gap-5 bg-[#F5F5F5]">
        {arry.map((el, index) => {
          return (
            <div key={index} className="">
              <img src={el.img} alt="" />
              <h2 className="pt-4 pb-2 text-[18px] font-bold">{el.title}</h2>
              <p className=" text-[16px] font-normal text-[#22222280]">
                {el.dec}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
}
