"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function PropertyCard({ property, isSlider = false }) {
  const [imgSrc, setImgSrc] = useState(
    property.images && property.images.length > 0
      ? property.images[0]
      : "/assets/img/home-1/project/project-01.jpg",
  );

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

  const cardContent = (
    <div className={isSlider ? "project-box-items" : "project-box-items"}>
      <div className="project-thumb h-64 bg-white">
        <Image
          src={imgSrc}
          alt={property.name || "Property"}
          width={600}
          height={400}
          className="object-contain w-full h-full"
          onError={() => setImgSrc("/assets/img/home-1/project/project-01.jpg")}
        />
        <Image
          src={imgSrc}
          alt={property.name || "Property"}
          width={600}
          height={400}
          className="object-contain w-full h-full"
          onError={() => setImgSrc("/assets/img/home-1/project/project-01.jpg")}
        />
        <span className="project-post-box">
          {property.price ? formatPrice(property.price) : "Price on Request"}
        </span>
      </div>
      <div className="project-content">
        <span className="location">
          <i className="fa-solid fa-location-dot"></i>{" "}
          {property.location || "Location not specified"}
        </span>
        <h3>
          <Link href={`/property/${property.slug}`}>
            {property.name || "Untitled Property"}
          </Link>
        </h3>
        <ul className="project-list">
          {property.area > 0 && (
            <li>
              <i className="fa-solid fa-border-all text-orange-400"></i>
              {property.area} sqft
            </li>
          )}
          {/* {property.bedrooms > 0 && (
            <li>
              <Image
                src="/assets/img/home-1/project/bed.png"
                alt="img"
                width={20}
                height={20}
              />
              Bed {property.bedrooms}
            </li>
          )}
          {property.bathrooms > 0 && (
            <li>
              <Image
                src="/assets/img/home-1/project/user.png"
                alt="img"
                width={20}
                height={20}
              />
              Bath {property.bathrooms}
            </li>
          )} */}
        </ul>
        <Link href={`/property/${property.slug}`} className="project-link-btn">
          <i className="flaticon-home"></i>View Details
        </Link>
      </div>
    </div>
  );

  if (isSlider) {
    return cardContent;
  }

  return <div className="col-xl-4 col-lg-6 col-md-6">{cardContent}</div>;
}
