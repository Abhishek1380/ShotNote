import React, { useState } from 'react';

const AddKanji = () => {
    const [Id, setId] = useState('');
    const [kanji, setKanji] = useState('');
    const [romaji, setRomaji] = useState('');
    const [furigana, setFurigana] = useState('');
    const [meaning, setMeaning] = useState('');
    const [kanjiMean, setKanjiMean] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(null);

        const data = {
            kanji,
            meaning,
            romaji,
            kanjiMean,
            furigana
        };

        try {
            const response = await fetch('http://localhost:3000/kanji', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            setSuccess('Kanji data submitted successfully!');
            console.log('Response:', result);

            setKanji('');
            setMeaning('');
            setRomaji('');
            setKanjiMean('');
            setFurigana('');
        } catch (error) {
            setError(error.message);
            console.error('Error submitting kanji data:', error);
        }
    };

    return (
        <div className="container">
            <h2>Add Kanji Data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="Id" className="form-label">Id:</label>
                    <input
                        type="text"
                        id="Id"
                        className="form-control"
                        value={Id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="kanji" className="form-label">Kanji:</label>
                    <input
                        type="text"
                        id="kanji"
                        className="form-control"
                        value={kanji}
                        onChange={(e) => setKanji(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="meaning" className="form-label">Meaning:</label>
                    <input
                        type="text"
                        id="meaning"
                        className="form-control"
                        value={meaning}
                        onChange={(e) => setMeaning(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="romaji" className="form-label">Romaji:</label>
                    <input
                        type="text"
                        id="romaji"
                        className="form-control"
                        value={romaji}
                        onChange={(e) => setRomaji(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="kanjiMean" className="form-label">Kanji Example:</label>
                    <input
                        type="text"
                        id="kanjiMean"
                        className="form-control"
                        value={kanjiMean}
                        onChange={(e) => setKanjiMean(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="furigana" className="form-label">Furigana:</label>
                    <input
                        type="text"
                        id="furigana"
                        className="form-control"
                        value={furigana}
                        onChange={(e) => setFurigana(e.target.value)}
                        required
                    />
                </div>





                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            {error && <div className="alert alert-danger mt-3">{error}</div>}
            {success && <div className="alert alert-success mt-3">{success}</div>}
        </div>
    );
};

export default AddKanji;
