import Link from 'next/link'

export const metadata = {
  title: '404 - Page Not Found',
}

export default function NotFound() {
  return (
    <section className="error-section section-padding text-center">
      <div className="container">
        <h1 style={{ fontSize: '120px' }}>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for doesn’t exist.</p>

        <Link href="/" className="theme-btn mt-4">
          Go Back Home
        </Link>
      </div>
    </section>
  )
}
