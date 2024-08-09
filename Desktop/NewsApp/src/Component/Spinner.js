import React from 'react';
import './component.css';

const Spinner = () => {
    return (
        <div className="spinner-overlay">
            <div className="spinner">
                <img src="/loading.gif" alt="loading" />
            </div>
        </div>
    );
};

export default Spinner;
