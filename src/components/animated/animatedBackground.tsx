import React from 'react';

// AnimatedBackground component renders an SVG with animated waves
const AnimatedBackground: React.FC = () => {
    return (
        // Container for the waves, hidden on small screens
        <div className="waves-container hidden sm:block" aria-hidden="true">
            <svg 
                className="waves" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 24 100 100" 
                preserveAspectRatio="none" 
                shapeRendering="auto"
                aria-hidden="true" // Hides the SVG from screen readers
            >
                <defs>
                    {/* Define the wave path */}
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 100 v44h-352z" />
                </defs>
                <g className="parallax">
                    {/* Use the wave path multiple times to create a parallax effect */}
                    <use xlinkHref="#gentle-wave" x="48" y="0" />
                    <use xlinkHref="#gentle-wave" x="48" y="8" />
                    <use xlinkHref="#gentle-wave" x="48" y="7" />
                    <use xlinkHref="#gentle-wave" x="48" y="8" />
                </g>
            </svg>
        </div>
    );
};

export default AnimatedBackground;