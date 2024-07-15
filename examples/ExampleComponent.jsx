import React, { useRef, useEffect } from 'react';
import MovingNetworkAnimation from 'moving-network-animation';

const ExampleComponent = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const animation = new MovingNetworkAnimation(containerRef.current);

        // Optional: Configure with settings or respond to props
        // const animation = new MovingNetworkAnimation(containerRef.current, { maxNodes: 100 });

        return () => {
            animation.destroy(); // Proper cleanup
        };
    }, []);

    return (
        <div ref={containerRef} style={{ width: '100vw', height: '100vh', background: 'black' }} >
            {/* Animation will render inside this div */}
        </div>
    );
};

export default ExampleComponent;