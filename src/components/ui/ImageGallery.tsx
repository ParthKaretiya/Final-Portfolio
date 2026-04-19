import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  name: string;
}

const ImageGallery = ({ images, name }: ImageGalleryProps) => {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative aspect-video xl:aspect-auto xl:h-full min-h-[320px] overflow-hidden group/gallery bg-[#080808]">
      {/* Sliding Images Container */}
      <div 
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ transform: `translateX(-${activeIdx * 100}%)` }}
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full flex items-center justify-center p-4">
            <img
              src={img}
              alt={`${name} - image ${i + 1}`}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-xl"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setActiveIdx((prev) => (prev - 1 + images.length) % images.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-black/60 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveIdx((prev) => (prev + 1) % images.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover/gallery:opacity-100 transition-all duration-300 hover:bg-black/60 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {images.map((_img, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`transition-all duration-500 rounded-full h-1.5 ${i === activeIdx ? "w-8 bg-cyan-400" : "w-2 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
