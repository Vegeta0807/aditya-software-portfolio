import { useEffect, useRef } from 'react';

const AuroraBackground = () => {
  const auroraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!auroraRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth) * 100;
      const yPos = (clientY / innerHeight) * 100;
      
      const layers = auroraRef.current.children;
      Array.from(layers).forEach((layer, index) => {
        const offset = (index + 1) * 0.5;
        (layer as HTMLElement).style.transform = `translate(${xPos * offset}px, ${yPos * offset}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="aurora-bg" ref={auroraRef}>
      <div className="aurora-layer"></div>
      <div className="aurora-layer"></div>
      <div className="aurora-layer"></div>
    </div>
  );
};

export default AuroraBackground;