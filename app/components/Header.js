"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export const metadata = {
  title: "Ajit Properties - Real Estate Properties",
  description: "Find your dream property with Ajit Properties",
};
export default function Header() {
  const pathname = usePathname();

  return (
    <>
      {/* Back to Top Button */}
      <button id="st-back-top" className="st-back-to-top show">
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* Mouse Cursor */}
      <div className="mouseCursor cursor-outer"></div>
      <div className="mouseCursor cursor-inner"></div>

      {/* Offcanvas Area */}
      <div className="fix-area">
        <div className="offcanvas__info">
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/">
                    <Image
                      src="/assets/img/logo/logo.png"
                      alt="Ajit Properties Logo"
                      width={150}
                      height={30}
                    />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button>
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <div className="mobile-menu fix mb-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas__overlay"></div>

      {/* Main Header */}
      <header id="header-sticky" className="header-1">
        <div className="container-fluid">
          <div className="mega-menu-wrapper">
            <div className="header-main">
              <div className="logo">
                <Link href="/" className="header-logo">
                  <Image
                    src="/assets/img/logo/logo.png"
                    alt="Ajit Properties Logo"
                    width={120}
                    height={30}
                    priority
                  />
                </Link>
                <Link href="/" className="header-logo-2">
                  <Image
                    src="/assets/img/logo/logo.png"
                    alt="Ajit Properties Logo"
                    width={120}
                    height={30}
                    priority
                  />
                </Link>
              </div>

              <div className="mean__menu-wrapper d-none d-xl-block">
                <div className="main-menu">
                  <nav id="mobile-menu">
                    <ul>
                      <li className={pathname === "/" ? "active" : ""}>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="#">
                          Properties
                          <span>
                            <i className="fa-solid fa-chevron-down"></i>
                          </span>
                        </Link>
                        <ul className="submenu">
                          <li>
                            <Link href="/properties/Apartment">Apartment</Link>
                          </li>
                          <li>
                            <Link href="/properties/House">House</Link>
                          </li>
                          <li>
                            <Link href="/properties/Villa">Villa</Link>
                          </li>
                          <li>
                            <Link href="/properties/Commercial">
                              Commercial
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <Link href="/about">About Us</Link>
                      </li>

                      <li>
                        <Link href="/contact">Contact Us</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>

              <div className="header-right d-flex justify-content-end align-items-center">
                <a href="#" className="main-header__search search-toggler">
                  <i className="fa-regular fa-magnifying-glass"></i>
                </a>
                {/* <Link
                  href="/properties"
                  className="theme-btn d-none d-sm-inline-block"
                >
                  Add Properties <i className="flaticon-home"></i>
                </Link> */}
                <div className="header__hamburger d-xl-none my-auto">
                  <div className="sidebar__toggle">
                    <i className="fas fa-bars"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Popup */}
      <div className="search-popup">
        <div className="search-popup__overlay search-toggler"></div>
        <div className="search-popup__content">
          <form role="search" method="get" className="search-popup__form">
            <input
              type="text"
              id="search"
              name="search"
              placeholder="Search Here..."
            />
            <button
              type="submit"
              aria-label="search submit"
              className="search-btn"
            >
              <span>
                <i className="fa-regular fa-magnifying-glass"></i>
              </span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
