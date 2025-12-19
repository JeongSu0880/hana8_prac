import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

type Prop = {
  onClick?: () => void;
  type?: 'reset' | 'submit';
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'destructive' | 'primary'
};

export default function Btn({
  onClick,
  type,
  variant = 'default',
  className,
  disabled,
  children,
}: PropsWithChildren<Prop>) {
  return (
    <button
      type={type}
      className={cn({
        'bg-red-500 text-white': variant === 'destructive',
        'bg-primary-foreground': variant === 'primary'
      },
        `hover:bg-gray-100 border py-1 px-2 rounded-md cursor-pointer ${className}`
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
