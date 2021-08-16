const TOKEN = process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN; // don't ever do this 😱

export const API_URL = 'https://api-ssl.bitly.com/v4/shorten';

export function requestShortenedUrl(url) {
    return fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ long_url: url }),
    });
}
