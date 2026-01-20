import Link from "next/link";
import Image from "next/image";

export default function Footer({ footerData }) {
  // Use footerData if available, otherwise use default values
  const footer = footerData || {
    logo: "/assets/img/home-1/footer-logo.png",
    description:
      "Don't worry—we're here to help! Contact our support team or set custom alerts to find homes that perfectly match your needs and budget.",
    contactInfo: {
      phone: "89 (09) 2346 1894",
      email: "example@gmail.com",
      address: "UK, 1212; 102/B New Elephant Road London",
    },
    newsletter: {
      title: "Subscribe To Our Newsletter",
      placeholder: "Email address",
      buttonText: "SUBSCRIBE",
    },
    quickLinks: [
      {
        title: "Quick links",
        links: [
          { text: "About Us", url: "/about" },
          { text: "Our Team", url: "/team" },
          { text: "Property", url: "/properties" },
        ],
      },
    ],
    copyright: "© 2025 Powered By <b>Ajit Properties</b>. All Rights Reserved.",
  };

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
                    src={footer.logo}
                    alt="Ajit Properties Footer Logo"
                    width={150}
                    height={50}
                  />
                </Link>
                <p className="footer-text">{footer.description}</p>
                <ul className="footer-contact-list">
                  <li>
                    <i className="fa-solid fa-phone-xmark"></i>
                    <a href={`tel:${footer.contactInfo.phone}`}>
                      {footer.contactInfo.phone}
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelopes"></i>
                    <a href={`mailto:${footer.contactInfo.email}`}>
                      {footer.contactInfo.email}
                    </a>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    {footer.contactInfo.address}
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="foorer-right-items">
                <h3>{footer.newsletter.title}</h3>
                <form>
                  <input
                    type="text"
                    name="email"
                    placeholder={footer.newsletter.placeholder}
                  />
                  <button className="theme-btn" type="submit">
                    {footer.newsletter.buttonText}
                  </button>
                </form>
                <div className="row justify-content-between">
                  {footer.quickLinks &&
                    footer.quickLinks.map((linkGroup, index) => (
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
            dangerouslySetInnerHTML={{ __html: footer.copyright }}
          ></p>
        </div>
      </div>
    </footer>
  );
}
