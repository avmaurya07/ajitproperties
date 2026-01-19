'use client'
export default function Preloader() {
  return (
    <div id="preloader" className="preloader">
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span data-text-preloader="L" className="letters-loading">L</span>
          <span data-text-preloader="I" className="letters-loading">I</span>
          <span data-text-preloader="V" className="letters-loading">V</span>
          <span data-text-preloader="E" className="letters-loading">E</span>
          <span data-text-preloader="S" className="letters-loading">S</span>
          <span data-text-preloader="T" className="letters-loading">T</span>
          <span data-text-preloader="A" className="letters-loading">A</span>
        </div>
        <p className="text-center">Loading</p>
      </div>
    </div>
  )
}
