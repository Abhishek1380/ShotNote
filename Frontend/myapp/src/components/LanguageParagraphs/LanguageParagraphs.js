import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './LanguageParagraphs.css';

const LanguageParagraphs = () => {
    const [translatedText, setTranslatedText] = useState('');
    const [paragraphs, setParagraphs] = useState([]);
    const [activeParagraphIndex, setActiveParagraphIndex] = useState(0);
    const [activeLanguage, setActiveLanguage] = useState('Japanese');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isRandomMode, setIsRandomMode] = useState(false); // New state to manage mode

    useEffect(() => {
        const fetchParagraphs = async () => {
            try {
                const response = await fetch('https://shotnote.onrender.com/sample');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setParagraphs(data);

                // Select a random paragraph on initial load
                if (data.length > 0) {
                    setRandomParagraph(data.length);
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchParagraphs();
    }, []);

    const setRandomParagraph = (length) => {
        const randomIndex = Math.floor(Math.random() * length);
        setActiveParagraphIndex(randomIndex);
        setIsRandomMode(true); // Switch to random mode
    };

    const handleLanguageChange = (language) => {
        if (language === 'English') {
            setTranslatedText(paragraphs[activeParagraphIndex]?.english);
        } else if (language === 'Romaji') {
            setTranslatedText(paragraphs[activeParagraphIndex]?.romaji);
        } else {
            setTranslatedText(paragraphs[activeParagraphIndex]?.japanese);
        }
        setActiveLanguage(language);
    };

    const handleNext = () => {
        if (!isRandomMode) {
            // Only allow sequential navigation if not in random mode
            if (activeParagraphIndex < paragraphs.length - 1) {
                setActiveParagraphIndex(prevIndex => prevIndex + 1);
                setTranslatedText('');
            }
        }
    };

    const handlePrevious = () => {
        if (!isRandomMode) {
            // Only allow sequential navigation if not in random mode
            if (activeParagraphIndex > 0) {
                setActiveParagraphIndex(prevIndex => prevIndex - 1);
                setTranslatedText('');
            }
        }
    };

    const handleRandomParagraph = () => {
        setRandomParagraph(paragraphs.length);
        setTranslatedText(''); // Reset translated text when changing paragraph
    };

    const handleToggleMode = () => {
        setIsRandomMode(prevMode => !prevMode); // Toggle between random and sequential mode
        if (isRandomMode) {
            setActiveParagraphIndex(0); // Reset to first paragraph if switching to sequential
        } else {
            handleRandomParagraph(); // Randomly select a paragraph if switching to random
        }
    };

    return (
        <div className={`blog-post ${isDarkMode ? 'dark' : 'light'}`}>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching data: {error}</p>}
            {!loading && !error && paragraphs.length > 0 && (
                <div className="card mb-3">
                    <div className="image-container" style={{ margin: 'auto' }}>
                        <div dangerouslySetInnerHTML={{ __html: paragraphs[activeParagraphIndex]?.img }} />
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">
                            {paragraphs[activeParagraphIndex].title.japanese}
                        </h5>
                        <p className="card-text">
                            {paragraphs[activeParagraphIndex].japanese}
                        </p>
                        <div className="button-container">
                            <button type="button" className="btn btn-info" onClick={() => handleLanguageChange('English')}>English</button>
                            <button type="button" className="btn btn-info" onClick={() => handleLanguageChange('Romaji')}>Romaji</button>
                            <button
                                type="button"
                                className="btn btn-toggle"
                                onClick={() => setIsDarkMode(prevMode => !prevMode)}
                            >
                                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleRandomParagraph}
                            >
                                Random Paragraph
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleToggleMode}
                            >
                                {isRandomMode ? 'Switch to Sequential' : 'Switch to Random'}
                            </button>
                        </div>
                    </div>
                    {translatedText && (
                        <div className="card mb-3 mt-3">
                            <div className="card-body">
                                <h5 className="card-title">
                                    {activeLanguage === 'Romaji' ? paragraphs[activeParagraphIndex].title.romaji :
                                        activeLanguage === 'English' ? paragraphs[activeParagraphIndex].title.english : null}
                                </h5>
                                <p className="card-text">{translatedText}</p>
                            </div>
                        </div>
                    )}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-center">
                            <li className={`page-item ${activeParagraphIndex === 0 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handlePrevious} disabled={activeParagraphIndex === 0 || isRandomMode}>Previous</button>
                            </li>
                            <li className="page-item">
                                <span className="page-link">{activeParagraphIndex + 1} / {paragraphs.length}</span>
                            </li>
                            <li className={`page-item ${activeParagraphIndex === paragraphs.length - 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={handleNext} disabled={activeParagraphIndex === paragraphs.length - 1 || isRandomMode}>Next</button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default LanguageParagraphs;
