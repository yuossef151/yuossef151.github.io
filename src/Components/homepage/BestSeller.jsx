import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { NavLink } from "react-router-dom";

export default function BestSeller({ bookData }) {
  return (
    <>
      <div className="bg-[#3B2F4A] py-30">
        <div className="text-white   px-5 flex flex-col items-center text-center pb-10">
          <h3 className="lg:text-[26px] text-[20px] font-bold pb-2">
            Best Seller
          </h3>
          <p className="lg:text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
            ultricies est. Aliquam in justo varius, sagittis neque ut, malesuada
            leo.
          </p>
        </div>
        {/* <Swiper
          slidesPerView={6}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={3000}
          modules={[Autoplay]}
          className="mySwiper"
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 6 },
          }}
        >
          {bookData?.best_selling_image?.length < 1
            ? books.map((book, index) => (
                <SwiperSlide
                  key={index}
                  className="!flex justify-center items-center "
                >
                  <img
                    className="rounded-2xl object-cover w-full h-full px-2"
                    src={`/${book}.png`}
                    alt={book}
                    loading="lazy"
                  />
                </SwiperSlide>
              ))
            : bookData?.best_selling_image?.map((book, index) => (
                <SwiperSlide
                  key={index}
                  className="!flex justify-center items-center !w-[25%]"
                >
                  <div className="w-60 h-70 flex justify-center items-center">
                    <img
                      src={book}
                      className="w-full h-full object-cover rounded-2xl"
                      alt=""
                    />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper> */}

        <div className="overflow-hidden bg-[#3B2F4A] py-10">
          <div className="flex w-max animate-scroll gap-6">
            {bookData?.best_selling_image?.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-60 h-70 object-cover rounded-2xl shrink-0"
              />
            ))}

            {/* duplicate for infinite effect */}
            {bookData?.best_selling_image?.map((img, i) => (
              <img
                key={`dup-${i}`}
                src={img}
                className="w-60 h-70 object-cover rounded-2xl shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <NavLink
            to={"/Books"}
            onClick={() => {}}
            className="bg-[#D9176C] mybtn  text-white py-3 px-10 rounded-[10px] text-[16px] font-semibold"
          >
            Shop now
          </NavLink>
        </div>
      </div>
    </>
  );
}
