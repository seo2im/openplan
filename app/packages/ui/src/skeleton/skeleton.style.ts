import type { SkeletonSize } from './skeleton.type';

export const skeletonLayerStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  backgroundColor: '#e0e0e0',
  borderRadius: '4px',
  animation: 'skeleton-loading 1.5s infinite',
};
export const skeletonKeyframes = `
  @keyframes skeleton-loading {
    0% {
      background-color: #F3F4F6;
    }
    50% {
      background-color: #E5E7EB;
    }
    100% {
      background-color: #F3F4F6;
    }
  }
`;
export const skeletonCircleSizesStyle: Record<SkeletonSize, React.CSSProperties> = {
  sm: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  md: {
    width: '75px',
    height: '75px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
  lg: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
  },
};
export const skeletonTextSizeStyles: Record<SkeletonSize, React.CSSProperties> = {
  sm: {
    width: '100%',
    height: '12px',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  md: {
    width: '100%',
    height: '16px',
    borderRadius: '4px',
    marginBottom: '8px',
  },
  lg: {
    width: '100%',
    height: '20px',
    borderRadius: '4px',
    marginBottom: '8px',
  },
};
