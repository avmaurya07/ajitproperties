"use client";
import { useState } from "react";
import Image from "next/image";
import VideoPlayer from "./VideoPlayer";

export default function MediaGallery({
  images = [],
  videos = [],
  propertyName,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const allMedia = [
    ...images.map((img) => ({ type: "image", src: img })),
    ...videos.map((vid) => ({ type: "video", src: vid })),
  ];

  const openGallery = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeGallery = () => {
    setIsOpen(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % allMedia.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + allMedia.length) % allMedia.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
  };

  return (
    <>
      {images.length > 0 ? (
        <>
          <div className="details-image" onClick={() => openGallery(0)}>
            <div className="relative h-96 w-full cursor-pointer">
              <Image
                src={images[0]}
                alt={propertyName}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>

          {(images.length > 1 || videos.length > 0) && (
            <div className="mt-3 flex flex-row gap-1 md:gap-1 row">
              {/* Show second image if exists */}
              {images[1] && (
                <div className="flex-1 min-w-0 col-xl-4 col-lg-6 col-md-6">
                  <div className="details-image" onClick={() => openGallery(1)}>
                    <div className="relative h-48 w-full cursor-pointer">
                      <Image
                        src={images[1]}
                        alt={`${propertyName} - 2`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* Show third image or video slot as +x overlay if more media */}
              {(images.length > 2 || videos.length > 0) && (
                <div className="flex-1 min-w-0 col-xl-4 col-lg-6 col-md-6">
                  <div className="details-image" onClick={() => openGallery(2)}>
                    <div className="relative h-48 w-full cursor-pointer">
                      {images[2] ? (
                        <Image
                          src={images[2]}
                          alt={`${propertyName} - 3`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="relative h-48 w-full">
                          <VideoPlayer
                            src={videos[0]}
                            className="w-full h-full rounded-lg object-cover"
                          />
                        </div>
                      )}
                      {/* Overlay for +x */}
                      {images.length + videos.length > 3 && (
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center rounded-lg">
                          <span className="text-white text-3xl font-bold select-none">
                            +{images.length + videos.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      ) : videos.length > 0 ? (
        <>
          <div className="details-image" onClick={() => openGallery(0)}>
            <div className="relative h-96 w-full cursor-pointer">
              <VideoPlayer
                src={videos[0]}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          </div>

          {videos.length > 1 && (
            <div className="row g-4 mt-3">
              {videos.slice(1).map((video, idx) => (
                <div key={`vid-${idx}`} className="col-xl-4 col-lg-6 col-md-6">
                  <div
                    className="details-image"
                    onClick={() => openGallery(idx + 1)}
                  >
                    <div className="relative h-48 w-full cursor-pointer">
                      <VideoPlayer
                        src={video}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="details-image">
          <div className="relative h-96 w-full">
            <Image
              src="/assets/img/home-1/project/project-01.jpg"
              alt="Default property"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 backdrop-blur-xl bg-white/30 flex items-center justify-center transition-opacity duration-300"
          style={{ zIndex: 2147483647 }}
          onClick={closeGallery}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {allMedia.length > 1 && (
            <>
              <button
                className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 text-4xl transition-all duration-200 hover:scale-110 z-[2147483647] shadow-xl border-2 border-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrev();
                }}
                aria-label="Previous"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 text-4xl transition-all duration-200 hover:scale-110 z-[2147483647] shadow-xl border-2 border-gray-300"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next"
              >
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          <div
            className="flex items-center justify-center w-screen h-screen"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-5xl max-h-[70vh] w-full h-full flex items-center justify-center transition-all duration-300 ease-in-out">
              <button
                className="absolute top-2 right-2 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white text-gray-900 text-2xl transition-all duration-200 hover:rotate-90 z-[2147483647] shadow-xl border-2 border-gray-300"
                onClick={closeGallery}
                aria-label="Close gallery"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6l12 12M6 18L18 6"
                  />
                </svg>
              </button>
              {allMedia[currentIndex]?.type === "image" ? (
                <div className="relative w-full h-full">
                  <Image
                    src={allMedia[currentIndex].src}
                    alt={`${propertyName} - ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <VideoPlayer
                  src={allMedia[currentIndex].src}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-50">
            <div className="bg-gray-900/80 px-6 py-3 rounded-full text-white font-semibold shadow-xl border-2 border-white/60 text-lg tracking-wide">
              {currentIndex + 1} <span className="opacity-60">/</span>{" "}
              {allMedia.length}
            </div>

            <div className="flex gap-2 max-w-4xl overflow-x-auto px-4 pb-2 scrollbar-hide">
              {allMedia.map((media, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(idx);
                  }}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
                    idx === currentIndex
                      ? "ring-4 ring-white scale-110"
                      : "ring-2 ring-white/30 hover:ring-white/60 opacity-70 hover:opacity-100"
                  }`}
                >
                  {media.type === "image" ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={media.src}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full bg-gray-800 flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <style jsx>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </div>
      )}
    </>
  );
}
