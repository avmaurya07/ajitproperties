import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";

export default async function sitemap() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://www.ajitproperties.com";

  try {
    // Connect to database
    await connectDB();

    // Fetch all available properties
    const properties = await Property.find({ available: true })
      .select("slug updatedAt")
      .lean();

    // Generate property URLs
    const propertyUrls = properties.map((property) => ({
      url: `${baseUrl}/property/${property.slug}`,
      lastModified: property.updatedAt || new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Static routes
    const staticRoutes = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/properties`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];

    // Combine all routes
    return [...staticRoutes, ...propertyUrls];
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Return static routes only if database fetch fails
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}/properties`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
    ];
  }
}
