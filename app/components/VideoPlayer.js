"use client";

function extractYouTubeId(url) {
  try {
    // youtu.be/VIDEO_ID?...
    if (url.includes("youtu.be")) {
      return url.split("youtu.be/")[1].split("?")[0];
    }

    // youtube.com/watch?v=VIDEO_ID
    if (url.includes("youtube.com")) {
      return new URL(url).searchParams.get("v");
    }

    return null;
  } catch {
    return null;
  }
}

export default function VideoPlayer({ src, className = "" }) {
  const videoId = extractYouTubeId(src);

  if (!videoId) return null;

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${videoId}`;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <iframe
        src={embedUrl}
        className="w-full h-full"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}
