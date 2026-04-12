import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";

export default function BestSeller() {
  const books = [
    "book-1",
    "book-2",
    "book-3",
    "book-4",
    "book-5",
    "book-6",
    "book-7",
  ];
  return (
    <>
      <div className="bg-[#3B2F4A] py-30">
        <div className="text-white   px-5 flex flex-col items-center text-center pb-10">
          <h3 className="lg:text-[26px] text-[20px] font-bold pb-2">Best Seller</h3>
          <p className="lg:text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            392: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 6,
            },
          }}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          navigation={true}
          speed={2000}
          modules={[Autoplay]}
          className="mySwiper"
        >
          {books.map((book , index) => (
            <SwiperSlide key={index} className="rounded-2xl overflow-hidden ">
              <img
                className="rounded-2xl"
                src={`/${book}.png`}
                alt={book}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-center pt-10">
          <NavLink to={"/Books"}
            onClick={() => {
              
            }}
            className="bg-[#D9176C] mybtn  text-white py-3 px-10 rounded-[10px] text-[16px] font-semibold"
          >
            Shop now
          </NavLink>
        </div>
      </div>
    </>
  );
}
