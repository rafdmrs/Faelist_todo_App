import { Head, useForm, Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { MailIcon, ArrowLeftIcon } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />
            
            <div className="flex flex-col items-center justify-center w-full">
                <Card className="w-full max-w-md shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl font-bold text-center">Password Recovery</CardTitle>
                        <CardDescription className="text-center">
                            Enter your email and we'll send you a password reset link
                        </CardDescription>
                    </CardHeader>
                    
                    {status && (
                        <div className="mx-6 mb-2 p-3 bg-green-50 border border-green-200 rounded-md text-sm font-medium text-green-600">
                            {status}
                        </div>
                    )}
                    
                    <CardContent className="space-y-4">
                        <form onSubmit={submit}>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <MailIcon className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="pl-10"
                                            placeholder="name@example.com"
                                            autoComplete="email"
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-1" />
                                </div>
                                
                                <div className="pt-2">
                                    <Button type="submit" className="w-full" disabled={processing}>
                                        {processing ? 'Sending Link...' : 'Send Reset Link'}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    
                    <CardFooter className="flex justify-center">
                        <Link 
                            href={route('login')} 
                            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                            <ArrowLeftIcon className="mr-2 h-4 w-4" />
                            Back to login
                        </Link>
                    </CardFooter>
                </Card>
                
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Need assistance? Contact our support team at <span className="text-blue-600">support@faelisttodo.com</span></p>
                </div>
            </div>
        </GuestLayout>
    );
}
