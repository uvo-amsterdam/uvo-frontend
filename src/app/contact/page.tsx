import '@styles/globals.scss';
import { BOARD } from '@constants/board';
import { FORMS } from '@constants/forms';
import { GENERAL_CONTACT } from '@constants/general-contact';
import { LOCATION } from '@constants/location';
import { Link, Strong, Text } from '@radix-ui/themes';

import css from './page.module.scss';

export default function Contact() {
    return (
        <div className={css.root}>
            <Text>
                Are you a student, do you love playing volleyball, but are you
                still in search of people to play with? Join UvO!
                <br />
                At the end of August / beginning of September there will be
                try-out training sessions again. Do you want to join one or
                multiple training sessions with UvO?
                <br />
                You can register now by filling in{' '}
                <Link href={FORMS.SIGN_UP}>this form</Link>.
            </Text>
            <Text>
                <Strong>Location:</Strong>
                <br />
                <address>
                    {Object.values(LOCATION).map(value => (
                        <div key={value}>{value}</div>
                    ))}
                </address>
            </Text>
            <Text>
                <Strong>Board 28:</Strong>
                <br />
                {BOARD.map(member => (
                    <div key={member.email}>
                        {member.role +
                            ': ' +
                            member.firstName +
                            ' ' +
                            member.lastName +
                            ' (' +
                            member.email +
                            (member.altEmail ? ` or ${member.altEmail}` : '') +
                            ')'}
                    </div>
                ))}
            </Text>
            <Text>
                <Strong>Other important contact channels:</Strong>
                <br />
                {GENERAL_CONTACT.map(entry => (
                    <div key={entry.email}>
                        {`${entry.name}: ${entry.email}`}
                    </div>
                ))}
            </Text>
        </div>
    );
}
