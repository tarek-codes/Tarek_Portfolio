import { ButtonHTMLAttributes, forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "left",
      className = "",
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-ctp-red text-ctp-crust hover:bg-ctp-flamingo active:scale-95",
      secondary:
        "bg-ctp-surface0 text-ctp-text hover:bg-ctp-surface1 active:scale-95",
      outline:
        "border-2 border-ctp-red text-ctp-red hover:bg-ctp-red hover:text-ctp-crust active:scale-95",
      ghost: "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/50",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      md: "px-4 py-2 text-base rounded-lg",
      lg: "px-6 py-3 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;



