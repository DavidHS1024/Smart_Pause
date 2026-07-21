import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (ref, options = {}) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const elements = element.querySelectorAll('.gsap-fade-up');
    
    elements.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        ...options
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [ref, options]);
};
