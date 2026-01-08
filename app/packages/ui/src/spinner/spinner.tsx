import React from 'react';
import { getAnimStyle, getSpinnerStyle } from './spinner.style';
import type { SpinnerSize, SpinnerVariants } from './spinner.type';

export type SpinnerProps = {
  size?: SpinnerSize;
  variant?: SpinnerVariants;
  color?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color, variant = 'default' }) => {
  color = color || '#000000';
  return (
    <>
      <style>{`
      @keyframes spinner-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
      <div style={{ ...getSpinnerStyle(size, color), ...getAnimStyle(variant) }} />
    </>
  );
};
