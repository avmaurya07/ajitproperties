"use client";
import { useEffect } from "react";
import PropertyCard from "./PropertyCard";

export default function FeaturedPropertiesSlider({ properties }) {
  useEffect(() => {
    // Dynamically import Swiper only on client side
    const initializeSwiper = async () => {
      if (typeof window !== "undefined") {
        // Wait a bit to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check if Swiper is available globally
        if (window.Swiper) {
          // Destroy existing instance if any
          const existingSlider = document.querySelector(".project-slider");
          if (existingSlider && existingSlider.swiper) {
            existingSlider.swiper.destroy(true, true);
          }

          // Initialize new Swiper instance
          new window.Swiper(".project-slider", {
            spaceBetween: 30,
            speed: 1300,
            loop: properties.length > 5, // Only loop if we have enough slides
            autoplay:
              properties.length > 5
                ? {
                    delay: 2000,
                    disableOnInteraction: false,
                  }
                : false,
            navigation: {
              nextEl: ".array-prev",
              prevEl: ".array-next",
            },
            breakpoints: {
              1399: {
                slidesPerView: Math.min(5, properties.length),
              },
              1199: {
                slidesPerView: Math.min(4, properties.length),
              },
              991: {
                slidesPerView: Math.min(3, properties.length),
              },
              767: {
                slidesPerView: Math.min(2, properties.length),
              },
              575: {
                slidesPerView: Math.min(2, properties.length),
              },
              400: {
                slidesPerView: 1,
              },
            },
          });
        }
      }
    };

    initializeSwiper();

    // Cleanup function
    return () => {
      const slider = document.querySelector(".project-slider");
      if (slider && slider.swiper) {
        slider.swiper.destroy(true, true);
      }
    };
  }, [properties]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <div className="swiper project-slider">
        <div className="swiper-wrapper">
          {properties.length > 0 ? (
            properties.map((property) => (
              <div key={property._id} className="swiper-slide">
                <div className="px-2 md:px-3">
                  <PropertyCard property={property} isSlider={true} />
                </div>
              </div>
            ))
          ) : (
            <div className="swiper-slide">
              <div className="w-full text-center py-12">
                <p className="text-gray-600 text-lg">
                  No featured properties available at the moment.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
