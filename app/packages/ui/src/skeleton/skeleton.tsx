import React from 'react';
import { SkeletonAnimator } from './skeletonAnimator';
import { getSkeletonSquareSizeStyles } from './skeleton.style';

export type SkeletonProps = {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
};
export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = 20,
  borderRadius = 4,
}) => {
  return (
    <div style={{ ...getSkeletonSquareSizeStyles(width, height, borderRadius) }}>
      <SkeletonAnimator />
    </div>
  );
};
