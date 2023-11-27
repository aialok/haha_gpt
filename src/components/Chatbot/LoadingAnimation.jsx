import React from 'react';

function LoadingAnimation() {
  return (
    <div className="flex items-center">
      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2 animate-ping"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping"></div>
    </div>
  );
}

export default LoadingAnimation;
