import React from 'react';
import { render } from '@testing-library/react';
import { UserDataOutput } from './UserDataOutput';

const UserData = {
    id: 123,
    login: 'Test Username',
    avatar_url: 'test_url',
    html_url: 'html_url',
    followers: 55,
    repos_url: 'test_url',
    created_at: '2019-12-08T00:59:46.109Z',
    updated_at: '2019-12-08T00:59:46.109Z',
    name: 'Test user1',
    email: 'test@test.test'
};

test('renders login', () => {
    const getByText = render(<UserDataOutput userData={UserData} />).getByText;
    const checkEl = getByText(/Test Username/i);
    expect(checkEl).toBeInTheDocument();
});

test('renders name', () => {
    const getByText = render(<UserDataOutput userData={UserData} />).getByText;
    const checkEl = getByText(/Test user1/i);
    expect(checkEl).toBeInTheDocument();
});

test('renders Email', () => {
    const getByText = render(<UserDataOutput userData={UserData} />).getByText;
    const checkEl = getByText(/Email/i);
    expect(checkEl).toBeInTheDocument();
});