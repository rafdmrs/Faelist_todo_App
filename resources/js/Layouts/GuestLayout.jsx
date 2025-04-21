// import ApplicationLogo from '@/Components/ApplicationLogo';
// import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center sm:justify-center sm:pt-0">
            <div className=" w-full overflow-hidden bg-white sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
