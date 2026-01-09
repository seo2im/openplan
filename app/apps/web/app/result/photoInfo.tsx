'use client';
import React, { useState, useRef } from 'react';
import { usePhotoStore } from '../srcs/store/photo.store';
import DebounceLink from '../srcs/components/debounceLink';
import { Skeleton, Spinner } from '@repo/ui/index';
import Image from 'next/image';
import Header from '../srcs/components/header';
import Background from '../srcs/components/background';

const PhotoInfo: React.FC = () => {
  const photo = usePhotoStore((state) => state.photo);
  const reset = usePhotoStore((state) => state.reset);

  const onClick = () => {
    reset();
  };
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <Background photo={photo} contentRef={contentRef} loaded={imageLoaded} />
      <div ref={contentRef} className="flex flex-col min-h-screen">
        <Header color="#ffffff" />
        <div className="flex flex-col lg:flex-row gap-10 lg:flex-1 lg:justify-center lg:items-center">
          <div className="w-full lg:flex-1 px-5 lg:h-121.25">
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ aspectRatio: photo ? `${photo.width}/${photo.height}` : undefined }}
            >
              {!photo || !imageLoaded ? (
                <div className="w-full h-56 md:h-112 lg:h-96 relative">
                  <Skeleton width="100%" height="100%" borderRadius={16} />
                  {photo && (
                    <Image
                      src={photo.download_url}
                      alt="Result Image"
                      fill
                      sizes="(min-width:1024px) 50vw, 100vw"
                      className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      onLoad={() => setImageLoaded(true)}
                      loading="eager"
                    />
                  )}
                </div>
              ) : (
                <Image
                  src={photo.download_url}
                  alt="Result Image"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover transition-opacity duration-300 opacity-100"
                  loading="eager"
                />
              )}
            </div>
          </div>
          <div className="lg:flex-1 justify-center items-center flex flex-col px-5 gap-3">
            {!photo ? (
              <Skeleton width="100%" height="140px" borderRadius={16} />
            ) : (
              <div className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">id</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {photo.id}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">author</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {photo.author}
                  </p>
                </div>
              </div>
            )}

            {!photo ? (
              <Skeleton width="100%" height="140px" borderRadius={16} />
            ) : (
              <div className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">width</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {photo.width}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">height</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {photo.height}
                  </p>
                </div>
              </div>
            )}
            {!photo ? (
              <Skeleton width="100%" height="140px" borderRadius={16} />
            ) : (
              <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 w-full">
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">url</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {photo.url}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">download_url</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {photo.download_url}
                  </p>
                </div>
              </div>
            )}
            <div className="w-83.75 md:w-38.5 max-w-full">
              <DebounceLink
                setLoading={setLoading}
                onClick={onClick}
                href="/"
                delay={300}
                width="100%"
              >
                이전
              </DebounceLink>
            </div>
          </div>
        </div>
        <div className="h-15" />
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen opacity-30 bg-black flex justify-center items-center z-10">
          <Spinner size="lg" color="white" />
        </div>
      )}
    </div>
  );
};
export default PhotoInfo;
