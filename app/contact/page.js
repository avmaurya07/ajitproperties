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
      ? { phone: contact.phone, email: contact.email, address: contact.address }
      : { phone: "", email: "", address: "" };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return { phone: "", email: "", address: "" };
  }
}

export default async function ContactPage() {
  const contactData = await getContactData();
  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Contact Us" },
  ];

  const template = `<h2>Contact Us</h2><p>We would love to hear from you. Whether you have questions about a property, need expert guidance, or want to discuss investment opportunities, our team at Ajit Properties is always ready to assist you.</p><h3>Get in Touch</h3><p>Please feel free to reach out to us using the contact details below or by filling out the inquiry form. Our representatives will get back to you as soon as possible.</p><h3>Contact Information</h3><ul><li><strong>Phone:</strong> ${contactData.phone}</li><li><strong>Email:</strong> ${contactData.email}</li><li><strong>Office Address:</strong> ${contactData.address}</li><li><strong>Working Hours:</strong> Monday – Saturday, 9:00 AM – 7:00 PM</li></ul><h3>Why Contact Ajit Properties</h3><ul><li>Professional property consultation</li><li>Verified and trusted listings</li><li>Personalized property recommendations</li><li>Transparent and hassle-free process</li></ul><h3>We’re Here to Help</h3><p>Your satisfaction is our priority. Contact us today and let Ajit Properties help you find the right property that matches your needs and budget.</p>`;

  return (
    <>
      <Breadcrumb title="Contact Us" items={breadcrumbItems} />

      <section className="contact-section fix section-padding">
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: template }} />
        </div>
      </section>
    </>
  );
}
