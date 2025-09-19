import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="text-white text-xl flex items-center">
        Loading
        <span className="animate-pulse delay-0 text-3xl mx-1">.</span>
        <span className="animate-pulse delay-100 text-3xl mx-1">.</span>
        <span className="animate-pulse delay-200 text-3xl mx-1">.</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
