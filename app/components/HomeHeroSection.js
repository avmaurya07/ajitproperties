"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeHeroSection({ heroData }) {
  const [index, setIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    if (!heroData?.backgroundImage?.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroData.backgroundImage.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroData?.backgroundImage, index]);

  // Manual Controls
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % heroData.backgroundImage.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? heroData.backgroundImage.length - 1 : prev - 1,
    );
  };

  const goToSlide = (i) => {
    setIndex(i);
  };

  if (!heroData) return null;

  return (
    <section className="hero-section hero-1 fix pb-5 h-[620px] relative overflow-hidden">
      {/* Background Slides */}
      <div
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      >
        {heroData.backgroundImage.map((img, i) => (
          <div
            key={i}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all duration-300 group"
        style={{ zIndex: 20 }}
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 group-hover:scale-110 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all duration-300 group"
        style={{ zIndex: 20 }}
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 group-hover:scale-110 transition-transform"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dots Pagination - Improved */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex gap-2"
        style={{ bottom: "32px", zIndex: 20 }}
      >
        {heroData.backgroundImage.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="group"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`rounded-full transition-all duration-300 ${
                i === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 group-hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>

      <div
        className="container-fluid"
        style={{ position: "relative", zIndex: 10 }}
      >
        <div className="row g-4 align-items-center">
          <div className="col-xl-7">
            <div className="hero-content">
              <h5 className="wow fadeInUp">
                {heroData.subtitle && <i className="flaticon-home"></i>}{" "}
                {heroData.subtitle}
              </h5>
              <h1 className="wow fadeInUp" data-wow-delay=".2s">
                {heroData.title.split("<br />").map((line, index) => (
                  <span key={index}>
                    {line}
                    {index < heroData.title.split("<br />").length - 1 && (
                      <br />
                    )}
                  </span>
                ))}
              </h1>
              <p className="wow fadeInUp" data-wow-delay=".4s">
                {heroData.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="form-area w-full b-1 absolute left-0 bottom-6 px-4"
        style={{ zIndex: 15 }}
      >
        <ul className="nav">
          {heroData.searchCategories.map((category, index) => (
            <li
              key={index}
              className="nav-item wow fadeInUp"
              data-wow-delay={`${0.2 + index * 0.2}s`}
            >
              <a
                href={`#${category.name.replace(/\s+/g, "-")}`}
                data-bs-toggle="tab"
                className={`nav-link ${index === 0 ? "active" : ""}`}
              >
                {category.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="tab-content max-w-2xl ml-0">
          {heroData.searchCategories.map((category, index) => (
            <div
              key={index}
              id={category.name.replace(/\s+/g, "-")}
              className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
            >
              <form
                action={`/properties/${category.value}`}
                method="get"
                className="wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="row g-4 align-items-center justify-content-between">
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="form-item">
                      <h6>Location</h6>
                      <input
                        type="text"
                        name="location"
                        placeholder="Looking For?"
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="form-item">
                      <h6>Bedrooms</h6>
                      <input
                        type="number"
                        name="bedrooms"
                        placeholder="Min Bedrooms"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="form-item">
                      <h6>Bathrooms</h6>
                      <input
                        type="number"
                        name="bathrooms"
                        placeholder="Min Baths"
                        min="0"
                      />
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                    <div className="form-item text-align-right">
                      <button type="submit" className="theme-btn">
                        Search{" "}
                        {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
              <div className="button-list">
                {(heroData?.buttonLinks || []).map((link, idx) => (
                  <Link
                    key={idx}
                    href={link.url}
                    className="theme-btn wow fadeInUp"
                    data-wow-delay={`${0.2 + idx * 0.2}s`}
                  >
                    {link.text} <i className={link.icon}></i>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
