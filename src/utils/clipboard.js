// TODO: polyfill based on https://caniuse.com/async-clipboard
export const copyToClipboard = text => navigator.clipboard.writeText(text);
