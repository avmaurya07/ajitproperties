import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Breadcrumb from "@/app/components/Breadcrumb";
import PropertyCard from "@/app/components/PropertyCard";
import RangeFilter from "@/app/components/RangeFilter";
import Link from "next/link";
import { notFound } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import FooterModel from "@/models/Footer";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Properties - Ajit Properties",
};

const PROPERTIES_PER_PAGE = 12;
const ALLOWED_CATEGORIES = [
  "apartment",
  "house",
  "villa",
  "condo",
  "land",
  "commercial",
];

/* ----------------------------- PROPERTIES ----------------------------- */
async function getPropertiesWithPagination(page = 1, category, filters = {}) {
  try {
    await connectDB();

    const safePage = page > 0 ? page : 1;
    const skip = (safePage - 1) * PROPERTIES_PER_PAGE;

    const filter = {
      available: true,
      type: category,
      ...filters,
    };

    const [properties, totalCount] = await Promise.all([
      Property.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(PROPERTIES_PER_PAGE)
        .lean(),
      Property.countDocuments(filter),
    ]);

    return {
      properties: properties.map((property) => ({
        _id: property._id?.toString(),
        slug: property.slug || "",
        name: property.name || "",
        price: property.price ?? 0,
        location: property.location || "",
        bedrooms: property.bedrooms ?? 0,
        bathrooms: property.bathrooms ?? 0,
        area: property.area ?? "",
        images: Array.isArray(property.images) ? property.images : [],
        featured: !!property.featured,
        available: !!property.available,
        type: property.type || "",
        status: property.status || "",
        createdBy: property.createdBy ? property.createdBy.toString() : null,
        createdAt: property.createdAt ? property.createdAt.toISOString() : null,
        updatedAt: property.updatedAt ? property.updatedAt.toISOString() : null,
      })),
      totalPages: Math.max(1, Math.ceil(totalCount / PROPERTIES_PER_PAGE)),
      currentPage: safePage,
      totalCount,
    };
  } catch (error) {
    console.error("❌ Error fetching properties:", error);
    return {
      properties: [],
      totalPages: 1,
      currentPage: 1,
      totalCount: 0,
    };
  }
}

async function getGlobalStats(category) {
  try {
    await connectDB();
    const matchStage = category ? { type: category } : {};
    const stats = await Property.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
          minArea: { $min: "$area" },
          maxArea: { $max: "$area" },
          maxBedrooms: { $max: "$bedrooms" },
          maxBathrooms: { $max: "$bathrooms" },
        },
      },
    ]);
    if (stats.length > 0) {
      return {
        price: {
          min: stats[0].minPrice || 0,
          max: stats[0].maxPrice || 1000000,
        },
        area: {
          min: stats[0].minArea || 0,
          max: stats[0].maxArea || 10000,
        },
        bedrooms: {
          max: stats[0].maxBedrooms || 10,
        },
        bathrooms: {
          max: stats[0].maxBathrooms || 10,
        },
      };
    }
  } catch (error) {
    console.error("❌ Error fetching stats:", error);
  }
  return {
    price: { min: 0, max: 1000000 },
    area: { min: 0, max: 10000 },
    bedrooms: { max: 10 },
    bathrooms: { max: 10 },
  };
}

/* ------------------------------- FOOTER ------------------------------- */
async function getFooterData() {
  try {
    await connectDB();
    const footer = await FooterModel.findOne().lean();
    if (footer) return footer;
  } catch (error) {
    console.error("❌ Error fetching footer data:", error);
  }

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
    copyright: "© 2025 Powered By <b>Ajit Properties</b>. All Rights Reserved.",
    socialLinks: {
      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",
      youtube: "",
      whatsapp: "",
    },
  };
}

