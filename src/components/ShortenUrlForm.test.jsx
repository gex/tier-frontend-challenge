import React from 'react';
import { render, screen } from '@testing-library/react';
import ShortenUrlForm from './ShortenUrlForm';

it('should render an input and a button', () => {
    render(<ShortenUrlForm />);
    const input = screen.getByRole('textbox', { name: /url/i });
    expect(input).toBeInTheDocument();
    const button = screen.getByRole('button', {
        name: /shorten and copy url/i,
    });
    expect(button).toBeInTheDocument();
});
