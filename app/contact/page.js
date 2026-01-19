import Breadcrumb from "@/app/components/Breadcrumb";

export const metadata = {
  title: "Contact Us - Ajit Properties",
};

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Contact Us" },
  ];

  return (
    <>
      <Breadcrumb title="Contact Us" items={breadcrumbItems} />

      <section className="contact-section fix section-padding">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6">
              <h2>We’d Love to Hear From You</h2>
              <p>
                Have questions about our properties? Our team is here to help.
              </p>

              <ul className="mt-4">
                <li>📍 London, UK</li>
                <li>📞 +89 09 2346 1894</li>
                <li>✉️ example@gmail.com</li>
              </ul>
            </div>

            <div className="col-lg-6">
              <form className="contact-form">
                <input type="text" placeholder="Your Name" required />
                <input type="email" placeholder="Your Email" required />
                <textarea rows="5" placeholder="Your Message" required />
                <button className="theme-btn mt-3">SEND MESSAGE</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
