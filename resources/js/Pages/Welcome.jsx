import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Checkbox } from "@/Components/ui/checkbox";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const [email, setEmail] = useState('');

    return (
        <>
            <Head title="Faelist - Modern Todo App" />
            <div className="bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen">
                <div className="relative flex min-h-screen flex-col">
                    {/* Header/Navigation */}
                    <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/50 sticky top-0 z-40">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <span className="text-2xl font-bold text-white">Faelist</span>
                                        <Badge variant="secondary" className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-500">Beta</Badge>
                                    </div>
                                </div>
                                <nav className="flex items-center space-x-4">
                                    {auth.user ? (
                                        <Button asChild variant="default" className="bg-indigo-600 hover:bg-indigo-500">
                                            <Link href={route('dashboard')}>Dashboard</Link>
                                        </Button>
                                    ) : (
                                        <>
                                            <Button asChild variant="ghost" className="text-white hover:text-white/80">
                                                <Link href={route('login')}>Log in</Link>
                                            </Button>
                                            <Button asChild variant="default" className="bg-indigo-600 hover:bg-indigo-500">
                                                <Link href={route('register')}>Get Started</Link>
                                            </Button>
                                        </>
                                    )}
                                </nav>
                            </div>
                        </div>
                    </header>

                    {/* Hero Section */}
                    <section className="py-20 sm:py-28">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                                        Organize your life with <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Faelist</span>
                                    </h1>
                                    <p className="mt-6 text-xl text-slate-300">
                                        The modern todo app that helps you stay organized, focused, and productive.
                                    </p>
                                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                                        <div className="flex-1">
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                className="bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        <Button asChild className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500">
                                            <Link href={route('register')}>Get Started Free</Link>
                                        </Button>
                                    </div>
                                    <p className="mt-3 text-sm text-slate-400">
                                        No credit card required. Free plan available.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-xl opacity-50"></div>
                                    <Card className="relative bg-slate-800 border-slate-700/50 shadow-2xl overflow-hidden">
                                        <CardHeader className="p-4 border-b border-slate-700/50 bg-slate-800/90 backdrop-blur-sm">
                                            <div className="flex items-center">
                                                <div className="flex space-x-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                                </div>
                                                <CardTitle className="ml-4 text-sm font-medium text-slate-300">My Tasks</CardTitle>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            {/* Sample Todo List */}
                                            <div className="space-y-4">
                                                <div className="flex items-center">
                                                    <Checkbox id="task1" className="border-indigo-500 data-[state=checked]:bg-indigo-500" checked />
                                                    <label htmlFor="task1" className="ml-3 text-slate-300 line-through">Complete project proposal</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox id="task2" className="border-indigo-500 data-[state=checked]:bg-indigo-500" />
                                                    <label htmlFor="task2" className="ml-3 text-white">Design new landing page</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox id="task3" className="border-indigo-500 data-[state=checked]:bg-indigo-500" />
                                                    <label htmlFor="task3" className="ml-3 text-white">Schedule team meeting</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <Checkbox id="task4" className="border-indigo-500 data-[state=checked]:bg-indigo-500" />
                                                    <label htmlFor="task4" className="ml-3 text-white">Research new technologies</label>
                                                </div>
                                            </div>
                                            <div className="mt-6">
                                                <div className="relative">
                                                    <Input 
                                                        type="text" 
                                                        placeholder="Add a new task..." 
                                                        className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                                                    />
                                                    <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 bg-indigo-600">
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="py-16 bg-slate-800/50">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl font-bold text-white">Why choose Faelist?</h2>
                                <p className="mt-4 text-xl text-slate-300">Simple yet powerful features to boost your productivity</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <Card className="bg-slate-800 border-slate-700/50 shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
                                            <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <CardTitle className="text-xl font-semibold text-white mb-3">Simple & Intuitive</CardTitle>
                                        <p className="text-slate-300">Clean interface designed for focus and productivity. No distractions, just tasks.</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-800 border-slate-700/50 shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
                                            <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <CardTitle className="text-xl font-semibold text-white mb-3">Lightning Fast</CardTitle>
                                        <p className="text-slate-300">Optimized for speed and performance. Your tasks sync instantly across all devices.</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-slate-800 border-slate-700/50 shadow-lg">
                                    <CardContent className="p-8">
                                        <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center mb-6">
                                            <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <CardTitle className="text-xl font-semibold text-white mb-3">Secure & Private</CardTitle>
                                        <p className="text-slate-300">Your data is encrypted and secure. We respect your privacy and never share your information.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 border-0 shadow-xl">
                                <CardContent className="p-10 md:p-16">
                                    <div className="max-w-3xl mx-auto text-center">
                                        <h2 className="text-3xl font-bold text-white mb-6">Ready to get organized?</h2>
                                        <p className="text-xl text-white/80 mb-8">Join thousands of users who have transformed their productivity with Faelist.</p>
                                        <Button asChild size="lg" variant="secondary" className="px-8 py-6 text-indigo-600 font-medium hover:bg-white/90">
                                            <Link href={route('register')}>Start for Free</Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="py-12 border-t border-slate-800">
                        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex flex-col md:flex-row justify-between items-center">
                                <div className="mb-6 md:mb-0">
                                    <span className="text-2xl font-bold text-white">Faelist</span>
                                    <p className="mt-2 text-sm text-slate-400">
                                        &copy; {new Date().getFullYear()} Faelist. All rights reserved.
                                    </p>
                                </div>
                                <div className="flex space-x-6">
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                        Terms
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                        Privacy
                                    </a>
                                    <a href="#" className="text-slate-400 hover:text-white transition-colors">
                                        Contact
                                    </a>
                                </div>
                            </div>
                            <div className="mt-8 text-center text-xs text-slate-500">
                                Powered by Laravel v{laravelVersion} (PHP v{phpVersion})
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
