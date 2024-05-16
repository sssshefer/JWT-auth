import React from 'react';

const CardIcon = ({color}:{color:string}) => {
    return (
        <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8V16C21 17.6569 19.6569 19 18 19H6C4.34315 19 3 17.6569 3 16V8Z" stroke={color} strokeWidth="2"/>
            <path d="M3 10H21" stroke={color} strokeWidth="2"/>
            <path d="M14 15L17 15" stroke={color} strokeWidth="2" strokeLinecap="round"/>
        </svg>
    );
};

export default CardIcon;