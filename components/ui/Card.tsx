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
    const baseStyles = "relative rounded-2xl transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group";

    const variants = {
      default:
        "bg-ctp-surface0/30 backdrop-blur-xl border border-ctp-surface1/40 shadow-[0_10px_30px_-22px_rgba(17,17,27,0.7)]",
      bordered:
        "bg-ctp-surface0/20 border border-ctp-surface1/50 backdrop-blur-md",
      elevated:
        "bg-ctp-surface0/45 shadow-[0_18px_40px_-26px_rgba(17,17,27,0.8)] backdrop-blur-xl border border-ctp-surface1/50",
    };

    const hoverStyles = hover
      ? "hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-26px_rgba(17,17,27,0.75)] hover:border-ctp-surface2/50 hover:bg-ctp-surface0/45"
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
  {/* Subtle inner top highlight */}
  <div className="absolute inset-0 rounded-2xl border border-white/4 pointer-events-none mix-blend-overlay" />
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;



