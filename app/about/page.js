import Breadcrumb from "@/app/components/Breadcrumb";
import connectDB from "@/lib/mongodb";
import HomeAbout from "@/models/HomeAbout";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us - Ajit Properties",
};

async function getAboutData() {
  try {
    await connectDB();
    const about = await HomeAbout.findOne().lean();
    if (!about) {
      return {
        title: "Where Finding a House Feels Like Home",
        subtitle: "WHO WE ARE",
        description:
          "At our core, we believe finding a home should feel comforting, not complicated. That's why we offer trusted listings, expert support, and a seamless experience tailored to your needs and dreams.",
        mainImage: "/assets/img/home-1/about/about-01.png",
        secondaryImage: "/assets/img/home-1/about/about-02.png",
        rightShapeImage: "/assets/img/home-1/about/right-shape.png",
        features: [
          {
            text: "Pontificate the client proactively",
          },
          {
            text: "Does the selected item have a waiting list?",
          },
          {
            text: "Instant 24-hour Emergency",
          },
        ],
        button: {
          text: "ABOUT US MORE",
          link: "/about",
        },
        counterValue: "697",
        counterLabel: "LISTED PROPERTIES",
        phoneNumber: "+208-6666-0112",
      };
    }
    // Return the data with defaults for missing fields
    return {
      ...about,
      button: about.button || {
        text: "ABOUT US MORE",
        link: "/about",
      },
      rightShapeImage:
        about.rightShapeImage || "/assets/img/home-1/about/right-shape.png",
      mainImage: about.mainImage || "/assets/img/home-1/about/about-01.png",
      secondaryImage:
        about.secondaryImage || "/assets/img/home-1/about/about-02.png",
      counterValue: about.counterValue || "697",
      counterLabel: about.counterLabel || "LISTED PROPERTIES",
      phoneNumber: about.phoneNumber || "+208-6666-0112",
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return {
      title: "Where Finding a House Feels Like Home",
      subtitle: "WHO WE ARE",
      description:
        "At our core, we believe finding a home should feel comforting, not complicated. That's why we offer trusted listings, expert support, and a seamless experience tailored to your needs and dreams.",
      mainImage: "/assets/img/home-1/about/about-01.png",
      secondaryImage: "/assets/img/home-1/about/about-02.png",
      rightShapeImage: "/assets/img/home-1/about/right-shape.png",
      features: [
        {
          text: "Pontificate the client proactively",
        },
        {
          text: "Does the selected item have a waiting list?",
        },
        {
          text: "Instant 24-hour Emergency",
        },
      ],
      button: {
        text: "ABOUT US MORE",
        link: "/about",
      },
      counterValue: "697",
      counterLabel: "LISTED PROPERTIES",
      phoneNumber: "+208-6666-0112",
    };
  }
}

export default async function AboutPage() {
  const about = await getAboutData();
  const breadcrumbItems = [{ label: "Home", link: "/" }, { label: "About Us" }];

  return (
    <>
      <Breadcrumb title="About Us" items={breadcrumbItems} />

      {/* About Section Start */}
      <section className="about-section fix section-bg section-padding">
        <div className="right-shape">
          <Image
            src={about.rightShapeImage}
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
                    src={about.mainImage}
                    alt="img"
                    width={600}
                    height={700}
                  />
                  <div className="about-image-2">
                    <Image
                      src={about.secondaryImage}
                      alt="img"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="counter-box">
                    <h2>
                      <span className="count">{about.counterValue}</span>
                    </h2>
                    <p>{about.counterLabel}</p>
                  </div>
                  <span className="bar-shape"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> {about.subtitle}
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {about.title}
                    </h2>
                  </div>
                  <p className="about-text wow fadeInUp" data-wow-delay=".5s">
                    {about.description}
                  </p>
                  <ul className="wow fadeInUp" data-wow-delay=".7s">
                    {about.features.map((feature, index) => (
                      <li key={index}>
                        <i className="flaticon-right-arrow"></i> {feature.text}
                      </li>
                    ))}
                  </ul>
                  <div className="about-btn wow fadeInUp" data-wow-delay=".3s">
                    {/* <Link href={about.button.link} className="theme-btn">
                      {about.button.text} <i className="flaticon-home"></i>
                    </Link> */}
                    <div className="call-info">
                      <div className="icon">
                        <i className="fa-solid fa-phone-xmark"></i>
                      </div>
                      <div className="content">
                        <span>Call Us 24/7</span>
                        <h4>
                          <a
                            href={`tel:${about.phoneNumber.replace(/[^0-9+]/g, "")}`}
                          >
                            {about.phoneNumber}
                          </a>
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
    </>
  );
}
