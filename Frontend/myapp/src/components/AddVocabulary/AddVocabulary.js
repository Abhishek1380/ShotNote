import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './AddVocabulary.css';

function AddVocabulary({ isAdmin }) {
    const [vocabularyList, setVocabularyList] = useState([]);
    const [formData, setFormData] = useState({
        kanji: '',
        furigana: '',
        vocabulary: '',
        meaning: ''
    });

    useEffect(() => {
        axios.get('https://shotnote.onrender.com/vocabulary')
            .then((response) => {
                setVocabularyList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching vocabulary:', error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const addVocabulary = () => {
        axios.post('https://shotnote.onrender.com/vocabulary', formData)
            .then((response) => {
                setVocabularyList([...vocabularyList, response.data]);
                setFormData({ kanji: '', furigana: '', vocabulary: '', meaning: '' });
            })
            .catch((error) => {
                console.error('Error adding vocabulary:', error);
            });
    };

    const deleteVocabulary = (id) => {
        axios.delete(`https://shotnote.onrender.com/vocabulary/${id}`)
            .then(() => {
                setVocabularyList(vocabularyList.filter((item) => item._id !== id));
            })
            .catch((error) => {
                console.error('Error deleting vocabulary:', error);
            });
    };

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">kanji</th>
                        <th scope="col">furigana</th>
                        <th scope="col">Vocabulary</th>
                        <th scope="col">Meaning</th>
                        {isAdmin && <th scope="col">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {vocabularyList.map((item, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.kanji}</td>
                            <td>{item.furigana}</td>
                            <td>{item.vocabulary}</td>
                            <td>{item.meaning}</td>
                            {/* {isAdmin && ( */}
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteVocabulary(item._id)}
                                >
                                    Delete
                                </button>
                            </td>
                            {/* )} */}
                        </tr>
                    ))}
                </tbody>
            </table>


            {/* {isAdmin && ( */}
            <div className="modify">
                <h4>Add Vocabulary</h4>
                <form>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="kanji"
                            placeholder="Kanji"
                            value={formData.kanji}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="furigana"
                            placeholder="Furigana"
                            value={formData.furigana}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="vocabulary"
                            placeholder="Vocabulary"
                            value={formData.vocabulary}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="meaning"
                            placeholder="Meaning"
                            value={formData.meaning}
                            onChange={handleChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary mt-2"
                        onClick={addVocabulary}
                    >
                        Add Vocabulary
                    </button>
                </form>
            </div>
            {/* )} */}
        </div>
    );
}

export default AddVocabulary;
