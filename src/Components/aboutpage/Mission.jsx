import { Link } from "react-router-dom";

export default function Mission() {
  const arry = [
    {
      title: "Quality Selection",
      dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.Quality Selection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
      more: "View More",
    },
    {
      title: "Exceptional Service",
      dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.Quality Selection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
      more: "View More",
    },
    {
      title: "Set Up Stores",
      dec: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.Quality Selection Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
      more: "Soon",
    },
  ];
  return (
    <>
      <div className="bg-[#F5F5F5] lg:px-39 px-5 lg:py-30 py-10">
        <h2 className="pb-20 text-[34px] font-bold text-center">Our Mission</h2>
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 md:justify-center md:items-center lg:flex-wrap gap-6  ">
          {arry.map((el, index) => {
            return (
              <div
                key={index}
                className={`bg-white p-6 border-[#22222233] border rounded-xl
      ${index === 2 ? "md:col-span-2 md:mx-auto lg:col-span-1 lg:mx-0" : ""}
    `}
              >
                <h2 className="pt-4 pb-2 text-[18px] font-bold">{el.title}</h2>
                <p className=" text-[16px] font-normal text-[#22222280]">
                  {el.dec}
                </p>
                <Link className="flex items-end text-[#D9176C] pt-6">
                  {el.more}

                  {el.more === "View More" ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={22}
                      height={22}
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M13.47 8.53a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 1 1-1.06-1.06l2.72-2.72H6.5a.75.75 0 0 1 0-1.5h9.69z"
                      ></path>
                    </svg>
                  ) : (
                    ""
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
