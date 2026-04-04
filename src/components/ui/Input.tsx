import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 placeholder:text-medium-gray text-primary-black font-body',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full bg-transparent border-b border-border-gray py-3 px-1 focus:outline-none focus:border-primary-black transition-colors duration-300 placeholder:text-medium-gray text-primary-black font-body min-h-[100px] resize-none',
          className
        )}
        {...props}
      />
    );
  }
);

TextArea.displayName = 'TextArea';
