import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const TrendingCarousel = ({ movies }) => {
  return (
    <div className="trending-carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
      >
        {movies.map((movie, index) => (
          <SwiperSlide key={movie.$id}>
            <div className="bg-white rounded-lg overflow-hidden">
              <img src={movie.poster_url} alt={movie.title} className="w-full h-auto object-cover" />
              <p className="text-center font-semibold py-2">#{index + 1}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TrendingCarousel;
