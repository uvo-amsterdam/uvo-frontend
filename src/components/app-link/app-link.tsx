import { type AnchorHTMLAttributes, forwardRef } from 'react';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';

export type AppLinkProps = Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    keyof NextLinkProps
> &
    NextLinkProps;

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
    ({ prefetch = false, ...props }, ref) => {
        return <NextLink ref={ref} prefetch={prefetch} {...props} />;
    },
);

AppLink.displayName = 'AppLink';
