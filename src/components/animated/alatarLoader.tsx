import React, { ReactElement } from 'react';
import "./animated.css";

/**
 * AlatarLoader
 * ------------
 * AlatarLoader is a React functional component that renders an animated loader.
 * 
 * The loader consists of two main parts:
 * 1. A set of div elements with the class "triangles" which contains multiple divs with the classes "tri" and "angles".
 * 2. A div with the class "loader" which contains a div with the class "spinner".
 * 
 * The purpose of this component is to display a loading animation.
 * 
 * @returns {JSX.Element} The JSX code for the animated loader.
 */
const AlatarLoader: React.FC = () : ReactElement => {
    return (
        <div className="triangles animate-pulse">
            <div className="tri angles"/>
            <div className="tri angles"/>
            <div className="tri"/>
            <div className="tri angles"/>
            <div className="tri angles"/>
            <div className="tri"/>
            <div className="tri angles"/>
            <div className="tri"/>
            <div className="tri angles"/>
        </div>
    );
};

export default AlatarLoader;