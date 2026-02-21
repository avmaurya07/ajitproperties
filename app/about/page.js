import Breadcrumb from "@/app/components/Breadcrumb";
import connectDB from "@/lib/mongodb";
import HomeAbout from "@/models/HomeAbout";
import FooterModel from "@/models/Footer";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "About Us - Ajit Properties",
};

async function getAboutData() {
  try {
    await connectDB();
    const about = await HomeAbout.findOne().lean();

    if (!about) {
      throw new Error("About data not found in database");
    }

    return JSON.parse(JSON.stringify(about));
  } catch (error) {
    console.error("Error fetching about data:", error);
    throw error;
  }
}

async function getFooterData() {
  try {
    await connectDB();
    const footer = await FooterModel.findOne().lean();

    if (!footer) {
      throw new Error("Footer data not found in database");
    }

    return JSON.parse(JSON.stringify(footer));
  } catch (error) {
    console.error("Error fetching footer data:", error);
    throw error;
  }
}

export default async function AboutPage() {
  const about = await getAboutData();
  const footer = await getFooterData();

  const breadcrumbItems = [{ label: "Home", link: "/" }, { label: "About Us" }];

  return (
    <>
      <Breadcrumb title="About Us" items={breadcrumbItems} />

      {/* About Section Start */}
      <section className="about-section fix section-bg section-padding overflow-visible">
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
              {/* LEFT: STICKY IMAGE */}
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                <div className="relative lg:sticky lg:top-[100px] z-20">
                  <div className="about-image">
                    <Image
                      src={about.mainImage}
                      alt="img"
                      width={600}
                      height={700}
                      priority
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
                        <span className="count">{about.counterValue}</span>k+
                      </h2>
                      <p>{about.counterLabel}</p>
                    </div>

                    <span className="bar-shape"></span>
                  </div>
                </div>
              </div>

              {/* RIGHT: CONTENT */}
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

                  <p
                    className="about-text wow fadeInUp"
                    data-wow-delay=".5s"
                    dangerouslySetInnerHTML={{
                      __html: about.description.replace(/\n/g, "<br />"),
                    }}
                  />

                  <ul className="wow fadeInUp" data-wow-delay=".7s">
                    {(about?.features || []).map((feature, index) => (
                      <li key={index}>
                        <i className="flaticon-right-arrow"></i> {feature.text}
                      </li>
                    ))}
                  </ul>

                  <div className="about-btn wow fadeInUp" data-wow-delay=".3s">
                    {about?.phoneNumber && (
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
                              +91 {about.phoneNumber}
                            </a>
                          </h4>
                        </div>
                      </div>
                    )}
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
