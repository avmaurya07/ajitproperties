import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/app/components/Breadcrumb";
import Image from "next/image";
import MediaGallery from "@/app/components/MediaGallery";
import ReactMarkdown from "react-markdown";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getPropertyBySlug(slug) {
  try {
    await connectDB();
    const property = await Property.findOne({ slug }).lean().exec();

    if (!property) {
      return null;
    }

    return {
      _id: property._id.toString(),
      slug: property.slug,
      name: property.name,
      price: property.price,
      pricePeriod: property.pricePeriod,
      location: property.location,
      type: property.type,
      status: property.status,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      description: property.description,
      features: property.features || [],
      images: property.images || [],
      videos: property.videos || [],
      available: property.available,
      email: property.email,
      phone: property.phone,
      createdAt: property.createdAt.toISOString(),
      updatedAt: property.updatedAt.toISOString(),
    };
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const property = await getPropertyBySlug(id);

  if (!property) {
    return {
      title: "Property Not Found - Ajit Properties",
    };
  }

  return {
    title: `${property.name} - Ajit Properties`,
    description: property.description.substring(0, 160),
  };
}

export default async function PropertyDetailsPage({ params }) {
  const { id } = await params;
  const property = await getPropertyBySlug(id);

  if (!property) {
    notFound();
  }

  const formatPrice = (price) => {
    if (!price) return "N/A";
    if (price >= 10000000) {
      return `₹${(price / 10000000).toFixed(2)} Cr`;
    } else if (price >= 100000) {
      return `₹${(price / 100000).toFixed(2)} Lac`;
    } else if (price >= 1000) {
      return `₹${(price / 1000).toFixed(0)}K`;
    }
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const getPricePeriod = (period) => {
    const periods = {
      day: "/Day",
      week: "/Week",
      month: "/Month",
      year: "/Year",
      total: "",
    };
    return periods[period] || "";
  };

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Properties", link: "/properties" },
    { label: property.name },
  ];

  return (
    <>
      <Header />
      <Breadcrumb title={property.name} items={breadcrumbItems} />

      <section className="propertie-section fix section-padding">
        <div className="container">
          <div className="propertie-details-wrapper">
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="propertie-details-wrapper">
                  <MediaGallery
                    images={property.images}
                    videos={property.videos}
                    propertyName={property.name}
                  />

                  <div className="details-content">
                    <div className="flex items-center justify-between mb-4">
                      <span className="location">
                        <i className="fa-solid fa-location-dot"></i>{" "}
                        {property.location}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className="badge bg-blue-600 text-white px-4 py-2 rounded-md font-semibold">
                          {formatPrice(property.price)}
                          {getPricePeriod(property.pricePeriod)}
                        </span>
                        {!property.available && (
                          <span className="badge bg-red-600 text-white px-4 py-2 rounded-md font-semibold">
                            Not Available
                          </span>
                        )}
                      </div>
                    </div>
                    <h2>{property.name}</h2>

                    <div className="prose max-w-none mt-4">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {property.description}
                      </p>
                    </div>

                    <div className="list-items">
                      <h3>Property Overview</h3>
                      <ul>
                        {property.area > 0 && (
                          <li>
                            <Image
                              src="/assets/img/home-1/project/full-screen.png"
                              alt="Area"
                              width={20}
                              height={20}
                            />
                            {property.area} sqft
                          </li>
                        )}
                        {property.bedrooms > 0 && (
                          <li>
                            <Image
                              src="/assets/img/home-1/project/bed.png"
                              alt="Bedrooms"
                              width={20}
                              height={20}
                            />
                            {property.bedrooms} Bedroom
                            {property.bedrooms > 1 ? "s" : ""}
                          </li>
                        )}
                        {property.bathrooms > 0 && (
                          <li>
                            <Image
                              src="/assets/img/home-1/project/user.png"
                              alt="Bathrooms"
                              width={20}
                              height={20}
                            />
                            {property.bathrooms} Bath
                            {property.bathrooms > 1 ? "s" : ""}
                          </li>
                        )}
                        <li>
                          <Image
                            src="/assets/img/home-1/project/full-screen.png"
                            alt="Type"
                            width={20}
                            height={20}
                          />
                          Type:{" "}
                          {property.type.charAt(0).toUpperCase() +
                            property.type.slice(1)}
                        </li>
                        <li>
                          <Image
                            src="/assets/img/home-1/project/bed.png"
                            alt="Status"
                            width={20}
                            height={20}
                          />
                          Status:{" "}
                          {property.status.charAt(0).toUpperCase() +
                            property.status.slice(1)}
                        </li>
                      </ul>
                    </div>

                    {property.features.length > 0 && (
                      <div className="list-items-2">
                        <h3>Features & Amenities</h3>
                        <div className="list-wrap">
                          {property.features.map((feature, idx) => (
                            <ul key={idx}>
                              <li>
                                <i className="flaticon-right-arrow"></i>{" "}
                                {feature}
                              </li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="propertie-details-sidebar">
                  <div className="propertie-sidebar-item mt-0">
                    <h3>Property Contact</h3>
                    <ul className="contact-list">
                      <li>
                        <div className="icon">
                          <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="content">
                          <span>Address</span>
                          <h4>{property.location}</h4>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className="content">
                          <span>Phone</span>
                          <h4>
                            <a href={`tel:${property.phone}`}>
                              {property.phone}
                            </a>
                          </h4>
                        </div>
                      </li>
                      <li>
                        <div className="icon">
                          <i className="fa-solid fa-envelopes"></i>
                        </div>
                        <div className="content">
                          <span>Email</span>
                          <h4>
                            <a href={`mailto:${property.email}`}>
                              {property.email}
                            </a>
                          </h4>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="propertie-sidebar-item">
                    <h3>Contact Listing Owner</h3>
                    <form>
                      <div className="row g-4">
                        <div className="col-sm-12">
                          <div className="form-clt">
                            <input
                              type="text"
                              name="name"
                              placeholder="Full Name"
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-clt">
                            <input
                              type="email"
                              name="email"
                              placeholder="Email address"
                            />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="form-clt">
                            <textarea
                              name="message"
                              placeholder="Message Here"
                            ></textarea>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <button className="theme-btn" type="submit">
                            SUBMIT NOW
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