export default async function PropertiesPage({ params, searchParams }) {
  const { id } = await params;
  const categoryParam = id?.toLowerCase();
  if (!categoryParam || !ALLOWED_CATEGORIES.includes(categoryParam)) {
    notFound();
  }
  const {
    page,
    bedrooms,
    bathrooms,
    area,
    minArea,
    maxArea,
    minPrice,
    maxPrice,
    location,
  } = await searchParams;

  const filters = {};
  if (bedrooms) filters.bedrooms = { $gte: parseInt(bedrooms) };
  if (bathrooms) filters.bathrooms = { $gte: parseInt(bathrooms) };

  // Area Filter (Single Slider, min area)
  if (area) {
    filters.area = { $gte: parseInt(area) };
  } else if (minArea || maxArea) {
    // Keep fallback for legacy/url support if needed, or just prioritize area
    filters.area = {};
    if (minArea) filters.area.$gte = parseInt(minArea);
    if (maxArea) filters.area.$lte = parseInt(maxArea);
  }

  // Price Range Filter
  if (minPrice || maxPrice) {
    filters.price = {};
    if (minPrice) filters.price.$gte = parseInt(minPrice);
    if (maxPrice) filters.price.$lte = parseInt(maxPrice);
  }
  if (location) filters.location = { $regex: location, $options: "i" };

  const [{ properties, totalPages, currentPage }, footerData, globalStats] =
    await Promise.all([
      getPropertiesWithPagination(page, categoryParam, filters),
      getFooterData(),
      getGlobalStats(categoryParam),
    ]);

  const categoryTitle =
    categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Properties", link: "/properties" },
    { label: categoryTitle },
  ];

  const currentFilters = {
    bedrooms,
    bathrooms,
    area,
    minPrice,
    maxPrice,
    location,
  };

  function buildQuery(params) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, value);
      }
    });
    return query.toString();
  }

  return (
    <>
      <Header />

      <Breadcrumb
        title={`${categoryTitle} Properties`}
        items={breadcrumbItems}
      />

      <section className="section-padding">
        <div className="container">
          <div className="row">
            {/* ================= LEFT FILTER SIDEBAR ================= */}
            <aside className="col-lg-3 col-md-4 mb-4">
              <div
                className="filter-sidebar"
                style={{
                  background: "#ffffff",
                  padding: "24px",
                  borderRadius: "12px",
                  boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                  position: "sticky",
                  top: "90px",
                  maxHeight: "calc(100vh - 120px)",
                  overflowY: "auto",
                }}
              >
                <h5 className="mb-4 fw-bold">Filter Properties</h5>

                <form method="GET" action={`/properties/${categoryParam}`}>
                  {/* Location */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={location || ""}
                      className="form-control"
                      placeholder="Enter location"
                    />
                  </div>

                  {/* Bedrooms */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Min Bedrooms
                    </label>
                    <select
                      name="bedrooms"
                      defaultValue={bedrooms || ""}
                      className="form-select"
                    >
                      <option value="">Any</option>
                      {Array.from(
                        { length: globalStats.bedrooms.max + 1 },
                        (_, i) => (
                          <option key={i} value={i}>
                            {i}+
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* Bathrooms */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Min Bathrooms
                    </label>
                    <select
                      name="bathrooms"
                      defaultValue={bathrooms || ""}
                      className="form-select"
                    >
                      <option value="">Any</option>
                      {Array.from(
                        { length: globalStats.bathrooms.max + 1 },
                        (_, i) => (
                          <option key={i} value={i}>
                            {i}+
                          </option>
                        ),
                      )}
                    </select>
                  </div>

                  {/* Area */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold mb-3">
                      Min Area (sq ft)
                    </label>
                    <RangeFilter
                      key={`area-${area || "default"}`}
                      isSingle={true}
                      min={0}
                      max={globalStats.area.max}
                      initialMin={area}
                      name="area"
                      format="area"
                    />
                  </div>

                  {/* Price */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold mb-3">
                      Price Range
                    </label>
                    <RangeFilter
                      key={`price-${minPrice || "min"}-${maxPrice || "max"}`}
                      min={globalStats.price.min}
                      max={globalStats.price.max}
                      initialMin={minPrice}
                      initialMax={maxPrice}
                      minName="minPrice"
                      maxName="maxPrice"
                      format="currency"
                    />
                  </div>

                  {/* Buttons */}
                  <button className="btn btn-primary w-100 mb-2">
                    Apply Filters
                  </button>

                  <a
                    href={`/properties/${categoryParam}`}
                    className="btn btn-outline-secondary w-100"
                  >
                    Clear Filters
                  </a>
                </form>
              </div>
            </aside>

            {/* ================= RIGHT PROPERTY GRID ================= */}
            <div className="col-lg-9 col-md-8">
              {properties.length > 0 ? (
                <>
                  <div className="row g-4">
                    {properties.map((property) => (
                      <PropertyCard key={property._id} property={property} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="page-nav-wrap text-center pt-5">
                      <ul>
                        {currentPage > 1 && (
                          <li>
                            <Link
                              className="page-numbers icon"
                              href={`/properties/${categoryParam}?${buildQuery({
                                ...currentFilters,
                                page: currentPage - 1,
                              })}`}
                            >
                              <i className="fa-solid fa-arrow-left-long"></i>
                            </Link>
                          </li>
                        )}

                        {Array.from(
                          { length: Math.min(totalPages, 10) },
                          (_, i) => i + 1,
                        ).map((pageNum) => (
                          <li key={pageNum}>
                            <Link
                              className={`page-numbers ${
                                pageNum === currentPage ? "current" : ""
                              }`}
                              href={`/properties/${categoryParam}?${buildQuery({
                                ...currentFilters,
                                page: pageNum,
                              })}`}
                            >
                              {pageNum.toString().padStart(2, "0")}
                            </Link>
                          </li>
                        ))}

                        {currentPage < totalPages && (
                          <li>
                            <Link
                              className="page-numbers icon"
                              href={`/properties/${categoryParam}?${buildQuery({
                                ...currentFilters,
                                page: currentPage + 1,
                              })}`}
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
                <div className="text-center py-5">
                  <h3>No properties found</h3>
                  <p>Try adjusting filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
