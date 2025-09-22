import { ChevronDown } from "lucide-react";
import Lenis from "lenis";

interface ScrollToLinkProps {
  href: string;
  lenis?: Lenis | null;
}

const ScrollToLink = ({ href, lenis }: ScrollToLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(href, { offset: -100 });
    } else {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <a
      href={href}
      aria-label={`Scroll to ${href.substring(1)}`}
      onClick={handleClick}
      className="group absolute right-4 bottom-4 text-white/80 transition z-50"
    >
      <ChevronDown className="w-10 h-10 transition group-hover:translate-y-0.5" />
    </a>
  );
};

export default ScrollToLink;
