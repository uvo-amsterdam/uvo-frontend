import type { BoardMember } from '@interfaces/board-member';

export const BOARD: BoardMember[] = [
    {
        firstName: '',
        lastName: '',
        role: 'General',
        email: 'bestuur@uvo-amsterdam.nl',
    },
    {
        firstName: 'Michael James',
        lastName: 'Ma',
        role: 'President',
        email: 'voorzitter@uvo-amsterdam.nl',
    },
    {
        firstName: 'Nadia',
        lastName: 'den Dunnen',
        role: 'Secretary',
        email: 'secretaris@uvo-amsterdam.nl',
    },
    {
        firstName: 'Dylan',
        lastName: 'van der kolk',
        role: 'Treasurer',
        email: 'penningmeester@uvo-amsterdam.nl',
    },
    {
        firstName: 'Maartje',
        lastName: 'Zant',
        role: 'Commissioner of Internal Affairs',
        email: 'commissarisintern@uvo-amsterdam.nl',
    },
    {
        firstName: 'Vera',
        lastName: 'Jansen',
        role: 'Commissioner of External Affairs',
        email: 'pr@uvo-amsterdam.nl',
        altEmail: 'wedstrijdsecretaris@uvo-amsterdam.nl',
    },
];
