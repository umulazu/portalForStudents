import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

// where to check authorized flag?
const OnHoverComponent = ({className, children, hoveringComponent}) => {
    // where we need to keep data for secondComponent????
    // if we keep it in child component, it will do redundant query
    //   but if we keep it here, this component will became more specific
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