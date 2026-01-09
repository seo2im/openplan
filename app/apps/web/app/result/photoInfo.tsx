'use client';
import React, { useState, useRef } from 'react';
import { usePhotoStore } from '../srcs/store/photo.store';
import DebounceLink from '../srcs/components/debounceLink';
import { Skeleton, Spinner } from '@repo/ui/index';
import Image from 'next/image';
import Header from '../srcs/components/header';
import Background from '../srcs/components/background';
import { PicsumData } from '../srcs/dto/dto.photo';

type PhotoInfoProps = {
  enabled: boolean;
  uiPhotoData?: PicsumData;
};
const PhotoInfo: React.FC<PhotoInfoProps> = ({ enabled, uiPhotoData }) => {
  const reset = usePhotoStore((state) => state.reset);

  const onClick = () => {
    reset();
  };
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!enabled) return <></>;
  return (
    <div className="relative">
      <Background photo={uiPhotoData} contentRef={contentRef} loaded={imageLoaded} />
      <div ref={contentRef} className="flex flex-col min-h-screen">
        <Header color="#ffffff" />
        <div className="flex flex-col lg:flex-row gap-10 lg:flex-1 lg:justify-center lg:items-center">
          <div className="w-full lg:flex-1 px-5 lg:h-121.25">
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{
                aspectRatio: uiPhotoData ? `${uiPhotoData.width}/${uiPhotoData.height}` : undefined,
              }}
            >
              {!imageLoaded || !uiPhotoData ? (
                <div className="w-full h-56 md:h-112 lg:h-96 relative">
                  <Skeleton width="100%" height="100%" borderRadius={16} />
                </div>
              ) : null}
              {!imageLoaded && uiPhotoData && (
                <Image
                  src={uiPhotoData.download_url}
                  alt="Result Image"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="hidden"
                  onLoad={() => setImageLoaded(true)}
                  loading="eager"
                />
              )}
              {imageLoaded && uiPhotoData && (
                <Image
                  src={uiPhotoData.download_url}
                  alt="Result Image"
                  fill
                  sizes="(min-width:1024px) 50vw, 100vw"
                  className="object-cover"
                  loading="eager"
                />
              )}
            </div>
          </div>
          <div className="lg:flex-1 justify-center items-center flex flex-col px-5 gap-3">
            {!uiPhotoData ? (
              <Skeleton width="100%" height="140px" borderRadius={16} />
            ) : (
              <div className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">id</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {uiPhotoData.id}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">author</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {uiPhotoData.author}
                  </p>
                </div>
              </div>
            )}

            {!uiPhotoData ? (
              <Skeleton width="100%" height="140px" borderRadius={16} />
            ) : (
              <div className="bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">width</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {uiPhotoData.width}
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">height</p>
                  <p className="text-[#111111] text-medium text-[15px]/[21px] opacity-50">
                    {uiPhotoData.height}
                  </p>
                </div>
              </div>
            )}
            {!uiPhotoData ? (
              <Skeleton width="100%" height="140px" borderRadius={16} />
            ) : (
              <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 w-full">
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">url</p>
                  <a
                    href={uiPhotoData.url}
                    className="text-[#111111] text-medium text-[15px]/[21px] opacity-50"
                  >
                    {uiPhotoData.url}
                  </a>
                </div>
                <div className="flex-1">
                  <p className="text-[#111111] text-medium text-[15px]/[21px]">download_url</p>
                  <a
                    href={uiPhotoData.download_url}
                    className="text-[#111111] text-medium text-[15px]/[21px] opacity-50"
                  >
                    {uiPhotoData.download_url}
                  </a>
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
