import { Heading } from '@radix-ui/themes';

import css from './page.module.scss';

export default function ArticlesOfAssociation() {
    return (
        <div className={css.root}>
            <Heading>Articles of association</Heading>
            <iframe
                title="AoA"
                src="/statuten.pdf"
                className={css.pdfEmbed}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}
