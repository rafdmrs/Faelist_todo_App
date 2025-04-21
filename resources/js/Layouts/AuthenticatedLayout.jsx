import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { 
    LayoutDashboard, 
    Menu, 
    X,
    User, 
    LogOut, 
    ChevronDown,
} from 'lucide-react';

import { Button } from '@/Components/ui/button';
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from '@/Components/ui/dropdown-menu';
import { 
    Sheet, 
    SheetContent, 
} from '@/Components/ui/sheet';
import { Separator } from '@/Components/ui/separator';
import { ScrollArea } from '@/Components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [isMobile, setIsMobile] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    // Check if the screen is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);

    const NavItem = ({ href, icon: Icon, active, children }) => {
        return (
            <Link
                href={href}
                className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    active 
                        ? "bg-primary text-primary-foreground" 
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                )}
            >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{children}</span>
            </Link>
        );
    };

    const SidebarContent = () => (
        <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                    <ApplicationLogo className="h-6 w-6" />
                    <span>Faelist Todo</span>
                </Link>
            </div>
            <ScrollArea className="flex-1 px-2 py-4">
                <div className="space-y-1">
                    <NavItem 
                        href={route('dashboard')} 
                        icon={LayoutDashboard} 
                        active={route().current('dashboard')}
                    >
                        Dashboard
                    </NavItem>
                    {/* Add more navigation items here */}
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-1">
                    <p className="px-3 text-xs font-medium text-muted-foreground">Settings</p>
                    <NavItem 
                        href={route('profile.edit')} 
                        icon={User} 
                        active={route().current('profile.edit')}
                    >
                        Profile
                    </NavItem>
                    {/* Add more settings items here */}
                </div>
            </ScrollArea>
            <div className="border-t p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <ChevronDown className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link href={route('profile.edit')}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild>
                                <Link href={route('logout')} method="post" as="button" className="w-full">
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log Out</span>
                                </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-64 border-r shrink-0 h-screen sticky top-0 bg-white">
                <SidebarContent />
            </aside>
            
            {/* Mobile Sidebar */}
            <div className="lg:hidden">
                <Button 
                    variant="outline" 
                    size="icon" 
                    className="fixed left-4 top-3 z-40"
                    onClick={() => setIsOpen(true)}
                >
                    <Menu className="h-5 w-5" />
                </Button>
                
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetContent side="left" className="p-0 w-64">
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
            
            {/* Main Content */}
            <div className="flex-1">
                {/* Mobile Header */}
                <header className="lg:hidden h-14 border-b bg-white flex items-center justify-center relative">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <ApplicationLogo className="h-6 w-6" />
                        <span>Faelist Todo</span>
                    </Link>
                </header>
                
                {/* Page Header */}
                {header && (
                    <header className="bg-white shadow">
                        <div className="mx-auto p-2 px-5">
                            {header}
                        </div>
                    </header>
                )}
                
                {/* Page Content */}
                <main className="mx-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
