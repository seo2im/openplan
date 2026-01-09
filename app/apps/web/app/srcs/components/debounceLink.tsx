'use client';
import React, { useEffect } from 'react';
import { Button } from '@repo/ui/index';
import { useRouter } from 'next/navigation';

type DebounceButtonProps = {
  setLoading?: (loading: boolean) => void;
  onClick: () => Promise<void> | void;
  href?: string;
  delay?: number;
  children: React.ReactNode;
  width?: string | number;
};
const DebounceLink: React.FC<DebounceButtonProps> = ({
  setLoading,
  onClick,
  delay = 300,
  children,
  href,
  width,
}) => {
  const router = useRouter();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    setLoading?.(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      await onClick();
      if (href) {
        router.push(href);
      }
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Button onClick={handleClick} width={width}>
      {children}
    </Button>
  );
};
export default DebounceLink;
