import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import BookCard from "../BookCard/BookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default function RecentlyAdded() {
    const [Data, setData] = useState();

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:8081/api/v1/get-recent-book"
            );
            setData(response.data.data);
        }
        fetch();
    }, []);

    return (
        <div className="mt-8 px-4">
            <h1 className="text-3xl text-zinc-700 font-medium">Recently added</h1>
            {!Data && (<div className="flex justify-center items-center my-8"><Loader /></div>)}
            
            <div className="my-8">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={5}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {Data && Data.map((items, i) => (
                        <SwiperSlide key={i}>
                            <div className="w-[40vh]">
                                <BookCard data={items} />{""}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}