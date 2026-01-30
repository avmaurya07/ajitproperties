import Link from "next/link";
import Image from "next/image";

export default function Footer({ footerData }) {
  // No default data - footerData must come from database

  // console.log(footerData);
  if (!footerData) {
    return null; // Don't render footer if no data from database
  }
  return (
    <footer className="footer-section section-bg-2 fix">
      <div className="footer-shape">
        <Image
          src="/assets/img/home-1/footer-shape.png"
          alt="Footer decoration"
          width={800}
          height={400}
        />
      </div>
      <div className="container">
        <div className="footer-wrapper">
          <div className="row g-4">
            <div className="col-xl-6 wow fadeInUp" data-wow-delay=".3s">
              <div className="footer-left-items">
                <Link href="/" className="footer-logo">
                  <Image
                    src={footerData.logo}
                    alt="Ajit Properties Footer Logo"
                    width={150}
                    height={50}
                  />
                </Link>
                <p className="footer-text">{footerData.description}</p>
                <ul className="footer-contact-list">
                  <li>
                    <i className="fa-solid fa-phone-xmark"></i>
                    <a href={`tel:${footerData?.contactInfo?.phone || ""}`}>
                      +91 {footerData?.contactInfo?.phone || ""}
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelopes"></i>
                    <a href={`mailto:${footerData?.contactInfo?.email || ""}`}>
                      {footerData?.contactInfo?.email || ""}
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    {footerData?.contactInfo?.address || ""}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="foorer-right-items">
                <h3>{footerData?.newsletter?.title}</h3>
                <form>
                  <input
                    type="text"
                    name="email"
                    placeholder={footerData?.newsletter?.placeholder}
                  />
                  <button className="theme-btn" type="submit">
                    {footerData?.newsletter?.buttonText}
                  </button>
                </form>
                <div className="row justify-content-between">
                  {(footerData?.quickLinks || []).map((linkGroup, index) => (
                    <div
                      key={index}
                      className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6"
                    >
                      <div className="footer-widget-items">
                        <div className="widget-head">
                          <h4>{linkGroup.title}</h4>
                        </div>
                        <ul className="list-area">
                          {linkGroup.links &&
                            linkGroup.links.map((link, linkIndex) => (
                              <li key={linkIndex}>
                                <Link href={link.url}>{link.text}</Link>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                  {/* Social Media Links */}
                  {footerData?.socialLinks && (
                    <div className="social-icon mt-4 flex gap-3">
                      {footerData.socialLinks.facebook && (
                        <a
                          href={footerData.socialLinks.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Facebook"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      )}

                      {footerData.socialLinks.twitter && (
                        <a
                          href={footerData.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Twitter"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                      )}

                      {footerData.socialLinks.instagram && (
                        <a
                          href={footerData.socialLinks.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Instagram"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      )}

                      {footerData.socialLinks.linkedin && (
                        <a
                          href={footerData.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition"
                        >
                          <i className="fab fa-linkedin-in"></i>
                        </a>
                      )}

                      {footerData.socialLinks.youtube && (
                        <a
                          href={footerData.socialLinks.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="YouTube"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition"
                        >
                          <i className="fab fa-youtube"></i>
                        </a>
                      )}

                      {footerData.socialLinks.whatsapp && (
                        <a
                          href={`https://wa.me/${footerData.socialLinks.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                          className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-gray-800 hover:bg-gray-200 transition"
                        >
                          <i className="fab fa-whatsapp"></i>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p
            className="wow fadeInUp"
            dangerouslySetInnerHTML={{ __html: footerData?.copyright || "" }}
          ></p>
        </div>
      </div>
    </footer>
  );
}
