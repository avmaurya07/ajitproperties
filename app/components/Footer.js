import Link from "next/link";
import Image from "next/image";

export default function Footer() {
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
                    src="/assets/img/home-1/footer-logo.png"
                    alt="Ajit Properties Footer Logo"
                    width={150}
                    height={50}
                  />
                </Link>
                <p className="footer-text">
                  Don't worry—we're here to help! Contact our support team or
                  set custom alerts to find homes that perfectly match your
                  needs and budget.
                </p>
                <ul className="footer-contact-list">
                  <li>
                    <i className="fa-solid fa-phone-xmark"></i>
                    <a href="tel:890923461894">89 (09) 2346 1894</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-envelopes"></i>
                    <a href="mailto:example@gmail.com">example@gmail.com</a>
                  </li>
                  <li>
                    <i className="fa-solid fa-location-dot"></i>
                    UK, 1212; 102/B New Elephant Road London
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 wow fadeInUp" data-wow-delay=".5s">
              <div className="foorer-right-items">
                <h3>Subscribe To Our Newsletter</h3>
                <form>
                  <input type="text" name="email" placeholder="Email address" />
                  <button className="theme-btn" type="submit">
                    SUBSCRIBE
                  </button>
                </form>
                <div className="row justify-content-between">
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-6">
                    <div className="footer-widget-items">
                      <div className="widget-head">
                        <h4>Quick links</h4>
                      </div>
                      <ul className="list-area">
                        <li>
                          <Link href="/about">About Us</Link>
                        </li>
                        <li>
                          <Link href="/team">Our Team</Link>
                        </li>
                        <li>
                          <Link href="/properties">Property</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p className="wow fadeInUp">
            © 2025 Powered By <b>Ajit Properties</b>. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
