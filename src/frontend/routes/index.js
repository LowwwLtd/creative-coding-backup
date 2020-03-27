import React from 'react';
// import { HomePage } from 'app/pages/home';
// import { PostPage } from 'app/pages/post';
import { SoonPage } from 'app/pages/soon';

export const routes = [
    {
        path: '/',
        exact: true,
        child: <SoonPage />,
    },
    // {
    //     path: '/post/:postId',
    //     child: <PostPage />,
    // },
];
