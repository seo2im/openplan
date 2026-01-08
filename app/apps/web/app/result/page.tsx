'use client';
import { Button } from '@repo/ui/index';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import React, {useEffect} from 'react';
import Header from '../srcs/components/header';
import {usePhotoStore} from '../srcs/store/photo.store';
import MaskedImage from '../srcs/components/masked-image';

const Result: React.FC = () => {
  const router = useRouter();
  const { photo } = usePhotoStore();

  useEffect(() => {
    if (!photo) {
      setTimeout(() => {
        router.replace('/');
      }, 1000);
    }
  }, [photo, router]);
  const onClick = () => {
    usePhotoStore.persist.clearStorage();
    usePhotoStore.setState({ photo: null });
    router.push('/');
  };

  if (!photo) return <></>
  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 -left-1/2 -z-10 w-200 md:w-400 lg:w-800">
        <MaskedImage
          src={photo.download_url}
          width={photo.width}
          height={photo.height}
          blur={40}
        />
      </div>
      <Header color="#ffffff" />
      <div className='flex flex-col lg:flex-row gap-10 lg:flex-1 lg:justify-center lg:items-center'>
        <div className="w-full lg:flex-1 px-5">
          <div
            className="relative w-full rounded-2xl overflow-hidden"
            style={{ aspectRatio: `${photo.width}/${photo.height}` }}
          >
            <Image
              src={photo.download_url}
              alt="Result Image"
              fill
              sizes="(min-width:1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="lg:flex-1 justify-center items-center flex flex-col px-5 gap-3">
          <div className='bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-4 w-full'>
            <div className='flex-1'>
              <p className="text-[#111111] text-medium text-[15px]">id</p>
              <p className="text-[#111111] text-medium text-[15px] opacity-50">{photo.id}</p>
            </div>
            <div className='flex-1'>
              <p className="text-[#111111] text-medium text-[15px]">author</p>
              <p className="text-[#111111] text-medium text-[15px] opacity-50">{photo.author}</p>
            </div>
          </div>
          <div className='bg-white rounded-2xl p-5 flex flex-col md:flex-row gap-4 w-full'>
            <div className='flex-1'>
              <p className="text-[#111111] text-medium text-[15px]">width</p>
              <p className="text-[#111111] text-medium text-[15px] opacity-50">{photo.width}</p>
            </div>
            <div className='flex-1'>
              <p className="text-[#111111] text-medium text-[15px]">height</p>
              <p className="text-[#111111] text-medium text-[15px] opacity-50">{photo.height}</p>
            </div>
          </div>
          <div className='bg-white rounded-2xl p-5 flex flex-col gap-4 w-full'>
            <div className='flex-1'>
              <p className="text-[#111111] text-medium text-[15px]">url</p>
              <p className="text-[#111111] text-medium text-[15px] opacity-50">{photo.url}</p>
            </div>
            <div className='flex-1'>
              <p className="text-[#111111] text-medium text-[15px]">download_url</p>
              <p className="text-[#111111] text-medium text-[15px] opacity-50">{photo.download_url}</p>
            </div>
          </div>
          <div className="w-83.75 lg:w-38.5 max-w-full">
            <Button onClick={onClick} width={'100%'}>이전</Button>
          </div>
        </div>
      </div>
      <div className="h-15" />
    </div>
  );
};

export default Result;
