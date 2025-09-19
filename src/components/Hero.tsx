import { Button } from "@/components/ui/button";

const Hero = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = e.currentTarget.href.split('#')[1];
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
      <div className="text-center space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <h1 className="pb-4 text-6xl md:text-8xl font-premium font-bold bg-gradient-to-r from-aurora-aqua via-aurora-purple to-aurora-green bg-clip-text text-transparent">
            Aditya Barangali
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-foreground/80">
            Software Developer
          </h2>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Crafting digital experiences with modern technologies and creative solutions.
          Passionate about clean code, user experience, and innovative problem-solving.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="aurora" size="lg" className="glow-on-hover">
            <a href="#projects" onClick={handleClick}>View Projects</a>
          </Button>
          <Button asChild variant="glass" size="lg">
            <a href="#contact" onClick={handleClick}>Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;