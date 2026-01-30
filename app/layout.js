import Script from "next/script";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import PageLoader from "@/app/components/PageLoader";
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
      throw new Error("Footer data not found in database");
    }

    return footer;
  } catch (error) {
    console.error("Error fetching footer data:", error);
    throw error;
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
        <PageLoader />
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
