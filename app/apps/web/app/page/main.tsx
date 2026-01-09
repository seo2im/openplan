'use client';
import React, { useCallback, useState } from 'react';
import DebounceLink from '../srcs/components/debounceLink';
import Header from '../srcs/components/header';
import { Spinner } from '@repo/ui/index';
import { usePhotoStore } from '../srcs/store/photo.store';
import { PicsumData } from '../srcs/dto/dto.photo';
import { UseQueryResult } from '@tanstack/react-query';

type MainProps = {
  enabled: boolean;
  fetch: () => Promise<UseQueryResult<PicsumData, Error>>;
};
const Main: React.FC<MainProps> = ({ enabled, fetch }) => {
  const [loading, setLoading] = useState(false);
  const setPhoto = usePhotoStore((state) => state.setPhoto);
  const onNext = useCallback(async () => {
    const { data } = await fetch();
    setPhoto(data);
  }, [fetch, setPhoto]);

  if (!enabled) return <></>;
  return (
    <div className="h-screen flex flex-col justify-between items-center">
      <Header color="#1A1A1A" />
      <div className="flex flex-col justify-center items-center">
        <p className="whitespace-pre-line text-[28px] font-semibold text-[#111111] text-center">
          {`안녕하세요\n임성연입니다.`}
        </p>
      </div>
      <div className="h-32 flex flex-col justify-center items-center">
        <DebounceLink setLoading={setLoading} onClick={onNext} href="/result" delay={300}>
          다음
        </DebounceLink>
      </div>
      {loading && (
        <div className="fixed top-0 left-0 w-screen h-screen opacity-30 bg-black flex justify-center items-center z-10">
          <Spinner size="lg" color="white" />
        </div>
      )}
    </div>
  );
};

export default Main;
