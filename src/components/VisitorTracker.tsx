'use client';
import { useEffect, useRef } from 'react';

function VisitorTracker() {
  const hasFetched = useRef(false); // Ref to track if fetch was made

  useEffect(() => {
    if (hasFetched.current) return; // Prevent multiple requests
    hasFetched.current = true;

    const updateVisit = async () => {
      try {
        const response = await fetch('/api/update-visitor', {
          method: 'POST',
          credentials: 'same-origin',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.counted) {
          console.log('Visit counted successfully');
        } else if (data.alreadyCounted) {
          console.log('Visit already counted');
        }
      } catch (error) {
        console.error('Visit count update failed:', error);
      }
    };

    // Call updateVisit once when the component mounts
    updateVisit();

  }, []); // Empty dependency array ensures this effect runs only once on mount

  return null; // No UI to render
}

export default VisitorTracker;
