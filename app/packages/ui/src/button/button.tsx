'use client';

import { ReactNode, useCallback } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  width?: string | number;
}

const colors = {
  bg: {
    default: '#111111',
    hover: '#111111CC',
    press: '#111111CC',
  },
  text: {
    default: '#FFFFFF',
    hover: '#FFFFFF',
    press: '#FFFFFF',
  },
};

export const Button: React.FC<ButtonProps> = ({ children, onClick, width = 335 }) => {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = colors.bg.hover;
    target.style.color = colors.text.hover;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.backgroundColor = colors.bg.default;
    target.style.color = colors.text.default;
  }, []);

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: colors.bg.default,
        color: colors.text.default,
        padding: '12px',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: '600',
        transition: 'background-color 0.3s, color 0.3s',
        width: typeof width === 'number' ? `${width}px` : width,
      }}
    >
      {children}
    </button>
  );
};
