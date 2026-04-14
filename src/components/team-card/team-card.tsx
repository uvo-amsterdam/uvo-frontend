import type { FC } from 'react';
import { UNKNOWN_TEAM_IMAGE_PATH } from '@constants/images';
import { Heading } from '@radix-ui/themes';
import { IconArrowRight } from '@tabler/icons-react';
import Image from 'next/image';
import NextLink from 'next/link';

import css from './team-card.module.scss';

interface TeamCardProps {
    teamName: string;
    slug: string;
    imageUrl?: string;
}

export const TeamCard: FC<TeamCardProps> = ({
    teamName,
    slug,
    imageUrl = UNKNOWN_TEAM_IMAGE_PATH,
}) => {
    return (
        <NextLink href={`/teams/${slug}`} className={css.cardWrapper}>
            <div className={css.imageWrapper}>
                <Image
                    src={imageUrl}
                    alt={`${teamName} team photo`}
                    fill
                    sizes="(max-width: 48em) 100vw, (max-width: 64em) 50vw, 33vw"
                    className={css.image}
                    placeholder="blur"
                    blurDataURL="data:image/webp;base64,UklGRkIAAABXRUJQVlA4IDYAAADQAQCdASoIAAUAAUAmJaQAA3AA/v3T8AAf3D/f4R9d7IeAAAA="
                />
                <div className={css.scrim} />
            </div>

            <div className={css.content}>
                <Heading as="h3" className={css.teamName}>
                    {teamName}
                </Heading>
                <div className={css.actionPrompt}>
                    <span>View Roster</span>
                    <IconArrowRight
                        size={20}
                        className={css.icon}
                        aria-hidden="true"
                        focusable="false"
                    />
                </div>
            </div>
        </NextLink>
    );
};
