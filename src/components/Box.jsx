import React from 'react';

const Box = ({ children, className }) => (
    <div className={`box ${className}`}>{children}</div>
);

export default Box;
