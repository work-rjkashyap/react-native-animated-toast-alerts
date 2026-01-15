import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: (
                <div className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="React Native Animated Toast Logo"
                        width={100}
                        height={58}
                        className="rounded-sm"
                    />
                </div>
            ),
            url: '/',
        },
        links: [
            {
                text: 'Documentation',
                url: '/docs',
                active: 'nested-url',
            },
            {
                text: 'GitHub',
                url: 'https://github.com/work-rjkashyap/react-native-animated-toast-alerts',
                external: true,
            },
        ],
    };
}
