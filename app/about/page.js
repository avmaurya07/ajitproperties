import Breadcrumb from "@/app/components/Breadcrumb";
import Link from "next/link";

export const metadata = {
  title: "About Us - Ajit Properties",
};

export default function AboutPage() {
  const breadcrumbItems = [{ label: "Home", link: "/" }, { label: "About Us" }];

  return (
    <>
      <Breadcrumb title="About Us" items={breadcrumbItems} />

      <section className="about-section section-padding">
        <div className="container">
          <h2>Where Finding a House Feels Like Home</h2>

          <p className="mt-3">
            We provide trusted listings, expert support, and seamless real
            estate experiences.
          </p>

          <ul className="mt-4">
            <li>✔ Trusted Listings</li>
            <li>✔ 24/7 Support</li>
            <li>✔ Emergency Service</li>
          </ul>

          <Link href="/contact" className="theme-btn mt-4">
            CONTACT US
          </Link>
        </div>
      </section>
    </>
  );
}
