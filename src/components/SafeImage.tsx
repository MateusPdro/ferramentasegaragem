import { useState } from 'react';
import { Wrench } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SafeImage({ src, alt, className = '' }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#202328] to-[#17191C] text-[#A9ADB2] p-4 ${className}`}
      >
        <Wrench className="w-8 h-8 text-[#F47721] mb-2" aria-hidden="true" />
        <span className="text-xs text-center font-medium text-white/80 line-clamp-2">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
