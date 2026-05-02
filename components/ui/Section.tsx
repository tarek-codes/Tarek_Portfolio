import { HTMLAttributes, forwardRef } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  fullWidth?: boolean;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, fullWidth = false, className = "", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={`py-16 sm:py-20 md:py-24 lg:py-28 relative ${className}`}
        {...props}
      >
        <div
          className={
            fullWidth ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          }
        >
          {children}
        </div>
      </section>
    );
  },
);

Section.displayName = "Section";

export default Section;



