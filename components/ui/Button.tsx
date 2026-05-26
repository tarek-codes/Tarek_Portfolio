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
      "relative inline-flex items-center justify-center gap-2.5 font-semibold font-body transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ctp-red focus-visible:ring-offset-2 focus-visible:ring-offset-ctp-base disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";

    const variants = {
      primary:
        "bg-ctp-red text-ctp-crust hover:bg-ctp-flamingo active:scale-95 shadow-[0_4px_14px_-2px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_20px_-4px_rgba(220,38,38,0.5)]",
      secondary:
        "bg-ctp-surface0/80 backdrop-blur-md border border-ctp-surface1 text-ctp-text hover:bg-ctp-surface1/80 active:scale-[0.98] shadow-sm",
      outline:
        "border-2 border-ctp-red/70 text-ctp-text hover:border-ctp-red hover:bg-ctp-red/10 active:scale-[0.98]",
      ghost: "text-ctp-subtext0 hover:text-ctp-text hover:bg-ctp-surface0/60 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-sm rounded-lg",
      md: "px-5 py-2.5 text-base rounded-xl",
      lg: "px-6 py-3.5 text-lg rounded-2xl",
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



