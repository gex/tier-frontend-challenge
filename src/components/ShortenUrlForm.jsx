import React, { useCallback, useState } from 'react';

export const API_URL = 'https://api-ssl.bitly.com/v4/shorten';
const TOKEN = process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN; // 😱

const ShortenUrlForm = () => {
    const [value, setValue] = useState('');
    const [url, setUrl] = useState(null);

    const onChange = useCallback(
        (e) => {
            setValue(e.target.value);
        },
        [setValue],
    );

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                    body: JSON.stringify({ long_url: value }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                setUrl(data.link);
            } catch (error) {
                console.log(error);
            }
        },
        [value, setUrl],
    );

    return (
        <main>
            <form onSubmit={onSubmit}>
                <label htmlFor="shorten">
                    Url:
                    <input
                        placeholder="Url to shorten"
                        id="shorten"
                        type="text"
                        value={value}
                        onChange={onChange}
                    />
                </label>
                <input type="submit" value="Shorten and copy URL" />
            </form>

            {url && (
                <div>
                    <h2>Result</h2>
                    <p>Short url: {url}</p>
                </div>
            )}
        </main>
    );
};

export default ShortenUrlForm;
