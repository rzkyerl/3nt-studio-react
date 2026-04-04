import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-primary-black text-pure-white hover:bg-pure-white hover:text-primary-black border border-primary-black',
      outline: 'bg-transparent text-primary-black border border-primary-black hover:bg-primary-black hover:text-pure-white',
      ghost: 'bg-transparent text-primary-black hover:bg-light-gray',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg font-medium tracking-wide',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'transition-all duration-300 ease-in-out uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] hover:scale-[1.03]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
