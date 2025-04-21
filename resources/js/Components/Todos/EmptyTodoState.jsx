import { ClipboardList, Plus } from "lucide-react";
import { Button } from "@/Components/ui/button";
import CreateTodoModal from "@/Components/Todos/CreateTodoModal";

export default function EmptyTodoState({ filter, priorityFilter }) {
    // Customize message based on active filters
    const getMessage = () => {
        if (filter !== "all" || priorityFilter !== "all") {
            return "No matching todos found with the current filters.";
        }
        return "You don't have any tasks yet. Create your first todo to get started!";
    };

    return (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed bg-muted/30 p-10 text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
                <ClipboardList className="h-10 w-10 text-primary" />
            </div>
            
            <h3 className="mb-2 text-xl font-medium">Your task list is empty</h3>
            <p className="mb-6 max-w-md text-muted-foreground">
                {getMessage()}
            </p>
            
            {(filter === "all" && priorityFilter === "all") && (
                <CreateTodoModal />
            )}
            
            {(filter !== "all" || priorityFilter !== "all") && (
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        Clear Filters
                    </Button>
                    <CreateTodoModal />
                </div>
            )}
        </div>
    );
}