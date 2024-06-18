import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Importer les styles CSS

function App() {
    const [prompt, setPrompt] = useState('');
    const [genre, setGenre] = useState('');
    const [characters, setCharacters] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false); // État pour le chargement

    const genres = [
        'adventure',
        'comedy',
        'science-fiction',
        'horror',
        'thriller',
        'romantic',
        'fantastic',
        'politic',
        'other'
    ];

    const generateStory = async () => {
        setLoading(true); // Commence le chargement
        try {
            const response = await axios.post('http://127.0.0.1:5000/generate', {
                prompt,
                genre,
                characters: characters ? parseInt(characters) : undefined
            });
            setStory(response.data.story);
        } catch (error) {
            console.error('Error generating story:', error);
        } finally {
            setLoading(false); // Termine le chargement
        }
    };

    return (
        <div className="App">
            <h1>Story Weaver</h1>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your story prompt here..."
            />
            <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
            >
                <option value="">Select genre</option>
                {genres.map((g, index) => (
                    <option key={index} value={g}>{g}</option>
                ))}
            </select>
            <input
                type="number"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
                placeholder="Enter number of characters (optional)"
            />
            <button onClick={generateStory} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Story'}
            </button>
            {loading && <div className="loader"></div>} {/* Affiche le loader */}
            <div>
                <h2>Your Story</h2>
                <p>{story}</p>
            </div>
        </div>
    );
}

export default App;
