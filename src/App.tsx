import React, { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom"; // Use HashRouter
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import AuroraBackground from "./components/AuroraBackground";
import LoadingSpinner from "./components/LoadingSpinner";

const queryClient = new QueryClient();

// Lazy-load your page components
const LazyIndex = lazy(() => import("./pages/Index"));
const LazyNotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuroraBackground />
        <HashRouter basename="/aditya-software-portfolio/">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<LazyIndex />} />
              <Route path="*" element={<LazyNotFound />} />
            </Routes>
          </Suspense>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
