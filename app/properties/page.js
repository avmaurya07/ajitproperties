import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/app/components/Breadcrumb";
import PropertyCard from "@/app/components/PropertyCard";
import Link from "next/link";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import FooterModel from "@/models/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Properties - Ajit Properties",
};

const PROPERTIES_PER_PAGE = 12;

async function getPropertiesWithPagination(page = 1) {
  try {
    await connectDB();

    const skip = (page - 1) * PROPERTIES_PER_PAGE;

    const [properties, totalCount] = await Promise.all([
      Property.find({ available: true })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PROPERTIES_PER_PAGE)
        .lean()
        .exec(),
      Property.countDocuments({ available: true }),
    ]);

    return {
      properties: properties.map((property) => ({
        _id: property._id.toString(),
        slug: property.slug,
        name: property.name,
        price: property.price,
        location: property.location,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        images: property.images || [],
        featured: property.featured,
        available: property.available,
        type: property.type,
        status: property.status,
        createdBy: property.createdBy.toString(),
        createdAt: property.createdAt.toISOString(),
        updatedAt: property.updatedAt.toISOString(),
      })),
      totalPages: Math.ceil(totalCount / PROPERTIES_PER_PAGE),
      currentPage: page,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching properties:", error);
    return {
      properties: [],
      totalPages: 0,
      currentPage: 1,
      totalCount: 0,
    };
  }
}

async function getFooterData() {
  try {
    await connectDB();
    const footer = await FooterModel.findOne().lean();
    if (!footer) {
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

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const { properties, totalPages, currentPage, totalCount } =
    await getPropertiesWithPagination(page);
  const footerData = await getFooterData();

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Our Properties" },
  ];

  return (
    <>
      <Header />
      <Breadcrumb title="Our Properties" items={breadcrumbItems} />

      <section className="project-section fix section-padding">
        <div className="container">
          {properties.length > 0 ? (
            <>
              <div className="row g-4">
                {properties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="page-nav-wrap text-center pt-5">
                  <ul>
                    {currentPage > 1 && (
                      <li>
                        <Link
                          className="page-numbers icon"
                          href={`/properties?page=${currentPage - 1}`}
                        >
                          <i className="fa-solid fa-arrow-left-long"></i>
                        </Link>
                      </li>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (pageNum) => (
                        <li key={pageNum}>
                          <Link
                            className={`page-numbers ${pageNum === currentPage ? "current" : ""}`}
                            href={`/properties?page=${pageNum}`}
                          >
                            {pageNum.toString().padStart(2, "0")}
                          </Link>
                        </li>
                      ),
                    )}

                    {currentPage < totalPages && (
                      <li>
                        <Link
                          className="page-numbers icon"
                          href={`/properties?page=${currentPage + 1}`}
                        >
                          <i className="fa-solid fa-arrow-right-long"></i>
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="row">
              <div className="col-12 text-center py-5">
                <h3 className="text-gray-600">
                  No properties available at the moment.
                </h3>
                <p className="text-gray-500 mt-3">
                  Please check back later for new listings.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
