'use client';

import React, { useEffect } from 'react';

const CalendlyWidget = ({ url }: { url: string }) => {
  useEffect(() => {
    const head = document.querySelector('head');
    const script = document.createElement('script');
    script.setAttribute('src', 'https://assets.calendly.com/assets/external/widget.js');
    script.async = true;
    
    head?.appendChild(script);

    return () => {
      head?.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget" 
      data-url={url} 
      style={{ minWidth: '320px', height: '700px' }}
    ></div>
  );
};

export default CalendlyWidget;