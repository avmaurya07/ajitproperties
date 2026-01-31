"use client";
import { useEffect } from "react";

// Helper function to extract YouTube video ID from various URL formats
function getYouTubeVideoId(url) {
  if (!url) return null;

  // Handle different YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
    /youtube\.com\/shorts\/([^&\?\/]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export default function HomeVideoSlider({ videos = [] }) {
  useEffect(() => {
    // Dynamically initialize Swiper only on client side
    const initializeSwiper = async () => {
      if (typeof window !== "undefined") {
        // Wait a bit to ensure DOM is ready
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Check if Swiper is available globally
        if (window.Swiper) {
          // Destroy existing instance if any
          const existingSlider = document.querySelector(".video-reel-slider");
          if (existingSlider && existingSlider.swiper) {
            existingSlider.swiper.destroy(true, true);
          }

          // Initialize new Swiper instance
          new window.Swiper(".video-reel-slider", {
            spaceBetween: 16,
            speed: 800,
            loop: videos.length > 6,
            autoplay:
              videos.length > 6
                ? {
                    delay: 3000,
                    disableOnInteraction: false,
                  }
                : false,
            navigation: {
              nextEl: ".video-slider-next",
              prevEl: ".video-slider-prev",
            },
            breakpoints: {
              1399: {
                slidesPerView: Math.min(6, videos.length),
              },
              1199: {
                slidesPerView: Math.min(5, videos.length),
              },
              991: {
                slidesPerView: Math.min(4, videos.length),
              },
              767: {
                slidesPerView: Math.min(3, videos.length),
              },
              575: {
                slidesPerView: Math.min(2, videos.length),
              },
              0: {
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
      const slider = document.querySelector(".video-reel-slider");
      if (slider && slider.swiper) {
        slider.swiper.destroy(true, true);
      }
    };
  }, [videos]);

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">
          No videos available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div
      className="w-full px-1 sm:px-6 lg:px-8"
      style={{ position: "relative" }}
    >
      <div className="swiper video-reel-slider">
        <div className="swiper-wrapper">
          {videos.map((videoUrl, index) => {
            const videoId = getYouTubeVideoId(videoUrl);

            return (
              <div key={index} className="swiper-slide">
                <div
                  className="reelify--reel-preview-card"
                  style={{
                    borderRadius: "0.5rem",
                    position: "relative",
                    aspectRatio: "9 / 16",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1`}
                      title={`YouTube video ${index + 1}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{
                        width: "100%",
                        height: "100%",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#f3f4f6",
                        borderRadius: "0.5rem",
                      }}
                    >
                      <p className="text-gray-500">Invalid YouTube URL</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Left Navigation Arrow */}
      {videos.length > 1 && (
        <button
          className="video-slider-prev bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
          style={{
            border: "1px solid #e5e7eb",
            position: "absolute",
            left: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          <i className="fa-solid fa-chevron-left text-gray-700"></i>
        </button>
      )}

      {/* Right Navigation Arrow */}
      {videos.length > 1 && (
        <button
          className="video-slider-next bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all"
          style={{
            border: "1px solid #e5e7eb",
            position: "absolute",
            right: "-20px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
          }}
        >
          <i className="fa-solid fa-chevron-right text-gray-700"></i>
        </button>
      )}
    </div>
  );
}
