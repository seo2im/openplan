import type { SpinnerSize, SpinnerVariants } from './spinner.type';

export const getSpinnerStyle = (size: SpinnerSize, color: string): React.CSSProperties => {
  const s = typeof size === 'number' ? size : sizesStyle[size];

  return {
    width: s,
    height: s,
    border: `${s / 8}px solid transparent`,
    borderTop: `${s / 8}px solid ${color}`,
    borderLeft: `${s / 8}px solid ${color}`,
    borderRight: `${s / 8}px solid ${color}`,
    borderRadius: '50%',
    animation: 'spinner-spin 1s linear infinite',
  };
};
export const getAnimStyle = (variant: SpinnerVariants) => ({
  animation: 'spinner-spin 1s linear infinite',
  animationDirection: variant === 'inverted' ? 'reverse' : 'normal',
});
export const sizesStyle = {
  sm: 24,
  md: 40,
  lg: 64,
};
