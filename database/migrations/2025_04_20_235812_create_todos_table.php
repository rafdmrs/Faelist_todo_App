<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todos', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('title'); // Todo title
            $table->text('description')->nullable(); // Todo description (optional)
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium'); // Priority level
            $table->dateTime('start_date'); // Start date and time
            $table->dateTime('end_date'); // End date and time
            $table->boolean('completed')->default(false); // Completion status
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // User relationship
            $table->timestamps(); // Created at and updated at timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todos');
    }
};
