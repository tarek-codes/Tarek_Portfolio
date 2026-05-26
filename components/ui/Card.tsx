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
      default: "bg-ctp-surface0/40 backdrop-blur-xl border border-ctp-surface1/30 shadow-sm",
      bordered:
        "bg-ctp-surface0/20 border border-ctp-surface1/60 backdrop-blur-md",
      elevated:
        "bg-gradient-to-b from-ctp-surface0/80 to-ctp-surface0/40 shadow-lg shadow-black/20 backdrop-blur-xl border border-ctp-surface1/40",
    };

    const hoverStyles = hover
      ? "hover:-translate-y-1 hover:shadow-xl hover:shadow-ctp-crust/40 hover:border-ctp-surface2/60 hover:bg-ctp-surface0/60"
      : "";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`}
        {...props}
      >
        {/* Subtle inner top highlight */}
        <div className="absolute inset-0 rounded-2xl border border-white/5 pointer-events-none mix-blend-overlay" />
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";

export default Card;



