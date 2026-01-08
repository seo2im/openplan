'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePhotoStore } from '../srcs/store/photo.store';
import { UseQueryResult } from '@tanstack/react-query';
import { PicsumData } from '../srcs/dto/dto.photo';

type PageGateProps = {
  onPass: () => void;
  fetch: () => Promise<UseQueryResult<PicsumData, Error>>;
};
const PageGate: React.FC<PageGateProps> = ({ onPass }) => {
  const photo = usePhotoStore((store) => store.photo);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();
  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (!hydrated) return;
    if (photo) {
      router.replace('/result');
    }
    onPass();
  }, [hydrated, photo, router, onPass]);

  return null;
};
export default PageGate;
