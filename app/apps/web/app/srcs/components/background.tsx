'use client';
import React, { RefObject, useEffect, useId, useState } from 'react';
import { PicsumData } from '../dto/dto.photo';

type BackgroundProps = {
  photo?: PicsumData;
  noiseSrc?: string;
  contentRef: RefObject<HTMLDivElement | null>;
  loaded: boolean;
};
const Background: React.FC<BackgroundProps> = ({
  photo,
  noiseSrc = '/noise-layer.svg',
  contentRef,
  loaded,
}) => {
  const id = useId();
  const RATIO = 64 / 39;
  const [vw, setVw] = useState<number>(390);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const height = Math.round(vw * RATIO); // target height
  const aspect = photo ? photo.width / photo.height : RATIO;
  const width = Math.round(height * aspect); // derive width from target height
  const imgWidth = width;
  const imgHeight = height;

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);

    const observer = new ResizeObserver(updateHeight);
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateHeight);
      observer.disconnect();
    };
  }, [photo, loaded, contentRef]);
  if (!photo) return null;
  return (
    <div
      className="absolute top-0 -z-10 overflow-hidden"
      style={{ height: contentHeight || 'auto' }}
    >
      <div
        className="relative top-0 md:-top-[20%] lg:-top-[50%]"
        style={{
          width,
          height,
          marginLeft: `calc(50% - ${width / 2}px)`,
        }}
      >
        <svg
          viewBox={`0 0 ${imgWidth} ${imgHeight}`}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block' }}
        >
          <defs>
            <linearGradient id={`g-${id}`} x1="0" y1="0" x2="0" y2={imgHeight} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <mask id={`m-${id}`}>
              <rect x="0" y="0" width={imgWidth} height={imgHeight} fill={`url(#g-${id})`} />
              <image href={noiseSrc} x="0" y="0" width={imgWidth} height={imgHeight} opacity="0.25" />
            </mask>

            <filter id={`b-${id}`}>
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>

          <image
            href={photo.download_url}
            x="0"
            y="0"
            width={imgWidth}
            height={imgHeight}
            opacity={0.3}
            mask={`url(#m-${id})`}
            filter={`url(#b-${id})`}
            preserveAspectRatio="xMidYMin meet"
          />
        </svg>
      </div>
    </div>
  );
};
export default Background;
