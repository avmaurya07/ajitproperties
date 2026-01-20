import Script from "next/script";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import connectDB from "@/lib/mongodb";
import FooterModel from "@/models/Footer";

export const metadata = {
  title: "Ajit Properties",
  description: "Real Estate Website",
};

async function getFooterData() {
  try {
    await connectDB();
    const footer = await FooterModel.findOne().lean();
    if (!footer) {
      // Return default data if no footer exists
      return {
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
        copyright:
          "© 2025 Powered By <b>Ajit Properties</b>. All Rights Reserved.",
      };
    }
    return footer;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    // Return default data on error
    return {
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
      copyright:
        "© 2025 Powered By <b>Ajit Properties</b>. All Rights Reserved.",
    };
  }
}

export default async function RootLayout({ children }) {
  const footerData = await getFooterData();

  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/all.min.css" />
        <link rel="stylesheet" href="/assets/css/animate.css" />
        <link rel="stylesheet" href="/assets/css/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/meanmenu.css" />
        <link rel="stylesheet" href="/assets/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/flacticon.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>

      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer footerData={footerData} />

        <Script
          src="/assets/js/jquery-3.7.1.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/assets/js/bootstrap.bundle.min.js" />
        <Script src="/assets/js/jquery.nice-select.min.js" />
        <Script src="/assets/js/swiper-bundle.min.js" />
        <Script src="/assets/js/jquery.meanmenu.min.js" />
        <Script src="/assets/js/jquery.magnific-popup.min.js" />
        <Script src="/assets/js/jquery.waypoints.js" />
        <Script src="/assets/js/jquery.counterup.min.js" />
        <Script src="/assets/js/wow.min.js" />
        <Script src="/assets/js/main.js" />
      </body>
    </html>
  );
}
