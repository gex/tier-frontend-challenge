import React, { useCallback, useState } from 'react';
import '../css/ShortenUrlForm.css';
import useIsMounted from '../utils/useIsMounted';
import { requestShortenedUrl } from '../utils/api';
import { copyToClipboard } from '../utils/clipboard';
import Form from './ui/Form';
import Input from './ui/Input';

const ShortenUrlForm = () => {
    const isMounted = useIsMounted();

    const [value, setValue] = useState('');
    const [result, setResult] = useState({
        url: null,
        error: null,
        isLoading: false,
    });

    const onChange = useCallback(
        (newValue) => {
            setValue(newValue);
            // updating the state doesn't prevent a pending request to resolve in the future though
            // TODO: use AbortController
            setResult({ url: null, error: null, isLoading: false });
        },
        [setValue, setResult],
    );

    const onSubmit = useCallback(async () => {
        try {
            setResult({ url: null, error: null, isLoading: true });
            const data = await requestShortenedUrl(value);
            await copyToClipboard(data.link);
            if (isMounted.current) {
                setResult({
                    url: data.link,
                    error: null,
                    isLoading: false,
                });
            }
        } catch (error) {
            if (isMounted.current) {
                setResult({
                    url: null,
                    error: error.message,
                    isLoading: false,
                });
            }
        }
    }, [isMounted, value, setResult]);

    // demonstrate the skipped rerenderings of the memoized components
    const [forcedRerenderingText, setForcedRerenderingText] = useState('');
    const onForcedRerenderingTextChange = useCallback(
        (newValue) => {
            setForcedRerenderingText(newValue);
        },
        [setForcedRerenderingText],
    );

    return (
        <main>
            <h1>The Great URL Shortener</h1>

            <div className="box">
                <Form
                    inputId="shorten"
                    inputLabel="URL"
                    placeholder="URL to shorten"
                    submitLabel="Shorten and copy URL"
                    value={value}
                    onChange={onChange}
                    onSubmit={onSubmit}
                />
            </div>

            {result.isLoading && (
                <div className="box">
                    <h2>Loading...</h2>
                </div>
            )}

            {result.url && (
                <div className="box">
                    <h2>Short URL</h2>
                    <p className="url">
                        <a href={result.url}>{result.url}</a>
                    </p>
                    <p className="hint">
                        The short URL has been also copied to your clipbord,
                        btw.
                    </p>
                </div>
            )}

            {result.error && (
                <div className="box">
                    <h2>Error</h2>
                    <div className="error">
                        <p>Something terrible happened</p>
                        <details>
                            <summary>Details for techies</summary>
                            {result.error}
                        </details>
                    </div>
                </div>
            )}

            <div className="box demo">
                <div className="form">
                    <Input
                        id="forced-rerendering-text"
                        label="Demonstrate memoized components"
                        value={forcedRerenderingText}
                        placeholder="Type anything"
                        onChange={onForcedRerenderingTextChange}
                    />
                </div>
            </div>
        </main>
    );
};

export default ShortenUrlForm;
