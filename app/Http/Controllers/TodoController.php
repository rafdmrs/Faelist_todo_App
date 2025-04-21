<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class TodoController extends Controller
{
    /**
     * Display a listing of the todos.
     */
    public function index(Request $request)
    {
        $user = auth()->user();
        $search = $request->input('search');
        
        // Query with search and pagination
        $todosQuery = $user->todos()
            ->when($search, function ($query, $search) {
                return $query->where(function ($query) use ($search) {
                    $query->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->orderBy('created_at', 'desc');
        
        // Paginate the results
        $todos = $todosQuery->paginate(10)->withQueryString();
        
        // Calculate stats for the dashboard
        $stats = $this->calculateStats($user);
        
        return Inertia::render('Dashboard', [
            'todos' => $todos,
            'stats' => $stats,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    private function calculateStats($user)
    {
        // Get current todos
        $allTodos = $user->todos;
        $total = $allTodos->count();
        $completed = $allTodos->where('completed', true)->count();
        $active = $allTodos->where('completed', false)->count();
        $highPriority = $allTodos->where('priority', 'high')->count();
        
        // Get todos from last week for comparison
        $lastWeekStart = now()->subWeek()->startOfWeek();
        $lastWeekEnd = now()->subWeek()->endOfWeek();
        
        $lastWeekTodos = $user->todos()
            ->whereBetween('created_at', [$lastWeekStart, $lastWeekEnd])
            ->get();
        
        $lastWeekTotal = $lastWeekTodos->count();
        $lastWeekCompleted = $lastWeekTodos->where('completed', true)->count();
        $lastWeekActive = $lastWeekTodos->where('completed', false)->count();
        $lastWeekHighPriority = $lastWeekTodos->where('priority', 'high')->count();
        
        // Calculate percentage changes
        $totalChange = $lastWeekTotal > 0 ? round(($total - $lastWeekTotal) / $lastWeekTotal * 100) : 0;
        $completedChange = $lastWeekCompleted > 0 ? round(($completed - $lastWeekCompleted) / $lastWeekCompleted * 100) : 0;
        $activeChange = $lastWeekActive > 0 ? round(($active - $lastWeekActive) / $lastWeekActive * 100) : 0;
        $highPriorityChange = $lastWeekHighPriority > 0 ? round(($highPriority - $lastWeekHighPriority) / $lastWeekHighPriority * 100) : 0;
        
        return [
            'total' => $total,
            'completed' => $completed,
            'active' => $active,
            'highPriority' => $highPriority,
            'totalChange' => $totalChange,
            'completedChange' => $completedChange,
            'activeChange' => $activeChange,
            'highPriorityChange' => $highPriorityChange,
        ];
    }

    /**
     * Store a newly created todo in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => ['required', Rule::in(['low', 'medium', 'high'])],
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);
        
        // Create a new todo with the validated data
        Todo::create([
            ...$validated,
            'user_id' => Auth::id(),
            'completed' => false,
        ]);
        
        // Redirect back with a success message
        return Redirect::back()->with('success', 'Todo created successfully.');
    }

    /**
     * Update the specified todo in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        // Check if the todo belongs to the authenticated user
        if ($todo->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
        
        // Validate the request data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => ['required', Rule::in(['low', 'medium', 'high'])],
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'completed' => 'boolean',
        ]);
        
        // Update the todo with the validated data
        $todo->update($validated);
        
        // Redirect back with a success message
        return Redirect::back()->with('success', 'Todo updated successfully.');
    }

    /**
     * Toggle the completion status of the specified todo.
     */
    public function toggleComplete(Todo $todo)
    {
        // Check if the todo belongs to the authenticated user
        if ($todo->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
        
        // Toggle the completed status
        $todo->update([
            'completed' => !$todo->completed,
        ]);
        
        // Redirect back with a success message
        return Redirect::back()->with('success', 'Todo status updated.');
    }

    /**
     * Remove the specified todo from storage.
     */
    public function destroy(Todo $todo)
    {
        // Check if the todo belongs to the authenticated user
        if ($todo->user_id !== Auth::id()) {
            abort(403, 'Unauthorized action.');
        }
        
        // Delete the todo
        $todo->delete();
        
        // Redirect back with a success message
        return Redirect::back()->with('success', 'Todo deleted successfully.');
    }
}
