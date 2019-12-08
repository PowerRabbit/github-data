import React from 'react';
import { render } from '@testing-library/react';
import { UserRepo } from './userRepo';

const RepoData = {
    ownerId: 777,
    name: 'Test name',
    html_url: 'html_url',
    stargazers_count: 555,
    language: 'Kobol'
}

test('renders name', () => {
    const getByText = render(<UserRepo repoData={RepoData} />).getByText;
    const checkEl = getByText(/Test name/i);
    expect(checkEl).toBeInTheDocument();
});

test('renders language', () => {
    const getByText = render(<UserRepo repoData={RepoData} />).getByText;
    const checkEl = getByText(/Kobol/i);
    expect(checkEl).toBeInTheDocument();
});

test('renders stars', () => {
    const getByText = render(<UserRepo repoData={RepoData} />).getByText;
    const checkEl = getByText(/555/i);
    expect(checkEl).toBeInTheDocument();
});