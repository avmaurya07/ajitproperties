import Breadcrumb from "@/app/components/Breadcrumb";
import ContactForm from "@/app/components/ContactForm";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";
import HomeContact from "@/models/HomeContact";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Contact Us - Ajit Properties",
};

async function getContactData() {
  try {
    await connectDB();
    const contact = await Contact.findOne().lean();

    if (!contact) {
      throw new Error("Contact data not found in database");
    }

    return {
      phone: contact.phone,
      email: contact.email,
      address: contact.address,
      socialLinks: contact.socialLinks || {},
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    throw error;
  }
}

async function getHomeContactData() {
  try {
    await connectDB();
    const homeContact = await HomeContact.findOne().lean();

    if (!homeContact) {
      throw new Error("Home contact data not found in database");
    }

    return {
      title: homeContact.title,
      subtitle: homeContact.subtitle,
      mapEmbedUrl: homeContact.mapEmbedUrl,
      formCategories: (homeContact.formCategories || []).map((cat) => ({
        name: cat.name,
        value: cat.value,
      })),
    };
  } catch (error) {
    console.error("Error fetching home contact data:", error);
    throw error;
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

            {/* Social Media Links */}
            {contactData.socialLinks &&
              Object.values(contactData.socialLinks).some((link) => link) && (
                <div className="row mt-5">
                  <div className="col-12">
                    <div className="text-center">
                      <h3 className="mb-4">Connect With Us</h3>
                      <div className="social-links-wrapper d-flex justify-content-center gap-3">
                        {contactData.socialLinks.facebook && (
                          <a
                            href={contactData.socialLinks.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-contact"
                            aria-label="Facebook"
                          >
                            <i className="fab fa-facebook-f"></i>
                          </a>
                        )}
                        {contactData.socialLinks.twitter && (
                          <a
                            href={contactData.socialLinks.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-contact"
                            aria-label="Twitter"
                          >
                            <i className="fab fa-twitter"></i>
                          </a>
                        )}
                        {contactData.socialLinks.instagram && (
                          <a
                            href={contactData.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-contact"
                            aria-label="Instagram"
                          >
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                        {contactData.socialLinks.linkedin && (
                          <a
                            href={contactData.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-contact"
                            aria-label="LinkedIn"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                        )}
                        {contactData.socialLinks.youtube && (
                          <a
                            href={contactData.socialLinks.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-contact"
                            aria-label="YouTube"
                          >
                            <i className="fab fa-youtube"></i>
                          </a>
                        )}
                        {contactData.socialLinks.whatsapp && (
                          <a
                            href={`https://wa.me/${contactData.socialLinks.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon-contact"
                            aria-label="WhatsApp"
                          >
                            <i className="fab fa-whatsapp"></i>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
