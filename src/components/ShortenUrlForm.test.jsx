import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { API_URL } from '../utils/api';
import ShortenUrlForm from './ShortenUrlForm';

const server = setupServer();

server.use(
    rest.post(API_URL, (req, res, ctx) => {
        const { long_url: url } = req.body;
        if (url === 'https://www.tier.app') {
            return res(ctx.json({ link: 'https://bit.ly/tier' }));
        }
        return res(
            ctx.status(403),
            ctx.json({ message: 'INVALID_ARG_LONG_URL' }),
        );
    }),
);

beforeAll(() => {
    server.listen();
});

afterAll(() => {
    server.close();
});

it('should render an input and a button', () => {
    render(<ShortenUrlForm />);
    const input = screen.getByRole('textbox', { name: /url/i });
    expect(input).toBeInTheDocument();
    const button = screen.getByRole('button', {
        name: /shorten and copy url/i,
    });
    expect(button).toBeInTheDocument();
});

it('should show loading after clicking on the button', () => {
    render(<ShortenUrlForm />);
    const input = screen.getByRole('textbox', { name: /url/i });
    fireEvent.change(input, {
        target: { value: 'https://www.tier.app' },
    });
    const button = screen.getByRole('button', {
        name: /shorten and copy url/i,
    });
    fireEvent.click(button);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

it('should show the shorten url', async () => {
    render(<ShortenUrlForm />);
    const input = screen.getByRole('textbox', { name: /url/i });
    fireEvent.change(input, {
        target: { value: 'https://www.tier.app' },
    });
    const button = screen.getByRole('button', {
        name: /shorten and copy url/i,
    });
    fireEvent.click(button);
    await waitFor(() => {
        expect(screen.getByText(/result/i)).toBeInTheDocument();
        expect(
            screen.getByText(/https:\/\/bit\.ly\/tier/i),
        ).toBeInTheDocument();
    });
});

it('should show an error message when the api request fails', async () => {
    render(<ShortenUrlForm />);
    const input = screen.getByRole('textbox', { name: /url/i });
    fireEvent.change(input, {
        target: { value: 'this is not an url' },
    });
    const button = screen.getByRole('button', {
        name: /shorten and copy url/i,
    });
    fireEvent.click(button);
    await waitFor(() => {
        expect(screen.getByText(/error/i)).toBeInTheDocument();
        expect(screen.getByText(/something happened/i)).toBeInTheDocument();
    });
});

it('reset state when the input changes', async () => {
    render(<ShortenUrlForm />);
    const input = screen.getByRole('textbox', { name: /url/i });
    fireEvent.change(input, {
        target: { value: 'https://www.tier.app' },
    });
    const button = screen.getByRole('button', {
        name: /shorten and copy url/i,
    });
    fireEvent.click(button);
    await waitFor(() => {
        screen.getByText(/result/i);
    });
    fireEvent.change(input, {
        target: { value: 'another url or something like that' },
    });
    expect(screen.queryByText(/result/i)).not.toBeInTheDocument();
});
