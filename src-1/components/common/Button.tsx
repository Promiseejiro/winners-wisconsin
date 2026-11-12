import { twMerge } from "tailwind-merge";
import React from "react";
import Link from "next/link";

type ButtonVariant = "primary" | "outline" | "dark" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  type = "button",
  disabled = false,
  loading = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition duration-300 cursor-pointer rounded-full";

  const variantClasses: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-white hover:bg-[#c81d26] disabled:bg-primary/70 disabled:hover:bg-primary/70",
    outline:
      "bg-transparent text-white border-2 border-white/60 hover:bg-white hover:text-black disabled:opacity-70 disabled:hover:bg-transparent disabled:hover:text-white",
    dark: "bg-primary text-white hover:bg-[#c81d26] disabled:bg-primary/70 disabled:hover:bg-primary/70",
    link: "bg-transparent text-primary hover:text-[#c81d26] p-0 h-auto font-medium disabled:opacity-70 rounded-none",
  };

  const sizeClasses: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const classes = twMerge(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
    (disabled || loading) && "cursor-not-allowed opacity-70",
  );

  const buttonContent = loading ? (
    <span className="flex items-center gap-2">
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      Loading...
    </span>
  ) : (
    children
  );

  if (href && !loading && !disabled) {
    return (
      <Link href={href} className={classes}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {buttonContent}
    </button>
  );
};

export default Button;
