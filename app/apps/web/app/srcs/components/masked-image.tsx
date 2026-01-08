'use client';

import Image from 'next/image';
import React from 'react';

type MaskedImageProps = {
  src: string;
  width: number;
  height: number;
  blur?: number; // px
  className?: string;
  sizes?: string;
};
export default function MaskedImage({
  src,
  width,
  height,
  blur = 21.8,
  className,
  sizes = '(min-width:1024px) 50vw, 100vw',
}: MaskedImageProps) {
  const maskStyle: React.CSSProperties = {
    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
  };

  return (
    <div
      className={'relative w-full rounded-2xl overflow-hidden ' + (className || '')}
      style={{ aspectRatio: `${width}/${height}`, ...maskStyle }}
    >
      <Image
        src={src}
        alt="Masked Image"
        fill
        sizes={sizes}
        className="object-cover"
        style={{ filter: `blur(${blur}px)` }}
      />

      <svg
        className="absolute inset-0 pointer-events-none"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity: 0.3 }}
      >
        <defs>
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" fill="#000000" />
      </svg>
    </div>
  );
}
