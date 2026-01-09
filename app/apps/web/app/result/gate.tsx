'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePhotoStore } from '../srcs/store/photo.store';
import { FRESH_WINDOW } from '../srcs/constant/time';
import { useQuery } from '@tanstack/react-query';
import { photoQuery } from '../srcs/query/photo.query';
import { PicsumData } from '../srcs/dto/dto.photo';

type ResultGateProps = {
  setUiPhotoData: (data: PicsumData) => void;
};
const ResultGate: React.FC<ResultGateProps> = ({ setUiPhotoData }) => {
  const { refetch, isFetched, isLoading } = useQuery({
    ...photoQuery(0),
    enabled: false,
  });
  const router = useRouter();
  const photo = usePhotoStore((state) => state.photo);
  const callTime = usePhotoStore((state) => state.callTime);
  const setPhoto = usePhotoStore((state) => state.setPhoto);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => setHydrated(true), []);
  useEffect(() => {
    if (!hydrated) return;
    if (!photo) {
      setTimeout(() => {
        router.replace('/');
      }, 1000);
      return;
    }
    /** data fresh */
    if (callTime && Date.now() - callTime >= FRESH_WINDOW && !isLoading && !isFetched) {
      refetch().then(({ data: newPhoto }) => {
        setPhoto(newPhoto);
        setUiPhotoData(newPhoto);
      });
    }
  }, [hydrated, photo, router, refetch, setPhoto, callTime, isLoading, isFetched, setUiPhotoData]);

  return null;
};
export default ResultGate;
