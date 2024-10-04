// src/components/Paragraph.js
import React, { useEffect, useState } from 'react';
import './paragraph.css';

const Paragraph = () => {
    const [paragraph, setParagraph] = useState({ english: '', japanese: '' });
    const [language, setLanguage] = useState('english');


    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/sample');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setParagraph(data[0]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const showLanguage = (lang) => {
        setLanguage(lang);
    };

    return (
        <div className="container">
            <div className="paragraph-box">
                <p id="paragraph">{language === 'english' ? paragraph.english : paragraph.japanese}</p>
                <div className="button-container">
                    <button onClick={() => showLanguage('english')}>English</button>
                    <button onClick={() => showLanguage('japanese')}>Japanese</button>
                </div>
            </div>
        </div>
    );
};

export default Paragraph;
