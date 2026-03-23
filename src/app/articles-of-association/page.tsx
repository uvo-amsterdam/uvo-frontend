import { Hero } from '@components/hero/hero';

import css from './page.module.scss';

export default function ArticlesOfAssociation() {
    return (
        <div className={css.root}>
            <Hero title={'Articles of association'} />
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
