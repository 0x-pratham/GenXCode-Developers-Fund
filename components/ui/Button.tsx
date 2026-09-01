import Link from 'next/link';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'dark' | 'light';
  href?: string;
  children: ReactNode;
  className?: string;
}

export default function Button({ 
  variant = 'dark', 
  href, 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  
  // Base styles: Tactile compression on click (active:scale-95), perfect centering, pill shape
  const baseStyles = "inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-sm tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  // Engineered Variants
  const variants = {
    // Primary Action: Solid, deep, casting a rich purple shadow
    dark: "bg-genx-primary text-white shadow-[0_8px_20px_rgba(94,35,150,0.2)] hover:shadow-[0_12px_25px_rgba(34,7,73,0.3)] hover:-translate-y-0.5 hover:bg-genx-dark border border-transparent",
    
    // Secondary Action: Frosted glass, subtle machined border, soft grey-to-white transition
    light: "bg-gray-100/60 text-genx-dark border border-gray-200/80 backdrop-blur-md shadow-sm hover:shadow-[0_6px_15px_rgba(34,7,73,0.06)] hover:-translate-y-0.5 hover:bg-white hover:border-gray-300"
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`;

  // If an href is provided, render a Next.js Link that looks exactly like a button
  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  // Otherwise, render a standard HTML button
  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}