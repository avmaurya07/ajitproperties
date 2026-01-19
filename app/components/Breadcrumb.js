import Link from 'next/link'

export default function Breadcrumb({ title, items }) {
  return (
    <div className="gt-breadcrumb-wrapper bg-cover" style={{backgroundImage: "url('/assets/img/breadcrumb-bg.jpg')"}}>
      <div className="container">
        <div className="gt-page-heading">
          <div className="gt-breadcrumb-sub-title">
            <h1 className="wow fadeInUp" data-wow-delay=".3s">{title}</h1>
          </div>
          <ul className="gt-breadcrumb-items wow fadeInUp" data-wow-delay=".5s">
            {items.map((item, index) => (
              <li key={index}>
                {item.link ? (
                  <Link href={item.link}>{item.label}</Link>
                ) : (
                  item.label
                )}
                {index < items.length - 1 && <i className="fa-solid fa-chevron-right"></i>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
