import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { ButtonProps } from './Button.types';
import './Button.css';

export const buttonVariants = cva('ds-button', {
  variants: {
    variant: {
      primary: 'ds-button--primary',
      secondary: 'ds-button--secondary',
      ghost: 'ds-button--ghost',
    },
    size: {
      sm: 'ds-button--sm',
      md: 'ds-button--md',
      lg: 'ds-button--lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, asChild = false, className, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={buttonVariants({ variant, size, className })}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';