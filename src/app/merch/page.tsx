import '@styles/globals.scss';

import { Button, Text } from '@radix-ui/themes';

import css from './page.module.scss';

const merchLink: string = 'https://clubs.deventrade.com/nl/uvo-amsterdam';

export default function MemberInfo() {
    return (
        <div className={css.root}>
            <Text>
                Babe wake up, UvO merch just dropped! 🚨
                <br />
                <br />- New shirts, new shorts, new track jackets and bottoms,
                new jackets and softshell, new sports bags ALL custom with the
                UvO logo (Except womens shorts and socks)! 🤩
                <br />
                <br />
                UvO also receives a 10% cashback on every purchase, so your
                purchase will even help out the association!
                <br />
                <br />
                Lastly, take into account:
                <br />- Since the items are custom printed, they can’t be
                returned!
                <br />- The printed items shouldn’t be washed with softener and
                shouldn’t go in the dryer!
                <br />- The sizes fall a bit small, so I’d recommend taking a
                size larger than normal!
                <br />
                <br />
                The website is already live and ready for your orders! What are
                you waiting for? Go and get your UvO-wear now! 🤩
            </Text>
            <Button asChild>
                <a href={merchLink} target="_blank" rel="noopener noreferrer">
                    Go to UvO Merch Shop
                </a>
            </Button>
        </div>
    );
}
