import React, { useCallback, useEffect, useRef, useState } from 'react';
import { requestShortenedUrl } from '../utils/api';

const ShortenUrlForm = () => {
    const isMounted = useRef(false);

    const [value, setValue] = useState('');
    const [result, setResult] = useState({
        url: null,
        isLoading: false,
    });

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

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
                setResult({ url: null, isLoading: true });
                const response = await requestShortenedUrl(value);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                if (isMounted.current) {
                    setResult({ url: data.link, isLoading: false });
                }
            } catch (error) {
                console.log(error);
                if (isMounted.current) {
                    setResult({ url: null, isLoading: false });
                }
            }
        },
        [isMounted, value, setResult],
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

            {result.isLoading && <div>Loading...</div>}

            {result.url && (
                <div>
                    <h2>Result</h2>
                    <p>Short url: {result.url}</p>
                </div>
            )}
        </main>
    );
};

export default ShortenUrlForm;
