import '@styles/globals.scss';
import { Text } from '@radix-ui/themes';

import css from './page.module.scss';

export default function Contact() {
    return (
        <div className={css.root}>
            <Text>This is the contact page</Text>
        </div>
    );
}
