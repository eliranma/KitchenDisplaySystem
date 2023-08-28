import React, { useRef, useEffect } from 'react';

const LongText = ({ text, duration = 10000, className='' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const scrollAmount = scrollHeight - clientHeight;

      let startTime = null;

      const scrollText = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const scrollPosition = (progress / duration) * scrollAmount;

        container.scrollTop = scrollPosition;

        if (scrollPosition < scrollAmount) {
          requestAnimationFrame(scrollText);
        }
      };

      requestAnimationFrame(scrollText);
    }
  }, [text, duration]);

  return (
    <div
      ref={containerRef}
      className="h-32 overflow-hidden bg-gray-100 border p-4"
      style={{ whiteSpace: 'nowrap' }}
    >
           <span className={className}>
        {text}
      </span>
    </div>
  );
};

export default LongText;
