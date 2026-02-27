'use client';
import { Heading } from '@radix-ui/themes';
import dynamic from 'next/dynamic';

import css from './page.module.scss';

const PdfViewer = dynamic(
    () => import('../../components/pdf-viewer/pdf-viewer'),
    { ssr: false },
);

export default function ArticlesOfAssociation() {
    return (
        <div className={css.root}>
            <Heading>Articles of association</Heading>
            <PdfViewer file="/statuten.pdf" />
        </div>
    );
}
