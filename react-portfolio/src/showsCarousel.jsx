import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PodcastCard from "./PodcastCards.jsx"
import "./index.css"
import React from "react";

export default function ShowsCarousel({ podcasts }) {

    var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    };
    
    return (
    <>
        <Slider {...settings}>
            {podcasts.map((podcast) => (
            <div className="carousel" key={podcast.id}>
                
                    <PodcastCard
                        id={podcast.id}
                        image={podcast.image}
                        title={podcast.title}
                        seasons={podcast.seasons}
                        updated={podcast.updated}
                        genres={podcast.genres}
                    />
                
            </div>
            ))}
        </Slider>    
    </>
    )
            
}