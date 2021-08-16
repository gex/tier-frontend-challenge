import React, { useCallback, useState } from 'react';
import { requestShortenedUrl } from '../utils/api';

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
                const response = await requestShortenedUrl(value);
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
