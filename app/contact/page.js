import Breadcrumb from "@/app/components/Breadcrumb";
import ContactForm from "@/app/components/ContactForm";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import HomeContact from "@/models/HomeContact";

export const metadata = {
  title: "Contact Us - Ajit Properties",
};

async function getContactData() {
  try {
    await connectDB();
    const contact = await Contact.findOne().lean();
    return contact
      ? { phone: contact.phone, email: contact.email, address: contact.address }
      : { phone: "", email: "", address: "" };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return { phone: "", email: "", address: "" };
  }
}

async function getHomeContactData() {
  try {
    await connectDB();
    const homeContact = await HomeContact.findOne().lean();
    return homeContact
      ? {
          title: homeContact.title,
          subtitle: homeContact.subtitle,
          mapEmbedUrl: homeContact.mapEmbedUrl,
          formCategories: (homeContact.formCategories || []).map((cat) => ({
            name: cat.name,
            value: cat.value,
          })),
        }
      : {
          title: "Send Us Message",
          subtitle: "BOOK APPOINTMENT",
          mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd",
          formCategories: [
            { name: "Real Estate", value: "real-estate" },
            { name: "Property management", value: "property-management" },
            { name: "Market analysis", value: "market-analysis" },
            { name: "Home interior", value: "home-interior" },
          ],
        };
  } catch (error) {
    console.error("Error fetching home contact data:", error);
    return {
      title: "Send Us Message",
      subtitle: "BOOK APPOINTMENT",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6678.7619084840835!2d144.9618311901502!3d-37.81450084255415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b4758afc1d%3A0x3119cc820fdfc62e!2sEnvato!5e0!3m2!1sen!2sbd!4v1641984054261!5m2!1sen!2sbd",
      formCategories: [
        { name: "Real Estate", value: "real-estate" },
        { name: "Property management", value: "property-management" },
        { name: "Market analysis", value: "market-analysis" },
        { name: "Home interior", value: "home-interior" },
      ],
    };
  }
}

export default async function ContactPage() {
  const contactData = await getContactData();
  const homeContactData = await getHomeContactData();
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Contact Us" },
  ];

  return (
    <>
      <Breadcrumb title="Contact Us" items={breadcrumbItems} />

      {/* <!-- Contact INfo Section Start --> */}
      <section className="contact-info-section fix section-padding">
        <div className="container">
          <div className="contact-info-wrapper">
            <div className="section-title text-center">
              <h2>Contact Us for Furnished Home Tours</h2>
              <p className="mt-3">
                Schedule a tour today and explore our fully furnished homes.
                Experience stylish, move-in-ready spaces designed for <br />{" "}
                comfort, convenience, and modern living. Let us help you find
                your perfect fit.
              </p>
            </div>
            <div className="row">
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="contact-info-box">
                  <div className="icon">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <div className="content">
                    <h3>Location</h3>
                    <p>{contactData.address}</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="contact-info-box">
                  <div className="icon">
                    <i className="fa-solid fa-phone-xmark"></i>
                  </div>
                  <div className="content">
                    <h3>Phone</h3>
                    <a href={`tel:${contactData.phone}`}>
                      +91 {contactData.phone}
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-6 col-md-6">
                <div className="contact-info-box">
                  <div className="icon">
                    <i className="fa-solid fa-envelopes"></i>
                  </div>
                  <div className="content">
                    <h3>Email</h3>
                    <a href={`mailto:${contactData.email}`}>
                      {contactData.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Contact Section Start --> */}
      <section className="contact-section-3 fix section-padding pt-0">
        <div className="container">
          <div className="contact-wrapper-10">
            <div className="section-title text-center mb-0">
              <h5 className="wow fadeInUp">
                <i className="flaticon-home"></i> Keep In Touch{" "}
                <i className="flaticon-home"></i>
              </h5>
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                {homeContactData.title}
              </h2>
            </div>
            <ContactForm formCategories={homeContactData.formCategories} />
          </div>
        </div>
      </section>

      {/* <!-- Map Section Start --> */}
      <div className="googpemap-2">
        <iframe
          src={homeContactData.mapEmbedUrl}
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
