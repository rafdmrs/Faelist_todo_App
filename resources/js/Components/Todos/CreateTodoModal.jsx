import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
    DialogTrigger 
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "@/Components/ui/select";
import { Calendar } from "@/Components/ui/calendar";
import { 
    Popover, 
    PopoverContent, 
    PopoverTrigger 
} from "@/Components/ui/popover";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function CreateTodoModal() {
    // State to control the open/close state of the dialog
    const [open, setOpen] = useState(false);
    
    // Initialize the form with Inertia's useForm hook
    const { data, setData, post, processing, errors, reset } = useForm({
        title: "",
        description: "",
        priority: "medium",
        start_date: "",
        end_date: "",
    });
    
    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Submit the form data to the server
        post(route("todos.store"), {
            onSuccess: () => {
                // Close the dialog and reset the form on success
                setOpen(false);
                reset();
            },
        });
    };
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {/* Dialog trigger button */}
            <DialogTrigger asChild>
                <Button className="gap-2">
                    <PlusIcon className="h-4 w-4" />
                    New Todo
                </Button>
            </DialogTrigger>
            
            {/* Dialog content */}
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Create New Todo</DialogTitle>
                    <DialogDescription>
                        Add a new task to your todo list. Fill out the details below.
                    </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Title field */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="Enter todo title"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">{errors.title}</p>
                        )}
                    </div>
                    
                    {/* Description field */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData("description", e.target.value)}
                            placeholder="Enter todo description"
                            rows={3}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>
                    
                    {/* Priority field */}
                    <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select
                            value={data.priority}
                            onValueChange={(value) => setData("priority", value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                        </Select>
                        {errors.priority && (
                            <p className="text-sm text-red-500">{errors.priority}</p>
                        )}
                    </div>
                    
                    {/* Date fields */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Start date field */}
                        <div className="space-y-2">
                            <Label htmlFor="start_date">Start Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !data.start_date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.start_date ? (
                                            format(new Date(data.start_date), "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.start_date ? new Date(data.start_date) : undefined}
                                        onSelect={(date) => 
                                            setData("start_date", date ? date.toISOString() : "")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.start_date && (
                                <p className="text-sm text-red-500">{errors.start_date}</p>
                            )}
                        </div>
                        
                        {/* End date field */}
                        <div className="space-y-2">
                            <Label htmlFor="end_date">End Date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !data.end_date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {data.end_date ? (
                                            format(new Date(data.end_date), "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={data.end_date ? new Date(data.end_date) : undefined}
                                        onSelect={(date) => 
                                            setData("end_date", date ? date.toISOString() : "")
                                        }
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {errors.end_date && (
                                <p className="text-sm text-red-500">{errors.end_date}</p>
                            )}
                        </div>
                    </div>
                    
                    <DialogFooter>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Creating..." : "Create Todo"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}