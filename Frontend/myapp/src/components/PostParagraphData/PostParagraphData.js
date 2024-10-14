import React, { useState } from 'react';
import axios from 'axios';
import './PostParagraphData.css'

const PostParagraphData = () => {

    const [formData, setFormData] = useState({
        titleEnglish: '',
        titleRomaji: '',
        titleJapanese: '',
        paragraphEnglish: '',
        paragraphRomaji: '',
        paragraphJapanese: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const paragraphData = {
            title: {
                english: formData.titleEnglish,
                romaji: formData.titleRomaji,
                japanese: formData.titleJapanese,
            },
            english: formData.paragraphEnglish,
            romaji: formData.paragraphRomaji,
            japanese: formData.paragraphJapanese,
        };

        try {
            const response = await axios.post('https://shotnote.onrender.com/sample', paragraphData);
            console.log(response.data);
            alert('Paragraph saved successfully!');
        } catch (error) {
            console.error(error);
            alert('Error saving paragraph.');
        }
    };

    return (
        <div class="form">

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title (English):</label>
                    <input
                        type="text"
                        name="titleEnglish"
                        value={formData.titleEnglish}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Title (Romaji):</label>
                    <input
                        type="text"
                        name="titleRomaji"
                        value={formData.titleRomaji}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Title (Japanese):</label>
                    <input
                        type="text"
                        name="titleJapanese"
                        value={formData.titleJapanese}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Paragraph (English):</label>
                    <textarea
                        name="paragraphEnglish"
                        value={formData.paragraphEnglish}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Paragraph (Romaji):</label>
                    <textarea
                        name="paragraphRomaji"
                        value={formData.paragraphRomaji}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label>Paragraph (Japanese):</label>
                    <textarea
                        name="paragraphJapanese"
                        value={formData.paragraphJapanese}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit">Save Paragraph</button>
            </form>
        </div>
    );
};

export default PostParagraphData;
