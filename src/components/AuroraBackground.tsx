import { useEffect, useRef } from 'react';

const AuroraBackground = () => {
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!auroraRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Focused beam follows mouse subtly
      const xOffset = ((clientX / innerWidth) - 0.5) * 30;
      const yOffset = ((clientY / innerHeight) - 0.5) * 20;
      
      const layers = auroraRef.current.children;
      Array.from(layers).forEach((layer, index) => {
        const multiplier = (index + 1) * 0.2;
        const skew = xOffset * 0.1;
        (layer as HTMLElement).style.transform = `translate(${xOffset * multiplier}px, ${yOffset * multiplier * 0.5}px) skewX(${skew}deg)`;
      });
    };

    // Subtle breathing animation for the beam
    const animate = () => {
      if (!auroraRef.current) return;
      
      const layers = auroraRef.current.children;
      const time = Date.now() * 0.0003;
      
      Array.from(layers).forEach((layer, index) => {
        const currentTransform = (layer as HTMLElement).style.transform;
        const breathe = Math.sin(time + index * 0.5) * 5;
        
        if (!currentTransform.includes('translate')) {
          (layer as HTMLElement).style.transform = `translateY(${breathe}px) scale(${1 + Math.sin(time) * 0.02})`;
        }
      });
    };

    const animationInterval = setInterval(animate, 60);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="aurora-bg" ref={auroraRef}>
      <div className="aurora-layer aurora-wave-1"></div>
      <div className="aurora-layer aurora-wave-2"></div>
      <div className="aurora-layer aurora-wave-3"></div>
      <div className="aurora-layer aurora-wave-4"></div>
    </div>
  );
};

export default AuroraBackground;