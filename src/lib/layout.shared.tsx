import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: 'React Native Animated Toast',
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
