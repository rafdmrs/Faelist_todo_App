import { useState, useEffect } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CreateTodoModal from "@/Components/Todos/CreateTodoModal";
import EditTodoModal from "@/Components/Todos/EditTodoModal";
import DeleteTodoModal from "@/Components/Todos/DeleteTodoModal";
import EmptyTodoState from "@/Components/Todos/EmptyTodoState";
import StatsCard from "@/Components/Dashboard/StatsCard";
import { format } from "date-fns";
import { 
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
import { Badge } from "@/Components/ui/badge";
import { Input } from "@/Components/ui/input";
import { 
    CalendarIcon, 
    ClockIcon, 
    FilterIcon,
    ArrowUpDown,
    Search,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
} from "@/Components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import debounce from "lodash/debounce";

export default function Dashboard({ auth, todos, stats, filters }) {
    // State for filtering todos
    const [filter, setFilter] = useState("all"); // all, active, completed
    const [priorityFilter, setPriorityFilter] = useState("all"); // all, low, medium, high
    const [sortField, setSortField] = useState("created_at"); // Field to sort by
    const [sortDirection, setSortDirection] = useState("desc"); // asc or desc
    const [searchQuery, setSearchQuery] = useState(filters.search || "");
    
    // Form for toggling todo completion
    const { patch, processing, get } = useForm();
    
    // Handle toggle completion
    const toggleComplete = (todo) => {
        patch(route("todos.toggle", todo.id));
    };
    
    // Handle sort change
    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };
    
    // Handle search input change with debounce
    const debouncedSearch = debounce((value) => {
        get(route('dashboard', { search: value }));
    }, 500);
    
    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };
    
    // Clean up debounce on unmount
    useEffect(() => {
        return () => {
            debouncedSearch.cancel();
        };
    }, []);
    
    // Get priority badge color
    const getPriorityColor = (priority) => {
        switch (priority) {
            case "low":
                return "bg-blue-100 text-blue-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "high":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    
    // Filter todos based on current filters (for client-side filtering)
    const filteredTodos = todos.data.filter((todo) => {
        // Filter by completion status
        if (filter === "active" && todo.completed) return false;
        if (filter === "completed" && !todo.completed) return false;
        
        // Filter by priority
        if (priorityFilter !== "all" && todo.priority !== priorityFilter) return false;
        
        return true;
    });
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Hello Welcome to Faeliest Todo List!
                    </h2>
                    <CreateTodoModal />
                </div>
            }
        >
            <Head title="Todo List" />
            
            <div className="p-3 sm:p-5">
                {/* Stats Cards */}
                <div className="mb-6 sm:mb-8">
                    <StatsCard stats={stats} />
                </div>
                
                {/* Search and Filters */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full max-w-full sm:max-w-md">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search todos..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            className="pl-10"
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2">
                        <Button
                            variant={filter === "all" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("all")}
                            className="flex-1 sm:flex-none"
                        >
                            All
                        </Button>
                        <Button
                            variant={filter === "active" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("active")}
                            className="flex-1 sm:flex-none"
                        >
                            Active
                        </Button>
                        <Button
                            variant={filter === "completed" ? "default" : "outline"}
                            size="sm"
                            onClick={() => setFilter("completed")}
                            className="flex-1 sm:flex-none"
                        >
                            Completed
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                                    <FilterIcon className="h-4 w-4" />
                                    Priority
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setPriorityFilter("all")}>
                                    All Priorities
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setPriorityFilter("low")}>
                                    Low
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setPriorityFilter("medium")}>
                                    Medium
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setPriorityFilter("high")}>
                                    High
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                
                {/* Todo list */}
                {filteredTodos.length === 0 ? (
                    <EmptyTodoState filter={filter} priorityFilter={priorityFilter} />
                ) : (
                    <>
                        <div className="rounded-md border overflow-x-auto shadow-sm">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">Status</TableHead>
                                        <TableHead>
                                            <Button 
                                                variant="ghost" 
                                                onClick={() => handleSort("title")}
                                                className="flex items-center gap-1 font-medium text-xs sm:text-sm"
                                            >
                                                Task
                                                {sortField === "title" && (
                                                    <ArrowUpDown className={cn(
                                                        "h-3 w-3 sm:h-4 sm:w-4 transition-transform",
                                                        sortDirection === "desc" && "rotate-180"
                                                    )} />
                                                )}
                                            </Button>
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            <Button 
                                                variant="ghost" 
                                                onClick={() => handleSort("priority")}
                                                className="flex items-center gap-1 font-medium"
                                            >
                                                Priority
                                                {sortField === "priority" && (
                                                    <ArrowUpDown className={cn(
                                                        "h-4 w-4 transition-transform",
                                                        sortDirection === "desc" && "rotate-180"
                                                    )} />
                                                )}
                                            </Button>
                                        </TableHead>
                                        <TableHead className="hidden sm:table-cell">
                                            <Button 
                                                variant="ghost" 
                                                onClick={() => handleSort("start_date")}
                                                className="flex items-center gap-1 font-medium"
                                            >
                                                Timeline
                                                {sortField === "start_date" && (
                                                    <ArrowUpDown className={cn(
                                                        "h-4 w-4 transition-transform",
                                                        sortDirection === "desc" && "rotate-180"
                                                    )} />
                                                )}
                                            </Button>
                                        </TableHead>
                                        <TableHead className="w-[80px] sm:w-[120px] text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredTodos.map((todo) => (
                                        <TableRow key={todo.id} className={cn(
                                            todo.completed && "bg-muted/50"
                                        )}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={todo.completed}
                                                    onCheckedChange={() => toggleComplete(todo)}
                                                    disabled={processing}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className={cn(
                                                        "font-medium text-sm sm:text-base",
                                                        todo.completed && "line-through text-muted-foreground"
                                                    )}>
                                                        {todo.title}
                                                    </span>
                                                    <div className="flex items-center gap-1 mt-1 sm:hidden">
                                                        <Badge className={cn("text-xs", getPriorityColor(todo.priority))}>
                                                            {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                                        </Badge>
                                                    </div>
                                                    {todo.description && (
                                                        <span className={cn(
                                                            "mt-1 text-xs sm:text-sm text-muted-foreground line-clamp-1",
                                                            todo.completed && "text-muted-foreground/70"
                                                        )}>
                                                            {todo.description}
                                                        </span>
                                                    )}
                                                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground sm:hidden">
                                                        <CalendarIcon className="h-3 w-3" />
                                                        <span>
                                                            {format(new Date(todo.start_date), "MMM d")} - 
                                                            {format(new Date(todo.end_date), "MMM d")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <Badge className={getPriorityColor(todo.priority)}>
                                                    {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="hidden sm:table-cell">
                                                <div className="flex flex-col gap-1 text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground" />
                                                        <span>
                                                            {format(new Date(todo.start_date), "MMM d")} - 
                                                            {format(new Date(todo.end_date), "MMM d, yyyy")}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                        <ClockIcon className="h-3 w-3" />
                                                        <span>
                                                            Created {format(new Date(todo.created_at), "MMM d")}
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-1 sm:gap-2">
                                                    <EditTodoModal todo={todo} />
                                                    <DeleteTodoModal todo={todo} />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        
                        {/* Pagination */}
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
                                Showing {todos.from} to {todos.to} of {todos.total} todos
                            </div>
                            <div className="flex items-center justify-center sm:justify-end gap-1 sm:gap-2">
                                {todos.links.map((link, i) => {
                                    if (link.url === null) {
                                        return (
                                            <Button 
                                                key={i} 
                                                variant="outline" 
                                                size="sm" 
                                                disabled
                                                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                            >
                                                {link.label === "&laquo; Previous" ? (
                                                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                                ) : link.label === "Next &raquo;" ? (
                                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                                ) : (
                                                    <span className="text-xs sm:text-sm">{link.label}</span>
                                                )}
                                            </Button>
                                        );
                                    }
                                    
                                    return (
                                        <Link key={i} href={link.url}>
                                            <Button 
                                                variant={link.active ? "default" : "outline"} 
                                                size="sm"
                                                className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                                            >
                                                {link.label === "&laquo; Previous" ? (
                                                    <ChevronLeft className="h-3 w-3 sm:h-4 sm:w-4" />
                                                ) : link.label === "Next &raquo;" ? (
                                                    <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
                                                ) : (
                                                    <span className="text-xs sm:text-sm">{link.label}</span>
                                                )}
                                            </Button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
