import type { Pages } from '@interfaces/page';

export const NAVIGATION: Pages = [
    {
        link: '/',
        title: 'Welcome',
        subtitle: 'Welcome to the UvO Amsterdam website!',
    },
    {
        link: '#',
        title: 'Shop',
        subtitle: 'Get your merch and tickets',
        subPages: [
            {
                link: '/merch',
                title: 'Merch',
                subtitle: 'Buy our merchandise',
            },
            {
                link: '/tickets',
                title: 'Tickets',
                subtitle: 'Get your tickets',
            },
        ],
    },
    {
        link: '/sign-up',
        title: 'Sign-up',
        subtitle: 'Join UvO Amsterdam',
    },
    {
        link: '/committees',
        title: 'Committees',
        subtitle: 'Discover our committees',
    },
    {
        link: '/member-info',
        title: 'Member Info',
        subtitle: 'Information for members',
    },
    {
        link: '/teams',
        title: 'Teams',
        subtitle: 'Meet our teams',
    },
    {
        link: '/training',
        title: 'Training',
        subtitle: 'Training schedule and info',
    },
    {
        link: '/competition',
        title: 'Competition',
        subtitle: 'Upcoming match fixtures',
    },
    {
        link: '/contact',
        title: 'Contact',
        subtitle: 'Get in touch with us',
    },
];
