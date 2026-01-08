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
export const getSkeletonSquareSizeStyles = (
  width: number | string,
  height: number | string,
  borderRadius: number | string
): React.CSSProperties => ({
  width: typeof width === 'number' ? `${width}px` : width,
  height: typeof height === 'number' ? `${height}px` : height,
  borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
  overflow: 'hidden',
});
