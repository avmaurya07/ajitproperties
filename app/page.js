import Header from "@/app/components/Header";
import PropertyCard from "@/app/components/PropertyCard";
import ContactForm from "@/app/components/ContactForm";
import FeaturedPropertiesSlider from "@/app/components/FeaturedPropertiesSlider";
import HomeVideoSlider from "@/app/components/HomeVideoSlider";
import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import FooterModel from "@/models/Footer";
import HomeHero from "@/models/HomeHero";
import HouseOffer from "@/models/HouseOffer";
import HomeAbout from "@/models/HomeAbout";
import PropertyFeature from "@/models/PropertyFeature";
import HomeCounter from "@/models/HomeCounter";
import HomeTestimonial from "@/models/HomeTestimonial";
import HomeContact from "@/models/HomeContact";
import HomeVideo from "@/models/HomeVideo";
import HomeProject from "@/models/HomeProject";
import HomeHeroSection from "@/app/components/HomeHeroSection";

export const dynamic = "force-dynamic";

// Single optimized function to fetch all home page data in one database call
async function getAllHomePageData() {
  try {
    await connectDB();

    // Fetch all data in parallel with a single database connection
    const [
      featuredProperties,
      footer,
      hero,
      offers,
      about,
      features,
      counter,
      testimonials,
      contact,
      video,
      projects,
    ] = await Promise.all([
      Property.find({ featured: true, available: true })
        .limit(10)
        .sort({ createdAt: -1 })
        .lean()
        .exec(),
      FooterModel.findOne().lean(),
      HomeHero.findOne().lean(),
      HouseOffer.findOne().lean(),
      HomeAbout.findOne().lean(),
      PropertyFeature.findOne().lean(),
      HomeCounter.findOne().lean(),
      HomeTestimonial.findOne().lean(),
      HomeContact.findOne().lean(),
      HomeVideo.findOne().lean(),
      HomeProject.findOne().lean(),
    ]);

    // Serialize all data to plain JavaScript objects (removes MongoDB ObjectIds)
    return JSON.parse(
      JSON.stringify({
        featuredProperties: featuredProperties.map((property) => ({
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
        })),
        footer,
        hero,
        offers,
        about,
        features,
        counter,
        testimonials,
        contact,
        video,
        projects,
      }),
    );
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw new Error("Failed to fetch home page data from database");
  }
}

