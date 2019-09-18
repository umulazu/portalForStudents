import React, { useCallback, useState } from "react";

const OnHoverComponent = ({className, children, hoveringComponent}) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseEnter = () => {
        setIsHovering(true);
    };
    const handleMouseLeave = () => {
        setIsHovering(false);
    };

    return (
        <div
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isHovering && hoveringComponent}
        </div>
    )
};

export default OnHoverComponent;