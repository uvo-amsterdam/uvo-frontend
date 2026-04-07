'use client';

import { useEffect, useRef, useState } from 'react';
import { IconCheck, IconMail } from '@tabler/icons-react';

import css from './copyable-email.module.scss';

interface CopyableEmailProps {
    email: string;
    className?: string;
}

export function CopyableEmail({ email, className }: CopyableEmailProps) {
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleCopy = async (e: React.MouseEvent) => {
        e.preventDefault();

        // Clear any existing timeout to prevent race conditions
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
                timeoutRef.current = null;
            }, 2000);
        } catch {
            // Fallback for environments where clipboard API is unavailable
            const el = document.createElement('textarea');
            el.value = email;
            el.style.position = 'fixed';
            el.style.opacity = '0';
            document.body.appendChild(el);
            el.select();

            let success = false;
            try {
                success = document.execCommand('copy');
            } catch {
                success = false;
            }

            document.body.removeChild(el);

            if (success) {
                setCopied(true);
                timeoutRef.current = setTimeout(() => {
                    setCopied(false);
                    timeoutRef.current = null;
                }, 2000);
            }
        }
    };

    // Clean up timeout on unmount to prevent memory leaks
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

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

            {copied && (
                <output
                    className={css.toast}
                    aria-live="polite"
                    aria-atomic="true"
                >
                    Copied!
                </output>
            )}
        </span>
    );
}
