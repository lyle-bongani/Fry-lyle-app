import React, { useEffect, useRef, ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 600,
  once = true,
  id,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [once]);

  const getAnimationClass = () => {
    if (!isVisible) return "opacity-0";
    
    switch (direction) {
      case "up":
        return "animate-slide-up";
      case "down":
        return "animate-slide-down";
      case "left":
        return "animate-slide-left";
      case "right":
        return "animate-slide-right";
      case "none":
        return "animate-fade-in";
      default:
        return "animate-slide-up";
    }
  };

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`${getAnimationClass()} transition-opacity duration-500${
        className ? ` ${className}` : ""
      }`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}ms`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;