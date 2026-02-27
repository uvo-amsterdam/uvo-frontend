'use client';

import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

export default function PdfViewer({ file }: { file: string }) {
    const [numPages, setNumPages] = useState<number>();

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages);
    }

    return (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (_el, index) => (
                <Page
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                />
            ))}
        </Document>
    );
}
