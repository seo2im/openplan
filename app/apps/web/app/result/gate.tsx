'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePhotoStore } from '../srcs/store/photo.store';

const ResultGate: React.FC = () => {
  const photo = usePhotoStore((state) => state.photo);
  const [hydrated, setHydrated] = useState(false);
  const router = useRouter();

  useEffect(() => setHydrated(true), []);

  useEffect(() => {
    if (!hydrated) return;

    if (!photo) {
      setTimeout(() => {
        router.replace('/');
      }, 1000);
      return;
    }
  }, [hydrated, photo, router]);

  return null;
};
export default ResultGate;
