import React from 'react';
import { HomePage } from 'app/pages/home';
import { PostPage } from 'app/pages/post';

export const routes = [
    {
        path: '/',
        exact: true,
        child: <HomePage />,
    },
    {
        path: '/post/:postId',
        child: <PostPage />,
    },
];
