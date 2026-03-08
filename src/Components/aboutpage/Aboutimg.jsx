
export default function Aboutimg() {
  return (
    <>
      <div className=" w-full lg:h-200 h-100 inset-0">
        <img
          className=" object-cover w-full h-full rotate-180   top-0 "
          src="./public/imglogin.png"
          alt=""
        />
        {/* bg-[#D9176C] */}
        <div className="absolute w-full lg:h-200 h-100 inset-0 bg-[#00000099] flex items-center justify-center ">
          <div className="text-white flex flex-col items-center lg:px-0 px-5">
            <h2 className="lg:text-5xl text-3xl font-bold">About Bookshop</h2>
            <p className="lg:w-150 lg:text-2xl text-center pt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada leo.</p>
          </div>
        </div>
      </div>
    </>
  );
}
