import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FlashCards.css';

const Flashcard = () => {
    const [flashcards, setFlashcards] = useState([]);
    const [flippedStates, setFlippedStates] = useState([]);


    useEffect(() => {
        const fetchFlashcards = async () => {
            try {
                const response = await axios.get('http://localhost:3000/kanji');
                setFlashcards(response.data);
                setFlippedStates(new Array(response.data.length).fill(false));
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching flashcards:', error);
            }
        };

        fetchFlashcards();
    }, []);


    if (flashcards.length === 0) {
        return <div>Loading...</div>;
    }


    const handleFlip = (index) => {
        setFlippedStates((prevFlippedStates) => {
            const newFlippedStates = [...prevFlippedStates];
            newFlippedStates[index] = !newFlippedStates[index];
            return newFlippedStates;
        });
    };

    return (
        <div className="flashcard-container">
            {flashcards.map((card, index) => (
                <div key={index} className={`flashcard ${flippedStates[index] ? 'flipped' : ''}`}>
                    <div className="front">
                        <h2>{card.kanji}</h2>

                    </div>
                    <div className="back">
                        <h2>{card.kanji}</h2>
                        <h2>{card.meaning}</h2>
                        <h2>{card.romaji}</h2>
                        <h2>{card.kanjiMean}</h2>
                        <h2>{card.furigana}</h2>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default Flashcard;
