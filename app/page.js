import Header from "@/app/components/Header";
import PropertyCard from "@/app/components/PropertyCard";
import ContactForm from "@/app/components/ContactForm";
import FeaturedPropertiesSlider from "@/app/components/FeaturedPropertiesSlider";
import Link from "next/link";

import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Property from "@/models/Property";
import FooterModel from "@/models/Footer";
import HomeHero from "@/models/HomeHero";
import HouseOffer from "@/models/HouseOffer";
import HomeAbout from "@/models/HomeAbout";
import PropertyFeature from "@/models/PropertyFeature";
import HomeCounter from "@/models/HomeCounter";
import HomeTestimonial from "@/models/HomeTestimonial";
import HomeContact from "@/models/HomeContact";
import HomeVideo from "@/models/HomeVideo";
import HomeProject from "@/models/HomeProject";
import { navigate } from "next/dist/client/components/segment-cache/navigation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Ajit Properties - Real Estate Properties",
  description: "Find your dream property with Ajit Properties",
};

async function getFeaturedProperties() {
  try {
    await connectDB();

    const properties = await Property.find({ featured: true, available: true })
      .limit(10)
      .sort({ createdAt: -1 })
      .lean()
      .exec();

    return properties.map((property) => ({
      _id: property._id.toString(),
      slug: property.slug,
      name: property.name,
      price: property.price,
      location: property.location,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      area: property.area,
      images: property.images || [],
      available: property.available,
      createdBy: property.createdBy.toString(),
      createdAt: property.createdAt.toISOString(),
      updatedAt: property.updatedAt.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
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
}
async function getHomeHeroData() {
  try {
    await connectDB();
    const hero = await HomeHero.findOne().lean();
    if (!hero) {
      return {
        subtitle: "SEARCH SMART. LIVE SMART",
        title: "Find Your Dream Property With Us",
        description:
          "Discover the perfect home that fits your lifestyle and budget. Browse our exclusive listings and find your ideal property today.",
        backgroundImage: "/assets/img/home-1/hero/hero-bg.jpg",
        searchTabs: [
          {
            name: "General",
            fields: [
              {
                label: "Location",
                placeholder: "Enter Location",
                type: "text",
              },
              {
                label: "Property Type",
                placeholder: "Select Type",
                type: "select",
                options: ["Apartment", "House", "Villa"],
              },
              {
                label: "Price Range",
                placeholder: "Select Range",
                type: "select",
                options: ["$0-$100k", "$100k-$500k", "$500k+"],
              },
            ],
          },
          {
            name: "Advanced",
            fields: [
              {
                label: "Bedrooms",
                placeholder: "Min Bedrooms",
                type: "number",
              },
              {
                label: "Bathrooms",
                placeholder: "Min Bathrooms",
                type: "number",
              },
              {
                label: "Area (sq ft)",
                placeholder: "Min Area",
                type: "number",
              },
            ],
          },
        ],
        ctaButton: {
          text: "Search Now",
          link: "/properties",
        },
      };
    }
    // Ensure all required fields exist with defaults
    return {
      ...hero,
      searchTabs: hero.searchTabs || [
        {
          name: "General",
          fields: [
            {
              label: "Location",
              placeholder: "Enter Location",
              type: "text",
            },
            {
              label: "Property Type",
              placeholder: "Select Type",
              type: "select",
              options: ["Apartment", "House", "Villa"],
            },
            {
              label: "Price Range",
              placeholder: "Select Range",
              type: "select",
              options: ["$0-$100k", "$100k-$500k", "$500k+"],
            },
          ],
        },
        {
          name: "Advanced",
          fields: [
            {
              label: "Bedrooms",
              placeholder: "Min Bedrooms",
              type: "number",
            },
            {
              label: "Bathrooms",
              placeholder: "Min Bathrooms",
              type: "number",
            },
            {
              label: "Area (sq ft)",
              placeholder: "Min Area",
              type: "number",
            },
          ],
        },
      ],
      ctaButton: hero.ctaButton || {
        text: "Search Now",
        link: "/properties",
      },
    };
  } catch (error) {
    console.error("Error fetching hero data:", error);
    return {
      subtitle: "SEARCH SMART. LIVE SMART",
      title: "Find Your Dream Property With Us",
      description:
        "Discover the perfect home that fits your lifestyle and budget. Browse our exclusive listings and find your ideal property today.",
      backgroundImage: "/assets/img/home-1/hero/hero-bg.jpg",
      searchTabs: [
        {
          name: "General",
          fields: [
            { label: "Location", placeholder: "Enter Location", type: "text" },
            {
              label: "Property Type",
              placeholder: "Select Type",
              type: "select",
              options: ["Apartment", "House", "Villa"],
            },
            {
              label: "Price Range",
              placeholder: "Select Range",
              type: "select",
              options: ["$0-$100k", "$100k-$500k", "$500k+"],
            },
          ],
        },
        {
          name: "Advanced",
          fields: [
            { label: "Bedrooms", placeholder: "Min Bedrooms", type: "number" },
            {
              label: "Bathrooms",
              placeholder: "Min Bathrooms",
              type: "number",
            },
            { label: "Area (sq ft)", placeholder: "Min Area", type: "number" },
          ],
        },
      ],
      ctaButton: {
        text: "Search Now",
        link: "/properties",
      },
    };
  }
}

async function getHouseOffersData() {
  try {
    await connectDB();
    const offers = await HouseOffer.findOne().lean();
    if (!offers) {
      return {
        title: "House Offers",
        subtitle: "Best Deals",
        offers: [
          {
            icon: "flaticon-home",
            title: "Buy Property",
            description:
              "Find your perfect home from our extensive collection of properties.",
            link: "/properties",
          },
          {
            icon: "flaticon-house",
            title: "Sell Property",
            description:
              "Get the best value for your property with our expert selling services.",
            link: "/contact",
          },
          {
            icon: "flaticon-rent",
            title: "Rent Property",
            description:
              "Browse rental properties that suit your lifestyle and budget.",
            link: "/properties",
          },
        ],
      };
    }
    // Ensure offers field exists with defaults
    return {
      ...offers,
      offers: offers.offers || [
        {
          icon: "flaticon-home",
          title: "Buy Property",
          description:
            "Find your perfect home from our extensive collection of properties.",
          link: "/properties",
        },
        {
          icon: "flaticon-house",
          title: "Sell Property",
          description:
            "Get the best value for your property with our expert selling services.",
          link: "/contact",
        },
        {
          icon: "flaticon-rent",
          title: "Rent Property",
          description:
            "Browse rental properties that suit your lifestyle and budget.",
          link: "/properties",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching house offers data:", error);
    return {
      title: "House Offers",
      subtitle: "Best Deals",
      offers: [
        {
          icon: "flaticon-home",
          title: "Buy Property",
          description:
            "Find your perfect home from our extensive collection of properties.",
          link: "/properties",
        },
        {
          icon: "flaticon-house",
          title: "Sell Property",
          description:
            "Get the best value for your property with our expert selling services.",
          link: "/contact",
        },
        {
          icon: "flaticon-rent",
          title: "Rent Property",
          description:
            "Browse rental properties that suit your lifestyle and budget.",
          link: "/properties",
        },
      ],
    };
  }
}

async function getHomeAboutData() {
  try {
    await connectDB();
    const about = await HomeAbout.findOne().lean();
    if (!about) {
      return {
        title: "About Us",
        subtitle: "Who We Are",
        description:
          "We are a leading real estate company dedicated to helping you find your dream property. With years of experience and a team of expert professionals, we provide comprehensive real estate services.",
        image: "/assets/img/home-1/about/about-1.jpg",
        features: [
          {
            icon: "flaticon-experience",
            title: "15+ Years Experience",
            description: "Over 15 years of experience in real estate industry.",
          },
          {
            icon: "flaticon-award",
            title: "Award Winning",
            description: "Recognized for excellence in real estate services.",
          },
          {
            icon: "flaticon-support",
            title: "24/7 Support",
            description: "Round the clock customer support for all your needs.",
          },
        ],
        button: {
          text: "Learn More",
          link: "/about",
        },
        stats: {
          count: "697",
          suffix: "k+",
          label: "LISTED PROPERTIES",
        },
        phone: "+208-6666-0112",
      };
    }
    // Ensure button and features fields exist with defaults
    return {
      ...about,
      button: about.button || {
        text: "Learn More",
        link: "/about",
      },
      features: about.features || [
        {
          icon: "flaticon-experience",
          title: "15+ Years Experience",
          description: "Over 15 years of experience in real estate industry.",
        },
        {
          icon: "flaticon-award",
          title: "Award Winning",
          description: "Recognized for excellence in real estate services.",
        },
        {
          icon: "flaticon-support",
          title: "24/7 Support",
          description: "Round the clock customer support for all your needs.",
        },
      ],
      stats: about.stats || {
        count: "697",
        suffix: "k+",
        label: "LISTED PROPERTIES",
      },
      phone: about.phone || "+208-6666-0112",
    };
  } catch (error) {
    console.error("Error fetching about data:", error);
    return {
      title: "About Us",
      subtitle: "Who We Are",
      description:
        "We are a leading real estate company dedicated to helping you find your dream property. With years of experience and a team of expert professionals, we provide comprehensive real estate services.",
      image: "/assets/img/home-1/about/about-1.jpg",
      features: [
        {
          icon: "flaticon-experience",
          title: "15+ Years Experience",
          description: "Over 15 years of experience in real estate industry.",
        },
        {
          icon: "flaticon-award",
          title: "Award Winning",
          description: "Recognized for excellence in real estate services.",
        },
        {
          icon: "flaticon-support",
          title: "24/7 Support",
          description: "Round the clock customer support for all your needs.",
        },
      ],
      button: {
        text: "Learn More",
        link: "/about",
      },
      stats: {
        count: "697",
        suffix: "k+",
        label: "LISTED PROPERTIES",
      },
      phone: "+208-6666-0112",
    };
  }
}

async function getPropertyFeaturesData() {
  try {
    await connectDB();
    const features = await PropertyFeature.findOne().lean();
    if (!features) {
      return {
        title: "Property Features",
        subtitle: "What We Offer",
        features: [
          {
            icon: "flaticon-swimming-pool",
            title: "Swimming Pool",
            description: "Enjoy luxury living with private swimming pools.",
          },
          {
            icon: "flaticon-gym",
            title: "Fitness Center",
            description: "Stay fit with our state-of-the-art gym facilities.",
          },
          {
            icon: "flaticon-parking",
            title: "Parking Space",
            description: "Convenient parking spaces for all residents.",
          },
          {
            icon: "flaticon-security",
            title: "24/7 Security",
            description: "Round the clock security for your peace of mind.",
          },
        ],
      };
    }
    // Ensure features field exists with defaults
    return {
      ...features,
      features: features.features || [
        {
          icon: "flaticon-swimming-pool",
          title: "Swimming Pool",
          description: "Enjoy luxury living with private swimming pools.",
        },
        {
          icon: "flaticon-gym",
          title: "Fitness Center",
          description: "Stay fit with our state-of-the-art gym facilities.",
        },
        {
          icon: "flaticon-parking",
          title: "Parking Space",
          description: "Convenient parking spaces for all residents.",
        },
        {
          icon: "flaticon-security",
          title: "24/7 Security",
          description: "Round the clock security for your peace of mind.",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching property features data:", error);
    return {
      title: "Property Features",
      subtitle: "What We Offer",
      features: [
        {
          icon: "flaticon-swimming-pool",
          title: "Swimming Pool",
          description: "Enjoy luxury living with private swimming pools.",
        },
        {
          icon: "flaticon-gym",
          title: "Fitness Center",
          description: "Stay fit with our state-of-the-art gym facilities.",
        },
        {
          icon: "flaticon-parking",
          title: "Parking Space",
          description: "Convenient parking spaces for all residents.",
        },
        {
          icon: "flaticon-security",
          title: "24/7 Security",
          description: "Round the clock security for your peace of mind.",
        },
      ],
    };
  }
}

async function getHomeCounterData() {
  try {
    await connectDB();
    const counter = await HomeCounter.findOne().lean();
    if (!counter) {
      return {
        counters: [
          {
            icon: "flaticon-home",
            count: 1250,
            suffix: "+",
            title: "Properties Sold",
          },
          {
            icon: "flaticon-user",
            count: 850,
            suffix: "+",
            title: "Happy Clients",
          },
          {
            icon: "flaticon-award",
            count: 25,
            suffix: "+",
            title: "Awards Won",
          },
          {
            icon: "flaticon-experience",
            count: 15,
            suffix: "+",
            title: "Years Experience",
          },
        ],
      };
    }
    // Ensure counters field exists with defaults
    return {
      ...counter,
      counters: counter.counters || [
        {
          icon: "flaticon-home",
          count: 1250,
          suffix: "+",
          title: "Properties Sold",
        },
        {
          icon: "flaticon-user",
          count: 850,
          suffix: "+",
          title: "Happy Clients",
        },
        {
          icon: "flaticon-award",
          count: 25,
          suffix: "+",
          title: "Awards Won",
        },
        {
          icon: "flaticon-experience",
          count: 15,
          suffix: "+",
          title: "Years Experience",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching counter data:", error);
    return {
      counters: [
        {
          icon: "flaticon-home",
          count: 1250,
          suffix: "+",
          title: "Properties Sold",
        },
        {
          icon: "flaticon-user",
          count: 850,
          suffix: "+",
          title: "Happy Clients",
        },
        {
          icon: "flaticon-award",
          count: 25,
          suffix: "+",
          title: "Awards Won",
        },
        {
          icon: "flaticon-experience",
          count: 15,
          suffix: "+",
          title: "Years Experience",
        },
      ],
    };
  }
}

async function getHomeTestimonialsData() {
  try {
    await connectDB();
    const testimonials = await HomeTestimonial.findOne().lean();
    if (!testimonials) {
      return {
        title: "Testimonials",
        subtitle: "What Our Clients Say",
        description:
          "Discover what our satisfied homeowners have to say about their journey. Real stories, real experiences, and real trust—built one home at a time.",
        testimonials: [
          {
            name: "John Doe",
            position: "Home Buyer",
            image: "/assets/img/home-1/testimonial/testimonial-1.jpg",
            rating: 5,
            review:
              "Excellent service! They helped me find my dream home within my budget. Highly recommended.",
          },
          {
            name: "Jane Smith",
            position: "Property Seller",
            image: "/assets/img/home-1/testimonial/testimonial-2.jpg",
            rating: 5,
            review:
              "Professional team with great knowledge of the market. Sold my property quickly at a good price.",
          },
          {
            name: "Mike Johnson",
            position: "Investor",
            image: "/assets/img/home-1/testimonial/testimonial-3.jpg",
            rating: 5,
            review:
              "Outstanding investment advice and property management services. Very satisfied with their work.",
          },
        ],
      };
    }
    // Ensure testimonials field exists with defaults
    return {
      ...testimonials,
      description:
        testimonials.description ||
        "Discover what our satisfied homeowners have to say about their journey. Real stories, real experiences, and real trust—built one home at a time.",
      testimonials: testimonials.testimonials || [
        {
          name: "John Doe",
          position: "Home Buyer",
          image: "/assets/img/home-1/testimonial/testimonial-1.jpg",
          rating: 5,
          review:
            "Excellent service! They helped me find my dream home within my budget. Highly recommended.",
        },
        {
          name: "Jane Smith",
          position: "Property Seller",
          image: "/assets/img/home-1/testimonial/testimonial-2.jpg",
          rating: 5,
          review:
            "Professional team with great knowledge of the market. Sold my property quickly at a good price.",
        },
        {
          name: "Mike Johnson",
          position: "Investor",
          image: "/assets/img/home-1/testimonial/testimonial-3.jpg",
          rating: 5,
          review:
            "Outstanding investment advice and property management services. Very satisfied with their work.",
        },
      ],
    };
  } catch (error) {
    console.error("Error fetching testimonials data:", error);
    return {
      title: "Testimonials",
      subtitle: "What Our Clients Say",
      description:
        "Discover what our satisfied homeowners have to say about their journey. Real stories, real experiences, and real trust—built one home at a time.",
      testimonials: [
        {
          name: "John Doe",
          position: "Home Buyer",
          image: "/assets/img/home-1/testimonial/testimonial-1.jpg",
          rating: 5,
          review:
            "Excellent service! They helped me find my dream home within my budget. Highly recommended.",
        },
        {
          name: "Jane Smith",
          position: "Property Seller",
          image: "/assets/img/home-1/testimonial/testimonial-2.jpg",
          rating: 5,
          review:
            "Professional team with great knowledge of the market. Sold my property quickly at a good price.",
        },
        {
          name: "Mike Johnson",
          position: "Investor",
          image: "/assets/img/home-1/testimonial/testimonial-3.jpg",
          rating: 5,
          review:
            "Outstanding investment advice and property management services. Very satisfied with their work.",
        },
      ],
    };
  }
}

async function getHomeContactData() {
  try {
    await connectDB();
    const contact = await HomeContact.findOne().lean();
    // console.log("Fetched contact data:", contact);
    if (!contact) {
      return {
        title: "Contact Us",
        subtitle: "Get In Touch",
        description:
          "Ready to find your dream property? Contact us today and let our experts help you.",
        contactInfo: {
          phone: "89 (09) 2346 1894",
          email: "example@gmail.com",
          address: "UK, 1212; 102/B New Elephant Road London",
        },
        button: {
          text: "Contact Now",
          link: "/contact",
        },
        mapUrl:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5733634314897!2d100.90275000000001!3d12.8708096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102941744fdc3d1%3A0xeb2643eac204ed35!2sTiger%20Park%20Pattaya!5e0!3m2!1sen!2sin!4v1767354493548!5m2!1sen!2sin",
        formCategories: [
          { name: "Real Estate", value: "real-estate" },
          { name: "Property management", value: "property-management" },
          { name: "Market analysis", value: "market-analysis" },
          { name: "Home interior", value: "home-interior" },
        ],
      };
    }
    return {
      ...contact,
      mapUrl:
        contact.mapUrl ||
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5733634314897!2d100.90275000000001!3d12.8708096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102941744fdc3d1%3A0xeb2643eac204ed35!2sTiger%20Park%20Pattaya!5e0!3m2!1sen!2sin!4v1767354493548!5m2!1sen!2sin",
      formCategories: (contact.formCategories || []).map((cat) => ({
        name: cat.name,
        value: cat.value,
      })) || [
        { name: "Real Estate", value: "real-estate" },
        { name: "Property management", value: "property-management" },
        { name: "Market analysis", value: "market-analysis" },
        { name: "Home interior", value: "home-interior" },
      ],
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return {
      title: "Contact Us",
      subtitle: "Get In Touch",
      description:
        "Ready to find your dream property? Contact us today and let our experts help you.",
      contactInfo: {
        phone: "89 (09) 2346 1894",
        email: "example@gmail.com",
        address: "UK, 1212; 102/B New Elephant Road London",
      },
      button: {
        text: "Contact Now",
        link: "/contact",
      },
      mapUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.5733634314897!2d100.90275000000001!3d12.8708096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3102941744fdc3d1%3A0xeb2643eac204ed35!2sTiger%20Park%20Pattaya!5e0!3m2!1sen!2sin!4v1767354493548!5m2!1sen!2sin",
      formCategories: [
        { name: "Real Estate", value: "real-estate" },
        { name: "Property management", value: "property-management" },
        { name: "Market analysis", value: "market-analysis" },
        { name: "Home interior", value: "home-interior" },
      ],
    };
  }
}

async function getHomeVideoData() {
  try {
    await connectDB();
    const video = await HomeVideo.findOne().lean();
    if (!video) {
      return {
        videoUrl:
          "/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4",
        title: "Works Videos",
        subtitle: "Recently",
      };
    }
    return video;
  } catch (error) {
    console.error("Error fetching video data:", error);
    return {
      videoUrl: "/assets/img/home/WhatsApp Video 2025-12-30 at 2.05.41 PM.mp4",
      title: "Works Videos",
      subtitle: "Recently",
    };
  }
}

async function getHomeProjectData() {
  try {
    await connectDB();
    const projects = await HomeProject.findOne().lean();
    // if (!projects) {
    //   return {
    //     title: "Our Projects",
    //     subtitle: "Recent Works",
    //     projects: [
    //       {
    //         title: "Modern Apartment",
    //         category: "Residential",
    //         image: "/assets/img/home-1/project/project-1.jpg",
    //         link: "#",
    //       },
    //     ],
    //   };
    // }
    // console.log("Fetched projects data:", projects);
    return projects;
  } catch (error) {
    console.error("Error fetching projects data:", error);
    return {
      title: "Our Projects",
      subtitle: "Recent Works",
      projects: [
        {
          title: "Modern Apartment",
          category: "Residential",
          image: "/assets/img/home-1/project/project-1.jpg",
          link: "#",
        },
      ],
    };
  }
}

export default async function HomePage() {
  const featuredProperties = await getFeaturedProperties();
  const footerData = await getFooterData();
  const heroData = await getHomeHeroData();
  const offersData = await getHouseOffersData();
  const aboutData = await getHomeAboutData();
  const featuresData = await getPropertyFeaturesData();
  const counterData = await getHomeCounterData();
  const testimonialsData = await getHomeTestimonialsData();
  const contactData = await getHomeContactData();
  const videoData = await getHomeVideoData();
  const projectsData = await getHomeProjectData();
  return (
    <>
      <Header />

      <section className="hero-section hero-1 fix">
        <div className="container-fluid">
          <div className="row g-4 align-items-center">
            <div className="col-xl-7">
              <div className="hero-content">
                <h5 className="wow fadeInUp">
                  <i className="flaticon-home"></i> {heroData.subtitle}
                </h5>
                <h1 className="wow fadeInUp" data-wow-delay=".2s">
                  {heroData.title.split("<br />").map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < heroData.title.split("<br />").length - 1 && (
                        <br />
                      )}
                    </span>
                  ))}
                </h1>
                <p className="wow fadeInUp" data-wow-delay=".4s">
                  {heroData.description}
                </p>
                <div className="form-area">
                  <ul className="nav">
                    {heroData.searchCategories.map((category, index) => (
                      <li
                        key={index}
                        className="nav-item wow fadeInUp"
                        data-wow-delay={`${0.2 + index * 0.2}s`}
                      >
                        <a
                          href={`#${category.name}`}
                          data-bs-toggle="tab"
                          className={`nav-link ${index === 0 ? "active" : ""}`}
                        >
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <div className="tab-content">
                    {heroData.searchCategories.map((category, index) => (
                      <div
                        key={index}
                        id={category.name}
                        className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                      >
                        <form
                          action={`/properties/${category.value}`}
                          method="get"
                          className="wow fadeInUp"
                          data-wow-delay=".3s"
                        >
                          <div className="row g-4 align-items-center justify-content-between">
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-item">
                                <h6>Location</h6>
                                <input
                                  type="text"
                                  name="location"
                                  placeholder="Looking For?"
                                />
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-item">
                                <h6>Bedrooms</h6>
                                <input
                                  type="number"
                                  name="bedrooms"
                                  placeholder="Min Bedrooms"
                                  min="0"
                                />
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-item">
                                <h6>Bathrooms</h6>
                                <input
                                  type="number"
                                  name="bathrooms"
                                  placeholder="Min Bathrooms"
                                  min="0"
                                />
                              </div>
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
                              <div className="form-item text-align-right">
                                <button type="submit" className="theme-btn">
                                  Search{" "}
                                  <i className="fa-solid fa-magnifying-glass"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                        <div className="button-list">
                          {heroData.buttonLinks.map((link, idx) => (
                            <Link
                              key={idx}
                              href={link.url}
                              className="theme-btn wow fadeInUp"
                              data-wow-delay={`${0.2 + idx * 0.2}s`}
                            >
                              {link.text} <i className={link.icon}></i>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="hero-image">
                <Image
                  src={heroData.backgroundImage}
                  alt="img"
                  width={800}
                  height={900}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="house-offer-section fix section-padding section-bg">
        <div className="container">
          <div className="section-title text-center">
            <h5 className="wow fadeInUp">
              <i className="flaticon-home"></i> {offersData.subtitle}{" "}
              <i className="flaticon-home"></i>
            </h5>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              {offersData.title}
            </h2>
          </div>
          <div className="row row-cols-xl-5 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-1">
            {offersData.offers.map((offer, index) => (
              <div
                key={index}
                className={`col wow fadeInUp${index > 0 ? ` data-wow-delay=".${index * 2}s"` : ""}`}
              >
                <div className="house-offer-box">
                  <div className="icon">
                    <i className={offer.icon}></i>
                  </div>
                  {/* <span>{offer.name}</span> */}
                  <div className="content">
                    <h4>{offer.name}</h4>
                    <p>{offer.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h5 className="text-lg font-semibold text-gray-600 mb-3 uppercase tracking-wide">
              <i className="flaticon-home mr-2"></i> {projectsData.subtitle}
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              {projectsData.title}
            </h2>
          </div>
        </div>
        <FeaturedPropertiesSlider properties={featuredProperties} />
      </section>

      <section className="about-section fix section-bg section-padding pt-0">
        <div className="right-shape">
          <Image
            src={aboutData.rightShapeImage}
            alt="img"
            width={400}
            height={400}
          />
        </div>
        <div className="container">
          <div className="about-wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                <div className="about-image">
                  <Image
                    src={aboutData.mainImage}
                    alt="img"
                    width={600}
                    height={700}
                  />
                  <div className="about-image-2">
                    <Image
                      src={aboutData.secondaryImage}
                      alt="img"
                      width={300}
                      height={300}
                    />
                  </div>
                  <div className="counter-box">
                    <h2>
                      <span className="count">{aboutData.counterValue}</span>
                    </h2>
                    <p>{aboutData.counterLabel}</p>
                  </div>
                  <span className="bar-shape"></span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="about-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> {aboutData.subtitle}
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {aboutData.title}
                    </h2>
                  </div>
                  <p className="about-text wow fadeInUp" data-wow-delay=".5s">
                    {aboutData.description}
                  </p>
                  <ul className="wow fadeInUp" data-wow-delay=".7s">
                    {aboutData.features.map((feature, index) => (
                      <li key={index}>
                        <i className="flaticon-right-arrow"></i> {feature.text}
                      </li>
                    ))}
                  </ul>
                  <div className="about-btn wow fadeInUp" data-wow-delay=".3s">
                    <Link href={aboutData.button.link} className="theme-btn">
                      {aboutData.button.text} <i className="flaticon-home"></i>
                    </Link>
                    <div className="call-info">
                      <div className="icon">
                        <i className="fa-solid fa-phone-xmark"></i>
                      </div>
                      <div className="content">
                        <span>Call Us 24/7</span>
                        <h4>
                          <a
                            href={`tel:${aboutData.phoneNumber.replace(/[^0-9+]/g, "")}`}
                          >
                            {aboutData.phoneNumber}
                          </a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="propertie-feature-section fix bg-cever"
        style={{
          backgroundImage: `url(${featuresData.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="propertie-feature-wrapper">
            <div className="row g-4 align-items-center">
              <div className="col-lg-6">
                <div className="propertie-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> {featuresData.subtitle}
                    </h5>
                    <h2
                      className="text-white wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      {featuresData.title}
                    </h2>
                  </div>
                  <p
                    className="propertie-text wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <span>{featuresData.description}</span>
                  </p>
                  <Link
                    href={featuresData.buttonUrl}
                    className="theme-btn wow fadeInUp"
                    data-wow-delay=".7s"
                  >
                    {featuresData.buttonText} <i className="flaticon-home"></i>
                  </Link>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="propertie-image">
                  <Image
                    src={featuresData.featureImage}
                    alt="img"
                    className="wow img-custom-anim-right"
                    width={700}
                    height={700}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="propertie-section fix section-padding">
        <div className="container">
          <div className="section-title text-center">
            <h5
              className="wow fadeInUp"
              style={{ textTransform: "uppercase" }}
            ></h5>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              {videoData.title}
            </h2>
          </div>
          <div
            className="propertie-wrapper"
            style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
              }}
            >
              <video
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                controls
                autoPlay
                muted
                loop
              >
                <source src={videoData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      <div className="gt-counter-section fix">
        <div className="container">
          <div className="gt-counter-wrapper">
            {counterData.counters.map((counter, index) => (
              <div
                key={index}
                className="gt-counter wow fadeInUp"
                data-wow-delay={`${0.2 + index * 0.2}s`}
              >
                <h2>
                  <span className="count" data-count={counter.value}>
                    {counter.value}
                  </span>
                  {counter.suffix}
                </h2>
                <p>{counter.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="gt-testimonial-section section-padding fix section-bg-3">
        <div className="container">
          <div className="gt-testimonial-wrapper">
            <div className="row g-4">
              <div className="col-lg-6">
                <div className="gt-testimonial-left-content">
                  <div className="section-title mb-0">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i>{" "}
                      {testimonialsData.subtitle}
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {testimonialsData.title}
                    </h2>
                  </div>
                  <p
                    className="gt-testimonial-text wow fadeInUp"
                    data-wow-delay=".4s"
                  >
                    {testimonialsData.description}
                  </p>
                  <div
                    className="gt-client-info wow fadeInUp"
                    data-wow-delay=".6s"
                  >
                    <div className="gt-client-image">
                      <Image
                        src="/assets/img/home-1/testimonial/client-info.png"
                        alt="img"
                        width={150}
                        height={50}
                      />
                    </div>
                    <h3>
                      More then{" "}
                      <span>{testimonialsData.clientReviewCount}</span>{" "}
                      {testimonialsData.clientReviewLabel}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="swiper testimonial-slider">
                  <div className="swiper-wrapper">
                    {testimonialsData.testimonials.map((testimonial, index) => (
                      <div key={index} className="swiper-slide">
                        <div className="gt-testimonial-box">
                          <div className="quote-icon">
                            <Image
                              src="/assets/img/home-1/testimonial/quote.png"
                              alt="img"
                              width={60}
                              height={60}
                            />
                          </div>
                          <div className="star">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <i key={i} className="fa-solid fa-star"></i>
                            ))}
                          </div>
                          <p className="gt-testi-text">{testimonial.review}</p>
                          <div className="gt-client-info">
                            <div className="gt-client-image">
                              <Image
                                src={testimonial.image}
                                alt="img"
                                width={80}
                                height={80}
                              />
                            </div>
                            <div className="gt-client-content">
                              <h4>{testimonial.name}</h4>
                              <p>{testimonial.position}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="array-button-2 justify-content-center">
                    <button className="array-prev">
                      <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <div className="swiper-dot1">
                      <div className="dot"></div>
                    </div>
                    <button className="array-next">
                      <i className="fa-solid fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section fix">
        <div className="container">
          <div className="contact-wrapper">
            <div className="row">
              <div className="col-lg-6">
                <iframe
                  src={contactData.mapEmbedUrl}
                  width="600"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="col-lg-6">
                <div className="contact-content">
                  <div className="section-title">
                    <h5 className="wow fadeInUp">
                      <i className="flaticon-home"></i> {contactData.subtitle}
                    </h5>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      {contactData.title}
                    </h2>
                  </div>
                  <ContactForm formCategories={contactData.formCategories} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
