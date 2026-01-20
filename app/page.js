import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PropertyCard from "@/app/components/PropertyCard";
import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ajit Properties - Real Estate Properties",
  description: "Find your dream property with Ajit Properties",
};

async function getFeaturedProperties() {
  try {
    await connectDB();

    const properties = await Property.find({ featured: true, available: true })
      .limit(10)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    console.log("Fetched properties:", properties.length);

    return properties.map((property) => ({
      _id: property._id.toString(),
      slug: property.slug,
      name: property.name,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      images: property.images || [],
      available: property.available,
      createdBy: property.createdBy.toString(),
      createdAt: property.createdAt.toISOString(),
      updatedAt: property.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();

  console.log("Featured properties count:", featuredProperties.length);

  return (
    <>
      <Header />

      <section className="hero-section hero-1 fix">
        <div className="container-fluid">
          <div className="row g-4 align-items-center">
            <div className="col-xl-7">
              <div className="hero-content">
                <h5 className="wow fadeInUp">
                  <i className="flaticon-home"></i> SEARCH SMART. LIVE SMART
                </h5>
                <h1 className="wow fadeInUp" data-wow-delay=".2s">
                  Find Your Dream <br /> Property With Us
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".4s">
                  Discover the perfect home that fits your lifestyle and budget.
                  Browse our exclusive listings and find your ideal property
                  today.
                </p>
                <div className="form-area">
                  <ul className="nav">
                    <li className="nav-item wow fadeInUp" data-wow-delay=".2s">
                      <a
                        href="#General"
                        data-bs-toggle="tab"
                        className="nav-link active"
                      >
                        General
                      </a>
                    </li>
                    <li className="nav-item wow fadeInUp" data-wow-delay=".4s">
                      <a
                        href="#Villa"
                        data-bs-toggle="tab"
                        className="nav-link"
                      >
                        Villa
                      </a>
                    </li>
                    <li className="nav-item wow fadeInUp" data-wow-delay=".6s">
                      <a
                        href="#Apartment"
                        data-bs-toggle="tab"
                        className="nav-link"
                      >
                        Apartment
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div id="General" className="tab-pane fade show active">
                      <form
                        action="#"
                        className="wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        <div className="row g-4 align-items-center justify-content-between">
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Keyword</h6>
                              <input type="text" placeholder="Looking For?" />
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Category</h6>
                              <div className="form">
                                <select className="single-select w-100">
                                  <option>Select Category</option>
                                  <option>Property management</option>
                                  <option>Market analysis</option>
                                  <option>Home interior</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Location</h6>
                              <div className="form">
                                <select className="single-select w-100">
                                  <option>Select Location</option>
                                  <option>England</option>
                                  <option>Americans</option>
                                  <option>Brazil</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item text-align-right">
                              <button type="submit" className="theme-btn">
                                Search{" "}
                                <i className="fa-solid fa-magnifying-glass"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="button-list">
                        <Link
                          href="/properties"
                          className="theme-btn wow fadeInUp"
                          data-wow-delay=".2s"
                        >
                          Commercial <i className="flaticon-right-arrow"></i>
                        </Link>
                        <Link
                          href="/properties"
                          className="theme-btn wow fadeInUp"
                          data-wow-delay=".4s"
                        >
                          Villa <i className="flaticon-right-arrow"></i>
                        </Link>
                        <Link
                          href="/properties"
                          className="theme-btn wow fadeInUp"
                          data-wow-delay=".6s"
                        >
                          Sales <i className="flaticon-right-arrow"></i>
                        </Link>
                      </div>
                    </div>
                    <div id="Villa" className="tab-pane fade">
                      <form action="#">
                        <div className="row g-4 align-items-center justify-content-between">
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Keyword</h6>
                              <input type="text" placeholder="Looking For?" />
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Category</h6>
                              <div className="form">
                                <select className="single-select w-100">
                                  <option>Select Category</option>
                                  <option>Property management</option>
                                  <option>Market analysis</option>
                                  <option>Home interior</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Location</h6>
                              <div className="form">
                                <select className="single-select w-100">
                                  <option>Select Location</option>
                                  <option>England</option>
                                  <option>Americans</option>
                                  <option>Brazil</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item text-align-right">
                              <button type="submit" className="theme-btn">
                                Search{" "}
                                <i className="fa-solid fa-magnifying-glass"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="button-list">
                        <a href="#" className="theme-btn">
                          Commercial <i className="flaticon-right-arrow"></i>
                        </a>
                        <a href="#" className="theme-btn">
                          Villa <i className="flaticon-right-arrow"></i>
                        </a>
                        <a href="#" className="theme-btn">
                          Sales <i className="flaticon-right-arrow"></i>
                        </a>
                      </div>
                    </div>
                    <div id="Apartment" className="tab-pane fade">
                      <form action="#">
                        <div className="row g-4 align-items-center justify-content-between">
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Keyword</h6>
                              <input type="text" placeholder="Looking For?" />
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Category</h6>
                              <div className="form">
                                <select className="single-select w-100">
                                  <option>Select Category</option>
                                  <option>Property management</option>
                                  <option>Market analysis</option>
                                  <option>Home interior</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item">
                              <h6>Location</h6>
                              <div className="form">
                                <select className="single-select w-100">
                                  <option>Select Location</option>
                                  <option>England</option>
                                  <option>Americans</option>
                                  <option>Brazil</option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                            <div className="form-item text-align-right">
                              <button type="submit" className="theme-btn">
                                Search{" "}
                                <i className="fa-solid fa-magnifying-glass"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <div className="button-list">
                        <a href="#" className="theme-btn">
                          Commercial <i className="flaticon-right-arrow"></i>
                        </a>
                        <a href="#" className="theme-btn">
                          Villa <i className="flaticon-right-arrow"></i>
                        </a>
                        <a href="#" className="theme-btn">
                          Sales <i className="flaticon-right-arrow"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="hero-image">
                <Image
                  src="/assets/img/home/banner.jpeg"
                  alt="img"
                  width={800}
                  height={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="project-section fix section-padding">
        <div className="container">
          <div className="section-title text-center">
            <h5 className="wow fadeInUp" style={{ textTransform: "uppercase" }}>
              <i className="flaticon-home"></i> Recently{" "}
              <i className="flaticon-home"></i>
            </h5>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Works Videos
            </h2>
          </div>
        </div>
        <div className="project-wrapper">
          <div className="swiper project-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="project-box-items style-margin">
                  <div
                    className="project-thumb"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: "12px",
                      }}
                    >
                      <video
                        src="/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        controls
                        playsInline
                      ></video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="project-box-items">
                  <div
                    className="project-thumb"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: "12px",
                      }}
                    >
                      <video
                        src="/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        controls
                        playsInline
                      ></video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="project-box-items style-margin">
                  <div
                    className="project-thumb"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: "12px",
                      }}
                    >
                      <video
                        src="/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        controls
                        playsInline
                      ></video>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="project-box-items">
                  <div
                    className="project-thumb"
                    style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                  >
                    <div
                      style={{
                        position: "relative",
                        paddingBottom: "56.25%",
                        height: 0,
                        overflow: "hidden",
                        borderRadius: "12px",
                      }}
                    >
                      <video
                        src="/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        controls
                        playsInline
                      ></video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="house-offer-section fix section-padding section-bg">
        <div className="container">
          <div className="section-title text-center">
            <h5 className="wow fadeInUp">
              <i className="flaticon-home"></i> HOUSE HIGHLIGHTS{" "}
              <i className="flaticon-home"></i>
            </h5>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              What This House Offers
            </h2>
          </div>
          <div className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1">
            <div className="col wow fadeInUp">
              <div className="house-offer-box">
                <div className="icon">
                  <i className="flaticon-warehouse"></i>
                </div>
                <div className="content">
                  <h4>Warehouse</h4>
                  <p>6 Properties</p>
                </div>
              </div>
            </div>
            <div className="col wow fadeInUp" data-wow-delay=".2s">
              <div className="house-offer-box">
                <div className="icon">
                  <i className="flaticon-villa"></i>
                </div>
                <div className="content">
                  <h4>Villa</h4>
                  <p>6 Properties</p>
                </div>
              </div>
            </div>
            <div className="col wow fadeInUp" data-wow-delay=".4s">
              <div className="house-offer-box">
                <div className="icon">
                  <i className="flaticon-apartment"></i>
                </div>
                <div className="content">
                  <h4>Apartment</h4>
                  <p>6 Properties</p>
                </div>
              </div>
            </div>
            <div className="col wow fadeInUp" data-wow-delay=".6s">
              <div className="house-offer-box">
                <div className="icon">
                  <i className="flaticon-home-1"></i>
                </div>
                <div className="content">
                  <h4>Homestay</h4>
                  <p>6 Properties</p>
                </div>
              </div>
            </div>
            <div className="col wow fadeInUp" data-wow-delay=".8s">
              <div className="house-offer-box">
                <div className="icon">
                  <i className="flaticon-store"></i>
                </div>
                <div className="content">
                  <h4>Commercial</h4>
                  <p>6 Properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h5 className="text-lg font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              <i className="flaticon-home mr-2"></i> OUR PROJECT
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              The Cityscape Collection
            </h2>
          </div>
        </div>
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="swiper project-slider">
            <div className="swiper-wrapper">
              {featuredProperties.length > 0 ? (
                featuredProperties.map((property) => (
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
      </section>

      <section className="about-section fix section-bg section-padding pt-0">
        <div className="right-shape">
          <Image
            src="/assets/img/home-1/about/right-shape.png"
            alt="img"
            width={400}
            height={400}
          />
        </div>
        <div className="container">
          <div className="about-wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                <div className="about-image">
                  <Image
                    src="/assets/img/home/about.jpeg"
                    alt="img"
                    width={600}
                    height={700}
                  />
                  <div className="about-image-2">
                    <Image
                      src="/assets/img/home-1/about/about-02.png"
                      alt="img"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="counter-box">
                    <h2>
                      <span className="count">697</span>k+
                    </h2>
                    <p>LISTED PROPERTIES</p>
                  </div>
                  <span className="bar-shape"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> WHO WE ARE
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      Where Finding a House Feels Like Home
                    </h2>
                  </div>
                  <p className="about-text wow fadeInUp" data-wow-delay=".5s">
                    At our core, we believe finding a home should feel
                    comforting, not complicated. That&apos;s why we offer
                    trusted listings, expert support, and a seamless experience
                    tailored to your needs and dreams.
                  </p>
                  <ul className="wow fadeInUp" data-wow-delay=".7s">
                    <li>
                      <i className="flaticon-right-arrow"></i> Pontificate the
                      client proactively
                    </li>
                    <li>
                      <i className="flaticon-right-arrow"></i> Does the selected
                      item have a waiting list?
                    </li>
                    <li>
                      <i className="flaticon-right-arrow"></i> Instant 24-hour
                      Emergency
                    </li>
                  </ul>
                  <div className="about-btn wow fadeInUp" data-wow-delay=".3s">
                    <Link href="/about" className="theme-btn">
                      ABOUT US MORE <i className="flaticon-home"></i>
                    </Link>
                    <div className="call-info">
                      <div className="icon">
                        <i className="fa-solid fa-phone-xmark"></i>
                      </div>
                      <div className="content">
                        <span>Call Us 24/7</span>
                        <h4>
                          <a href="tel:+20866660112">+208-6666-0112</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="propertie-feature-section fix bg-cever"
        style={{
          backgroundImage:
            "url('/assets/img/home-1/propertie/propertie-feature-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="propertie-feature-wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="propertie-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> REAL ESTATE
                    </h5>
                    <h2
                      className="text-white wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      Your luxury. Your <br />
                      lifestyle.
                    </h2>
                  </div>
                  <p
                    className="propertie-text wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    At our core, we believe finding a home should feel
                    comforting, not complicated. That&apos;s why we offer
                    trusted listings, expert support,
                  </p>
                  <Link
                    href="/properties"
                    className="theme-btn wow fadeInUp"
                    data-wow-delay=".7s"
                  >
                    View Properties <i className="flaticon-home"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="propertie-image">
                  <Image
                    src="/assets/img/home/propertie-feature-image.jpeg"
                    alt="img"
                    className="wow img-custom-anim-right"
                    width={700}
                    height={700}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="propertie-section fix section-padding">
        <div className="container">
          <div
            className="propertie-wrapper"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
              }}
            >
              <video
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                controls
                autoPlay
                muted
                loop
              >
                <source
                  src="/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="team-section fix section-padding section-bg-2">
        <div className="container">
          <div className="section-title text-center">
            <h5 className="wow fadeInUp">
              <i className="flaticon-home"></i> LUXURY. TRUST. TEAM{" "}
              <i className="flaticon-home"></i>
            </h5>
            <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
              Our Real Estate Experts
            </h2>
          </div>
          <div className="swiper st-team-slider">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="st-team-thumb-items">
                  <Image
                    src="/assets/img/home-1/team/team-01.jpg"
                    alt="img"
                    width={400}
                    height={500}
                  />
                  <div className="st-team-content">
                    <h3>
                      <a href="#">Shikhon Islam</a>
                    </h3>
                    <p>Founder & CEO</p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="st-team-thumb-items">
                  <Image
                    src="/assets/img/home-1/team/team-02.jpg"
                    alt="img"
                    width={400}
                    height={500}
                  />
                  <div className="st-team-content">
                    <h3>
                      <a href="#">Shikhon Islam</a>
                    </h3>
                    <p>Founder & CEO</p>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="st-team-thumb-items">
                  <Image
                    src="/assets/img/home-1/team/team-03.jpg"
                    alt="img"
                    width={400}
                    height={500}
                  />
                  <div className="st-team-content">
                    <h3>
                      <a href="#">Shikhon Islam</a>
                    </h3>
                    <p>Founder & CEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="st-array-button justify-content-center mt-5">
            <button className="array-prev">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="array-next">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section> */}

      <div className="gt-counter-section fix">
        <div className="container">
          <div className="gt-counter-wrapper">
            <div className="gt-counter wow fadeInUp" data-wow-delay=".2s">
              <h2>
                <span className="count">34</span> +
              </h2>
              <p>Years Of Experience </p>
            </div>
            <div className="gt-counter wow fadeInUp" data-wow-delay=".4s">
              <h2>
                <span className="count">150.5</span>k
              </h2>
              <p>Satisficed Clients</p>
            </div>
            <div className="gt-counter wow fadeInUp" data-wow-delay=".6s">
              <h2>
                <span className="count">21</span>+
              </h2>
              <p>Luxury Houses </p>
            </div>
            <div className="gt-counter wow fadeInUp" data-wow-delay=".8s">
              <h2>
                <span className="count">20.5</span>k
              </h2>
              <p>Featured Projects</p>
            </div>
          </div>
        </div>
      </div>

      <section className="gt-testimonial-section section-padding fix section-bg-3">
        <div className="container">
          <div className="gt-testimonial-wrapper">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="gt-testimonial-left-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i>CUSTOMER TESTIMONIALS
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      Hear from Happy Homeowners
                    </h2>
                  </div>
                  <p
                    className="gt-testimonial-text wow fadeInUp"
                    data-wow-delay=".4s"
                  >
                    Discover what our satisfied homeowners have to say about
                    their journey. Real stories, real experiences, and real
                    trust—built one home at a time.
                  </p>
                  <div
                    className="gt-client-info wow fadeInUp"
                    data-wow-delay=".6s"
                  >
                    <div className="gt-client-image">
                      <Image
                        src="/assets/img/home-1/testimonial/client-info.png"
                        alt="img"
                        width={150}
                        height={50}
                      />
                    </div>
                    <h3>
                      More then <span>25K</span> clients Reviews
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="swiper testimonial-slider">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="gt-testimonial-box">
                        <div className="quote-icon">
                          <Image
                            src="/assets/img/home-1/testimonial/quote.png"
                            alt="img"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="star">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star color-2"></i>
                        </div>
                        <p className="gt-testi-text">
                          From the moment we arrived, every detail was flawless.
                          The staff anticipated our every need, and the suite
                          was pure perfection. We&apos;ll be back soon!
                        </p>
                        <div className="gt-client-info">
                          <div className="gt-client-image">
                            <Image
                              src="/assets/img/home-1/testimonial/client-info-right-img.png"
                              alt="img"
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="gt-client-content">
                            <h4>Marvin McKinney</h4>
                            <p>Product Manager</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="gt-testimonial-box">
                        <div className="quote-icon">
                          <Image
                            src="/assets/img/home-1/testimonial/quote.png"
                            alt="img"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="star">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star color-2"></i>
                        </div>
                        <p className="gt-testi-text">
                          From the moment we arrived, every detail was flawless.
                          The staff anticipated our every need, and the suite
                          was pure perfection. We&apos;ll be back soon!
                        </p>
                        <div className="gt-client-info">
                          <div className="gt-client-image">
                            <Image
                              src="/assets/img/home-1/testimonial/client-info-right-img.png"
                              alt="img"
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="gt-client-content">
                            <h4>Marvin McKinney</h4>
                            <p>Product Manager</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="gt-testimonial-box">
                        <div className="quote-icon">
                          <Image
                            src="/assets/img/home-1/testimonial/quote.png"
                            alt="img"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="star">
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star"></i>
                          <i className="fa-solid fa-star color-2"></i>
                        </div>
                        <p className="gt-testi-text">
                          From the moment we arrived, every detail was flawless.
                          The staff anticipated our every need, and the suite
                          was pure perfection. We&apos;ll be back soon!
                        </p>
                        <div className="gt-client-info">
                          <div className="gt-client-image">
                            <Image
                              src="/assets/img/home-1/testimonial/client-info-right-img.png"
                              alt="img"
                              width={80}
                              height={80}
                            />
                          </div>
                          <div className="gt-client-content">
                            <h4>Marvin McKinney</h4>
                            <p>Product Manager</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="array-button-2 justify-content-center">
                    <button className="array-prev">
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="swiper-dot1">
                      <div className="dot"></div>
                    </div>
                    <button className="array-next">
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="gt-news-section section-padding">
        <div className="container">
          <div className="section-title-area">
            <div className="section-title">
              <h5 className="wow fadeInUp">
                <i className="flaticon-home"></i>REAL ESTATE INSIGHTS
              </h5>
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                Property News & Updates
              </h2>
            </div>
            <a href="#" className="theme-btn wow fadeInUp" data-wow-delay=".4s">
              View All Blog <i className="flaticon-home"></i>
            </a>
          </div>
          <div className="row">
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="gt-news-box-items">
                <div className="gt-thumb">
                  <Image
                    src="/assets/img/home/project-01.jpeg"
                    alt="img"
                    width={400}
                    height={300}
                  />
                  <Image
                    src="/assets/img/home/project-01.jpeg"
                    alt="img"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="gt-content">
                  <ul className="gt-list">
                    <li>
                      <i className="fa-solid fa-calendar-days"></i>
                      April 12, 2025
                    </li>
                    <li>Tips & Tricks</li>
                  </ul>
                  <h3>
                    <a href="#">How to Stage Your Home to Sell Faster</a>
                  </h3>
                  <a href="#" className="theme-btn">
                    Read More <i className="flaticon-right-arrow"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".5s"
            >
              <div className="gt-news-box-items">
                <div className="gt-thumb">
                  <Image
                    src="/assets/img/home/project-02.jpeg"
                    alt="img"
                    width={400}
                    height={300}
                  />
                  <Image
                    src="/assets/img/home/project-02.jpeg"
                    alt="img"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="gt-content">
                  <ul className="gt-list">
                    <li>
                      <i className="fa-solid fa-calendar-days"></i>
                      April 12, 2025
                    </li>
                    <li>Hotel</li>
                  </ul>
                  <h3>
                    <a href="#">Buying vs. Renting – Which Is Right for You?</a>
                  </h3>
                  <a href="#" className="theme-btn">
                    Read More <i className="flaticon-right-arrow"></i>
                  </a>
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".7s"
            >
              <div className="gt-news-box-items">
                <div className="gt-thumb">
                  <Image
                    src="/assets/img/home/project-03.jpeg"
                    alt="img"
                    width={400}
                    height={300}
                  />
                  <Image
                    src="/assets/img/home/project-03.jpeg"
                    alt="img"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="gt-content">
                  <ul className="gt-list">
                    <li>
                      <i className="fa-solid fa-calendar-days"></i>
                      April 12, 2025
                    </li>
                    <li>Tips & Enjoy</li>
                  </ul>
                  <h3>
                    <a href="#">Why London Is a Great Place to Settle Down</a>
                  </h3>
                  <a href="#" className="theme-btn">
                    Read More <i className="flaticon-right-arrow"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="contact-section fix">
        <div className="container">
          <div className="contact-wrapper">
            <div className="row">
              <div className="col-lg-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5733634314897!2d100.90275000000001!3d12.8708096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102941744fdc3d1%3A0xeb2643eac204ed35!2sTiger%20Park%20Pattaya!5e0!3m2!1sen!2sin!4v1767354493548!5m2!1sen!2sin"
                  width="600"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="col-lg-6">
                <div className="contact-content">
                  <div className="section-title">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> BOOK APPOINTMENT
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      Send Us Message
                    </h2>
                  </div>
                  <form action="#">
                    <div className="row g-4">
                      <div
                        className="col-lg-6 wow fadeInUp"
                        data-wow-delay=".2s"
                      >
                        <div className="form-clt">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-6 wow fadeInUp"
                        data-wow-delay=".4s"
                      >
                        <div className="form-clt">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email address"
                          />
                        </div>
                      </div>
                      <div
                        className="col-lg-12 wow fadeInUp"
                        data-wow-delay=".2s"
                      >
                        <div className="form-clt">
                          <div className="form">
                            <select className="single-select w-100">
                              <option>Real Estate</option>
                              <option>Property management</option>
                              <option>Market analysis</option>
                              <option>Home interior</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-12 wow fadeInUp"
                        data-wow-delay=".6s"
                      >
                        <div className="form-clt">
                          <textarea
                            name="message"
                            id="message"
                            placeholder="Message Here*"
                          ></textarea>
                        </div>
                      </div>
                      <div
                        className="col-lg-12 wow fadeInUp"
                        data-wow-delay=".2s"
                      >
                        <button className="theme-btn" type="submit">
                          Send Message
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
