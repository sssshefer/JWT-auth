import React from 'react';

const LeftArrow = ({color}:{color:string}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="20"
            height="20"
            viewBox="0 0 256 256"
            xmlSpace="preserve"
        >
            <g
                style={{
                    stroke: 'none',
                    strokeWidth: 0,
                    strokeDasharray: 'none',
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'miter',
                    strokeMiterlimit: 10,
                    fill: 'none',
                    fillRule: 'nonzero',
                    opacity: 1,
                }}
                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
            >
                <path
                    d="M 4 49 h 82 c 2.209 0 4 -1.791 4 -4 s -1.791 -4 -4 -4 H 4 c -2.209 0 -4 1.791 -4 4 S 1.791 49 4 49 z"
                    style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: color,
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                />
                <path
                    d="M 16.993 61.993 c 1.023 0 2.048 -0.391 2.828 -1.172 c 1.563 -1.562 1.563 -4.095 0 -5.656 L 9.657 45 l 10.164 -10.164 c 1.563 -1.562 1.563 -4.095 0 -5.657 c -1.561 -1.562 -4.094 -1.562 -5.656 0 L 1.172 42.171 C 0.422 42.922 0 43.939 0 45 c 0 1.061 0.422 2.078 1.172 2.828 l 12.993 12.993 C 14.945 61.603 15.97 61.993 16.993 61.993 z"
                    style={{
                        stroke: 'none',
                        strokeWidth: 1,
                        strokeDasharray: 'none',
                        strokeLinecap: 'butt',
                        strokeLinejoin: 'miter',
                        strokeMiterlimit: 10,
                        fill: color,
                        fillRule: 'nonzero',
                        opacity: 1,
                    }}
                    transform="matrix(1 0 0 1 0 0)"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};

export default LeftArrow;
