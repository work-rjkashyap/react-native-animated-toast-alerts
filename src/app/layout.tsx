import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        default: 'React Native Animated Toast Alerts',
        template: '%s | React Native Animated Toast',
    },
    description: 'A modern, highly customizable animated toast notification library for React Native featuring stacking animations, gesture support, and comprehensive TypeScript compatibility.',
    keywords: ['react-native', 'toast', 'notifications', 'animation', 'typescript', 'react'],
    authors: [{ name: 'Rajeshwar Kashyap', url: 'https://github.com/work-rjkashyap' }],
    openGraph: {
        title: 'React Native Animated Toast Alerts',
        description: 'A modern, highly customizable animated toast notification library for React Native',
        url: 'https://work-rjkashyap.github.io/react-native-animated-toast-alerts',
        siteName: 'React Native Animated Toast Alerts',
        type: 'website',
    },
};

const inter = Inter({
    subsets: ['latin'],
});

export default function Layout({ children }: LayoutProps<'/'>) {
    return (
        <html lang="en" className={inter.className} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <RootProvider>{children}</RootProvider>
            </body>
        </html>
    );
}
