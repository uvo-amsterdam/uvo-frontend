import { Heading } from '@radix-ui/themes';

import css from './page.module.scss';

export default function ArticlesOfAssociation() {
    return (
        <div className={css.root}>
            <Heading>Articles of association</Heading>
            <iframe
                title="AoA"
                src="/statuten.pdf"
                style={{ border: 0, width: '100%', height: '100vh' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
}
