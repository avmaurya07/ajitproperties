import Breadcrumb from "@/app/components/Breadcrumb";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export const metadata = {
  title: "Contact Us - Ajit Properties",
};

async function getContactData() {
  try {
    await connectDB();
    const contact = await Contact.findOne().lean();
    return contact
      ? { content: contact.content }
      : { content: "<p>Contact Us content not available.</p>" };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return { content: "<p>Contact Us content not available.</p>" };
  }
}

export default async function ContactPage() {
  const contactData = await getContactData();
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Contact Us" },
  ];

  return (
    <>
      <Breadcrumb title="Contact Us" items={breadcrumbItems} />

      <section className="contact-section fix section-padding">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: contactData.content }} />
        </div>
      </section>
    </>
  );
}
