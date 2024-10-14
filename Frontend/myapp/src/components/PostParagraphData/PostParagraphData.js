import React, { useState } from 'react';
import axios from 'axios';
import './PostParagraphData.css';

const PostParagraphData = () => {

    const [formData, setFormData] = useState({
        titleEnglish: '',
        titleRomaji: '',
        titleJapanese: '',
        paragraphEnglish: '',
        paragraphRomaji: '',
        paragraphJapanese: '',
        images: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e, index) => {
        const newImages = [...formData.images];
        newImages[index] = e.target.value;
        setFormData({ ...formData, images: newImages });
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
            images: formData.images,
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
        <div className="form">
            <form onSubmit={handleSubmit}>


                <div>
                    <label>Level:</label>
                    <input
                        type="text"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Length: </label>
                    <input
                        type="text"
                        name="length"
                        value={formData.length}
                        onChange={handleChange}
                        required
                    />
                </div>

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




                {formData.images.map((image, index) => (
                    <div key={index}>
                        <label>Image {index + 1}:</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => handleImageChange(e, index)}
                            placeholder={`Image URL ${index + 1}`}
                        />
                    </div>
                ))}
                {formData.images.length < 6 && (
                    <button type="button" onClick={() => setFormData({ ...formData, images: [...formData.images, ''] })}>
                        Add Another Image
                    </button>
                )}

                <button type="submit">Save Paragraph</button>
            </form>


            <div className="image-preview">
                {formData.images.map((image, index) => (
                    <img key={index} src={image} alt={`Image ${index + 1}`} style={{ width: '100px', height: '100px' }} />
                ))}
            </div>
        </div>
    );
};

export default PostParagraphData;
