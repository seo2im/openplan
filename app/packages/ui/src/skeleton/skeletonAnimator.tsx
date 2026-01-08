import React from 'react';
import { skeletonKeyframes, skeletonLayerStyle } from './skeleton.style';

export const SkeletonAnimator: React.FC = () => {
  return (
    <>
      <style>{skeletonKeyframes}</style>
      <div style={skeletonLayerStyle} />
    </>
  );
};
