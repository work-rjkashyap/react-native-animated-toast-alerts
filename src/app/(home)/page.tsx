import Link from 'next/link';
import { ArrowRight, Github, Sparkles, Zap, Code2, Palette, Moon, Hand, Check } from 'lucide-react';
import { CopyButton } from '@/components/copy-button';

export default function HomePage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative overflow-hidden border-b border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <div className="mb-8 inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300">
                            <Sparkles className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                            Modern Toast Notifications for React Native
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                            Beautiful toast notifications
                            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                for React Native
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            A modern, highly customizable animated toast notification library featuring stacking animations,
                            gesture support, and comprehensive TypeScript compatibility.
                        </p>

                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/docs"
                                className="group inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                            >
                                Get started
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <a
                                href="https://github.com/work-rjkashyap/react-native-animated-toast-alerts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
                            >
                                <Github className="mr-2 h-4 w-4" />
                                GitHub
                            </a>
                        </div>

                        {/* Install Command */}
                        <div className="mt-10">
                            <div className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <div className="flex items-center justify-between">
                                    <code className="text-sm text-gray-900 dark:text-gray-100">
                                        npm install react-native-animated-toast-alerts
                                    </code>
                                    <CopyButton text="npm install react-native-animated-toast-alerts" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                            Everything you need
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Built for modern React Native apps
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            A complete toast notification solution with all the features you need to provide excellent user feedback.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-7xl sm:mt-20 lg:mt-24">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
                            {/* Feature 1 */}
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 dark:bg-blue-500">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    Animated Stacking
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    Beautiful Sonner-style entrance and exit animations with proper stacking for multiple toasts.
                                </dd>
                            </div>

                            {/* Feature 2 */}
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 dark:bg-purple-500">
                                        <Hand className="h-6 w-6 text-white" />
                                    </div>
                                    Gesture Support
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    Intuitive swipe-to-dismiss with natural physics-based animations for a native feel.
                                </dd>
                            </div>

                            {/* Feature 3 */}
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
                                        <Moon className="h-6 w-6 text-white" />
                                    </div>
                                    Dark Mode
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    Seamless dark mode support with customizable themes that adapt to your app.
                                </dd>
                            </div>

                            {/* Feature 4 */}
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-pink-600 dark:bg-pink-500">
                                        <Palette className="h-6 w-6 text-white" />
                                    </div>
                                    Highly Customizable
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    Extensive customization options for colors, icons, positions, durations, and animations.
                                </dd>
                            </div>

                            {/* Feature 5 */}
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 dark:bg-orange-500">
                                        <Code2 className="h-6 w-6 text-white" />
                                    </div>
                                    TypeScript First
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    Comprehensive type definitions for a better development experience with full autocomplete.
                                </dd>
                            </div>

                            {/* Feature 6 */}
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-green-600 dark:bg-green-500">
                                        <Check className="h-6 w-6 text-white" />
                                    </div>
                                    Production Ready
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    Battle-tested in production apps with performance optimizations and comprehensive testing.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </section>

            {/* Code Example Section */}
            <section className="border-t border-gray-200 bg-gray-50 py-24 dark:border-gray-800 dark:bg-gray-900/50 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400">
                            Quick to implement
                        </h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Get started in minutes
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Simple API that&apos;s easy to learn and powerful enough for any use case.
                        </p>
                    </div>

                    <div className="mx-auto mt-16 max-w-3xl">
                        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950">
                            <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 dark:border-gray-800 dark:bg-gray-900">
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1.5">
                                        <div className="h-3 w-3 rounded-full bg-red-500" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500" />
                                        <div className="h-3 w-3 rounded-full bg-green-500" />
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                                        App.tsx
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <pre className="overflow-x-auto text-sm leading-6">
                                    <code className="text-gray-900 dark:text-gray-100">{`import { ToastProvider, useToast } from 'react-native-animated-toast-alerts';

function App() {
  return (
    <ToastProvider>
      <YourApp />
{{ ... }}
    });
  };

  return <Button title="Show Toast" onPress={handlePress} />;
}`}</code>
                                </pre>
                            </div>
                        </div>

                        <div className="mt-8 text-center">
                            <Link
                                href="/docs/quick-start"
                                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                                View full documentation
                                <ArrowRight className="ml-1 h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative isolate overflow-hidden border-t border-gray-200 dark:border-gray-800">
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-gray-950" />
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Ready to get started?
                        </h2>
                        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Install the package and start building beautiful toast notifications for your React Native app today.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link
                                href="/docs/getting-started"
                                className="rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                            >
                                Get started
                            </Link>
                            <a
                                href="https://github.com/work-rjkashyap/react-native-animated-toast-alerts"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white"
                            >
                                View on GitHub <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
