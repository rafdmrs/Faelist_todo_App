import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle, 
    AlertDialogTrigger 
} from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { TrashIcon } from "lucide-react";

export default function DeleteTodoModal({ todo }) {
    // State to control the open/close state of the dialog
    const [open, setOpen] = useState(false);
    
    // Initialize the form with Inertia's useForm hook
    const { delete: destroy, processing } = useForm();
    
    // Handle delete confirmation
    const handleDelete = () => {
        // Submit the delete request to the server
        destroy(route("todos.destroy", todo.id), {
            onSuccess: () => {
                // Close the dialog on success
                setOpen(false);
            },
        });
    };
    
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            {/* Dialog trigger button */}
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <TrashIcon className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            
            {/* Dialog content */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the todo
                        "{todo.title}" and remove it from your list.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={processing}
                        className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                    >
                        {processing ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}