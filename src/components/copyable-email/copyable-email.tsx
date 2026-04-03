'use client';

import { useState } from 'react';
import { IconCheck, IconMail } from '@tabler/icons-react';

import css from './copyable-email.module.scss';

interface CopyableEmailProps {
    email: string;
    className?: string;
}

export function CopyableEmail({ email, className }: CopyableEmailProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback for environments where clipboard API is unavailable
            const el = document.createElement('textarea');
            el.value = email;
            el.style.position = 'fixed';
            el.style.opacity = '0';
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <span className={`${css.root} ${className ?? ''}`}>
            <button
                type="button"
                onClick={handleCopy}
                className={css.button}
                title={`Copy ${email} to clipboard`}
                aria-label={`Copy ${email} to clipboard`}
            >
                <span className={css.emailText}>{email}</span>
                <span className={css.icon} aria-hidden="true">
                    {copied ? (
                        <IconCheck size={14} stroke={2.5} />
                    ) : (
                        <IconMail size={14} stroke={1.5} />
                    )}
                </span>
            </button>

            {copied && <output className={css.toast}>Copied!</output>}
        </span>
    );
}
