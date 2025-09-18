import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import AuroraBackground from "@/components/AuroraBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <AuroraBackground
        speed={3.2}
        palette={{
          orange: [0.95, 0.25, 0.35],
          blue: [0.20, 0.65, 1.0],
          base: [0.03, 0.035, 0.05],
        }}
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-gray-600">Oops! Page not found</p>
        <a href="/" className="text-blue-500 underline hover:text-blue-700">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
