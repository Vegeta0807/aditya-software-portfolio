import { useEffect, useRef } from 'react';

const AuroraBackground = () => {
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!auroraRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Subtle mouse interaction - reduce the movement factor
      const xPos = ((clientX / innerWidth) - 0.5) * 20;
      const yPos = ((clientY / innerHeight) - 0.5) * 15;
      
      const layers = auroraRef.current.children;
      Array.from(layers).forEach((layer, index) => {
        const multiplier = (index + 1) * 0.3;
        const rotation = Math.sin(Date.now() * 0.0005 + index) * 2;
        (layer as HTMLElement).style.transform = `translate(${xPos * multiplier}px, ${yPos * multiplier}px) rotate(${rotation}deg)`;
      });
    };

    // Add automatic animation
    const animate = () => {
      if (!auroraRef.current) return;
      
      const layers = auroraRef.current.children;
      Array.from(layers).forEach((layer, index) => {
        const time = Date.now() * 0.0002;
        const waveX = Math.sin(time + index * 0.5) * 30;
        const waveY = Math.cos(time * 0.7 + index * 0.3) * 20;
        const currentTransform = (layer as HTMLElement).style.transform;
        
        if (!currentTransform.includes('translate')) {
          (layer as HTMLElement).style.transform = `translate(${waveX}px, ${waveY}px)`;
        }
      });
    };

    const animationInterval = setInterval(animate, 50);
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