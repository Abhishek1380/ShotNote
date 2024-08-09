// src/VisitCounter.js
import React, { useEffect, useState } from 'react';

const VisitCounter = () => {
    const [visitCount, setVisitCount] = useState(0);

    useEffect(() => {
        // Retrieve and increment visit count from localStorage
        const count = parseInt(localStorage.getItem('visitCount') || '0', 10);
        const newCount = count + 1;
        localStorage.setItem('visitCount', newCount);
        setVisitCount(newCount);
    }, []);

    return (

        <span> {visitCount} </span>

    );
};

export default VisitCounter;
