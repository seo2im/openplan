'use client';
import React, { useState } from 'react';
import PageGate from './page/gate';
import Main from './page/main';
import { useQuery } from '@tanstack/react-query';
import { photoQuery } from './srcs/query/photo.query';
import { PicsumData } from './srcs/dto/dto.photo';
const Home: React.FC = () => {
  const [pass, onPass] = useState(false);
  const { refetch } = useQuery<PicsumData>({
    ...photoQuery(0),
    enabled: false,
  });

  return (
    <>
      <PageGate onPass={() => onPass(true)} fetch={refetch} />
      <Main enabled={pass} fetch={refetch} />
    </>
  );
};

export default Home;
