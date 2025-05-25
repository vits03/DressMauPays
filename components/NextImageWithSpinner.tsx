'use client';

import { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { Loader2 } from 'lucide-react';

interface NextImageWithSpinnerProps extends ImageProps {
  fallbackSrc?: string;
  index?: number;
}

export default function NextImageWithSpinner({
  src,
  fallbackSrc = 'https://placehold.co/800x600?text=No+Image',
  alt,
  index = 0,
  ...props
}: NextImageWithSpinnerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const imageSrc = typeof src === 'string' && src !== '' ? src : fallbackSrc;

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/30 z-10">
          <Loader2 className="w-15 h-15 animate-spin  text-primary " />
        </div>
      )}
      <Image
        src={imageSrc}
        alt={alt || `Image ${index + 1}`}
        onLoad={() => setIsLoading(false)}
        className={`object-contain transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        unoptimized
        loading="lazy"
        fill
        {...props}
      />
    </div>
  );
}
