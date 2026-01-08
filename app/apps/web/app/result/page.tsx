import React from 'react';
import PhotoInfo from './photoInfo';
import ResultGate from './gate';

const Result: React.FC = () => {
  return (
    <>
      <ResultGate />
      <PhotoInfo />
    </>
  );
};

export default Result;
