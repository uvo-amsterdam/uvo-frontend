export interface Page {
    title: string;
    link: string;
    subtitle: string;
    subPages?: Page[];
}

export type Pages = Page[];
