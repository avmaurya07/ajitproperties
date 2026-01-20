import Breadcrumb from "@/app/components/Breadcrumb";
import connectDB from "@/lib/mongodb";
import About from "@/models/About";

export const metadata = {
  title: "About Us - Ajit Properties",
};

async function getAboutData() {
  try {
    await connectDB();
    const about = await About.findOne().lean();
    return about
      ? { content: about.content }
      : { content: "<p>About Us content not available.</p>" };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return { content: "<p>About Us content not available.</p>" };
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutData();
  const breadcrumbItems = [{ label: "Home", link: "/" }, { label: "About Us" }];

  return (
    <>
      <Breadcrumb title="About Us" items={breadcrumbItems} />

      <section className="about-section section-padding">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: aboutData.content }} />
        </div>
      </section>
    </>
  );
}
