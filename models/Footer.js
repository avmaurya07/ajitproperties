import mongoose from "mongoose";

const footerSchema = new mongoose.Schema(
  {
    logo: {
      type: String,
      default: "/assets/img/home-1/footer-logo.png",
    },
    description: {
      type: String,
      default:
        "Don't worry—we're here to help! Contact our support team or set custom alerts to find homes that perfectly match your needs and budget.",
    },
    contactInfo: {
      phone: {
        type: String,
        default: "89 (09) 2346 1894",
      },
      email: {
        type: String,
        default: "example@gmail.com",
      },
      address: {
        type: String,
        default: "UK, 1212; 102/B New Elephant Road London",
      },
    },
    newsletter: {
      title: {
        type: String,
        default: "Subscribe To Our Newsletter",
      },
      placeholder: {
        type: String,
        default: "Email address",
      },
      buttonText: {
        type: String,
        default: "SUBSCRIBE",
      },
    },
    quickLinks: [
      {
        title: {
          type: String,
          default: "Quick links",
        },
        links: [
          {
            text: {
              type: String,
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    copyright: {
      type: String,
      default: "© 2025 Powered By <b>Ajit Properties</b>. All Rights Reserved.",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent model recompilation
const Footer = mongoose.models.Footer || mongoose.model("Footer", footerSchema);

export default Footer;
