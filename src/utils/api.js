const TOKEN = process.env.REACT_APP_BITLY_AUTHORIZATION_TOKEN; // don't ever do this 😱

export const API_URL = 'https://api-ssl.bitly.com/v4/shorten';

export async function requestShortenedUrl(url) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify({ long_url: url }),
    });
    const data = await response.json();
    if (!response.ok) {
        throw new Error(`Error code: ${data.message}`);
    }
    return data;
}
