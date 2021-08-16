import React, { useCallback, useEffect, useRef, useState } from 'react';
import '../css/ShortenUrlForm.css';
import { requestShortenedUrl } from '../utils/api';
import Box from './Box';

const ShortenUrlForm = () => {
    const isMounted = useRef(false);

    const [value, setValue] = useState('');
    const [result, setResult] = useState({
        url: null,
        error: null,
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
            // updating the state doesn't prevent a pending request to resolve in the future though
            // TODO: use AbortController
            setResult({ url: null, error: null, isLoading: false });
        },
        [setValue, setResult],
    );

    const onSubmit = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                setResult({ url: null, error: null, isLoading: true });
                const response = await requestShortenedUrl(value);
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                if (isMounted.current) {
                    setResult({
                        url: data.link,
                        error: null,
                        isLoading: false,
                    });
                }
                // TODO: polyfill based on https://caniuse.com/async-clipboard
                await navigator.clipboard.writeText(data.link);
            } catch (error) {
                if (isMounted.current) {
                    setResult({
                        url: null,
                        error: error.message,
                        isLoading: false,
                    });
                }
            }
        },
        [isMounted, value, setResult],
    );

    return (
        <main>
            <h1>The Great URL Shortener</h1>
            <Box className="form">
                <form onSubmit={onSubmit}>
                    <label htmlFor="shorten">
                        <span>Url</span>
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
            </Box>

            {result.isLoading && (
                <Box className="loading">
                    <h2>Loading...</h2>
                </Box>
            )}

            {result.url && (
                <Box className="result">
                    <h2>Short URL</h2>
                    <p className="url">
                        <a href={result.url}>{result.url}</a>
                    </p>
                    <p className="hint">
                        The short URL has been also copied to your clipbord,
                        btw.
                    </p>
                </Box>
            )}

            {result.error && (
                <Box className="error">
                    <h2>Error</h2>
                    <p>Something happened</p>
                    <details>
                        <summary>Tech blah blah</summary>
                        {result.error}
                    </details>
                </Box>
            )}
        </main>
    );
};

export default ShortenUrlForm;
