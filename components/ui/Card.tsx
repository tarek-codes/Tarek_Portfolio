import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { children, variant = "default", hover = false, className = "", ...props },
    ref,
  ) => {
    const baseStyles = "rounded-xl transition-all duration-300";

    const variants = {
      default: "bg-ctp-surface0/50 backdrop-blur-sm",
      bordered:
        "bg-ctp-surface0/30 border border-ctp-surface1/50 backdrop-blur-sm",
      elevated:
        "bg-ctp-surface0/80 shadow-lg shadow-ctp-crust/50 backdrop-blur-sm",
    };

    const hoverStyles = hover
      ? "hover:scale-[1.02] hover:shadow-xl hover:shadow-ctp-crust/30 hover:border-ctp-surface2/50"
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;



