import React from 'react';

const KeyIcon = ({color}:{color:string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <g fill={color} fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="none" style={{ mixBlendMode: 'normal' }}>
                <g transform="scale(10.66667,10.66667)">
                    <path d="M7,5c-3.84545,0 -7,3.15455 -7,7c0,3.84545 3.15455,7 7,7c2.77499,0 5.08941,-1.6853 6.27148,-4h2.72852v3h6v-3h2v-6h-1h-9.71289c-1.11451,-2.32444 -3.44795,-4 -6.28711,-4zM7,7c2.28025,0 4.09251,1.421 4.75586,3.32813l0.23242,0.67188h10.01172v2h-2v3h-2v-3h-5.98242l-0.24805,0.63477c-0.75942,1.94073 -2.60543,3.36523 -4.76953,3.36523c-2.75455,0 -5,-2.24545 -5,-5c0,-2.75455 2.24545,-5 5,-5zM7,9c-1.64501,0 -3,1.35499 -3,3c0,1.64501 1.35499,3 3,3c1.64501,0 3,-1.35499 3,-3c0,-1.64501 -1.35499,-3 -3,-3zM7,11c0.56413,0 1,0.43587 1,1c0,0.56413 -0.43587,1 -1,1c-0.56413,0 -1,-0.43587 -1,-1c0,-0.56413 0.43587,-1 1,-1z"></path>
                </g>
            </g>
        </svg>
    );
};

export default KeyIcon;