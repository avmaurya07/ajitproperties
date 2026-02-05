"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HomeHeroSection({ heroData }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!heroData?.backgroundImage?.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroData.backgroundImage.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroData?.backgroundImage]);

  if (!heroData) return null;

  return (
    <section
      className="hero-section hero-1 fix pb-5 h-[620px] relative"
      style={{
        backgroundImage: `url(${heroData.backgroundImage[index]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container-fluid">
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
              <div className="form-area absolute bottom-0 left-2.5 w-full pb-6">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