export default async function HomePage() {
  const {
    featuredProperties,
    footer: footerData,
    hero: heroData,
    offers: offersData,
    about: aboutData,
    features: featuresData,
    counter: counterData,
    testimonials: testimonialsData,
    contact: contactData,
    video: videoData,
    projects: projectsData,
  } = await getAllHomePageData();

  /* Removed useEffect for hero slider as it is now in HomeHeroSection */

  return (
    <>
      <Header />

      <HomeHeroSection heroData={heroData} />

      <section className="house-offer-section fix py-12 section-bg">
        <div className="container">
          <div className="section-title text-center mb-8">
            <h5 className="wow fadeInUp">
              <i className="flaticon-home"></i> {offersData.subtitle}{" "}
              <i className="flaticon-home"></i>
            </h5>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              {offersData.title}
            </h2>
          </div>
          <div className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {(offersData?.offers || []).map((offer, index) => (
              <div
                key={index}
                className="col wow fadeInUp"
                data-wow-delay={`${index * 0.2}s`}
              >
                <div className="house-offer-box">
                  <div className="icon">
                    <i className={offer.icon}></i>
                  </div>
                  <div className="content">
                    <h4>{offer.name}</h4>
                    <p>{offer.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="propertie-section fix pt-0">
        <div className="container">
          <div className="section-title text-center">
            <h5
              className="wow fadeInUp"
              style={{ textTransform: "uppercase" }}
            ></h5>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              {videoData.title}
            </h2>
          </div>
          <HomeVideoSlider videos={videoData?.videoUrl || []} />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h5 className="text-lg font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              <i className="flaticon-home mr-2"></i> {projectsData.subtitle}
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {projectsData.title}
            </h2>
          </div>
        </div>
        <FeaturedPropertiesSlider properties={featuredProperties} />
      </section>

      <section className="about-section fix section-bg section-padding pt-0">
        <div className="right-shape">
          <Image
            src={aboutData.rightShapeImage}
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
                    src={aboutData.mainImage}
                    alt="img"
                    width={600}
                    height={700}
                  />
                  <div className="about-image-2">
                    <Image
                      src={aboutData.secondaryImage}
                      alt="img"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="counter-box">
                    <h2>
                      <span className="count">{aboutData.counterValue}</span>k+
                    </h2>
                    <p>{aboutData.counterLabel}</p>
                  </div>
                  <span className="bar-shape"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> {aboutData.subtitle}
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {aboutData.title}
                    </h2>
                  </div>
                  <p
                    className="about-text wow fadeInUp"
                    data-wow-delay=".5s"
                    dangerouslySetInnerHTML={{
                      __html: aboutData.description.replace(/\n/g, "<br />"),
                    }}
                  />
                  <ul className="wow fadeInUp" data-wow-delay=".7s">
                    {(aboutData?.features || []).map((feature, index) => (
                      <li key={index}>
                        <i className="flaticon-right-arrow"></i> {feature.text}
                      </li>
                    ))}
                  </ul>
                  {aboutData && (
                    <div
                      className="about-btn wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <Link href={`/about-us`} className="theme-btn">
                        Learn More <i className="flaticon-home"></i>
                      </Link>
                      {aboutData?.phoneNumber && (
                        <div className="call-info">
                          <div className="icon">
                            <i className="fa-solid fa-phone-xmark"></i>
                          </div>
                          <div className="content">
                            <span>Call Us 24/7</span>
                            <h4>
                              <a
                                href={`tel:${aboutData.phoneNumber.replace(/[^0-9+]/g, "")}`}
                              >
                                {aboutData.phoneNumber}
                              </a>
                            </h4>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="propertie-feature-section fix bg-cever"
        style={{
          backgroundImage: `url(${featuresData.backgroundImage})`,
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
                      <i className="flaticon-home"></i> {featuresData.subtitle}
                    </h5>
                    <h2
                      className="text-white wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      {featuresData.title}
                    </h2>
                  </div>
                  <p
                    className="propertie-text wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <span>{featuresData.description}</span>
                  </p>
                  <Link
                    href={featuresData.buttonUrl}
                    className="theme-btn wow fadeInUp"
                    data-wow-delay=".7s"
                  >
                    {featuresData.buttonText} <i className="flaticon-home"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="propertie-image">
                  <Image
                    src={featuresData.featureImage}
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

      <div className="gt-counter-section fix">
        <div className="container">
          <div className="gt-counter-wrapper">
            {(counterData?.counters || []).map((counter, index) => (
              <div
                key={index}
                className="gt-counter wow fadeInUp"
                data-wow-delay={`${0.2 + index * 0.2}s`}
              >
                <h2>
                  <span className="count" data-count={counter.value}>
                    {counter.value}
                  </span>
                  {counter.suffix}
                </h2>
                <p>{counter.label}</p>
              </div>
            ))}
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
                      <i className="flaticon-home"></i>{" "}
                      {testimonialsData.subtitle}
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {testimonialsData.title}
                    </h2>
                  </div>
                  <p
                    className="gt-testimonial-text wow fadeInUp"
                    data-wow-delay=".4s"
                  >
                    {testimonialsData.description}
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
                      More then{" "}
                      <span>{testimonialsData.clientReviewCount}</span>{" "}
                      {testimonialsData.clientReviewLabel}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="swiper testimonial-slider">
                  <div className="swiper-wrapper">
                    {(testimonialsData?.testimonials || []).map(
                      (testimonial, index) => (
                        <div key={index} className="swiper-slide">
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
                              {[...Array(testimonial.rating || 5)].map(
                                (_, i) => (
                                  <i key={i} className="fa-solid fa-star"></i>
                                ),
                              )}
                            </div>
                            <p className="gt-testi-text">
                              {testimonial.review}
                            </p>
                            <div className="gt-client-info">
                              <div className="gt-client-image">
                                <Image
                                  src={testimonial.image}
                                  alt="img"
                                  width={80}
                                  height={80}
                                />
                              </div>
                              <div className="gt-client-content">
                                <h4>{testimonial.name}</h4>
                                <p>{testimonial.position}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
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

      <section className="contact-section fix">
        <div className="container">
          <div className="contact-wrapper">
            <div className="row">
              <div className="col-lg-6">
                <iframe
                  src={contactData.mapEmbedUrl}
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
                      <i className="flaticon-home"></i> {contactData.subtitle}
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {contactData.title}
                    </h2>
                  </div>
                  <ContactForm
                    formCategories={contactData?.formCategories || []}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
