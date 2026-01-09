'use client';
import React, { useEffect, useState } from 'react';
import PhotoInfo from './photoInfo';
import ResultGate from './gate';
import { usePhotoStore } from '../srcs/store/photo.store';
import { PicsumData } from '../srcs/dto/dto.photo';

const Result: React.FC = () => {
  const photo = usePhotoStore((state) => state.photo);
  const [uiPhotoData, setUiPhotoData] = useState<PicsumData | undefined>(undefined);

  useEffect(() => {
    if (photo && !uiPhotoData) {
      setUiPhotoData({ ...photo });
    }
  }, [photo, uiPhotoData]);

  return (
    <>
      <ResultGate setUiPhotoData={setUiPhotoData} />
      <PhotoInfo uiPhotoData={uiPhotoData} />
    </>
  );
};

export default Result;
