import React from 'react';

const ResetIcon = ({color}:{color:string}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 256 256"
        >
            <g fill={color} fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt"
               strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none"
               fontWeight="none" fontSize="none" textAnchor="none" style={{mixBlendMode: 'normal'}}>
                <g transform="scale(8.53333,8.53333)">
                    <path
                        d="M15,3c-0.36064,-0.0051 -0.69608,0.18438 -0.87789,0.49587c-0.18181,0.3115 -0.18181,0.69676 0,1.00825c0.18181,0.3115 0.51725,0.50097 0.87789,0.49587c5.53453,0 10,4.46547 10,10c0,5.53453 -4.46547,10 -10,10c-5.53453,0 -10,-4.46547 -10,-10c0,-2.34976 0.80854,-4.50317 2.16016,-6.20703l1.83984,2.20703l2,-7l-7,1l1.86719,2.24023c-1.78052,2.09483 -2.86719,4.80155 -2.86719,7.75977c0,6.61547 5.38453,12 12,12c6.61547,0 12,-5.38453 12,-12c0,-6.61547 -5.38453,-12 -12,-12z"></path>
                </g>
            </g>
        </svg>);
};

export default ResetIcon;