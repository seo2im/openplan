'use client';
import React, {useCallback, useEffect, useRef} from 'react';
import { Button } from '@repo/ui/index';
import Header from './srcs/components/header';
import { useRouter } from 'next/navigation';
import {usePhotoStore} from './srcs/store/photo.store';

const Home: React.FC = () => {
  const router = useRouter();
  const { fetchPhoto, loading, setLoading } = usePhotoStore();
  const onClick = useCallback(() => {
    fetchPhoto().then(() => {
      router.push('/result');
      setLoading(false);
    }).catch(() => {
      router.push('/404');
      setLoading(false);
    });
  }, [fetchPhoto, router, setLoading]);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const debouncedOnClick = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onClick();
    }, 300);
  }, [onClick]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (loading) return <div>loading</div>;
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <Header color="#1A1A1A" />
      <div className='flex flex-col justify-center items-center'>
        <p className='whitespace-pre-line text-[28px] font-semibold text-[#111111] text-center'>
          {`안녕하세요\n임성연입니다.`}
        </p>
      </div>
      <div className='h-32 flex flex-col justify-center items-center'>
        <Button onClick={debouncedOnClick}>다음</Button>
      </div>
    </div>
  );
}

export default Home;
