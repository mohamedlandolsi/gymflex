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
        Schema::create('exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->longText('description')->nullable();
            $table->string('image_path')->nullable();
            $table->string('video_path')->nullable();
            $table->unsignedInteger('sets');
            $table->string('rep_range');
            $table->unsignedInteger('rest_period')->nullable();
            $table->string('muscle_group');
            $table->string('equipment');
            $table->foreignId('created_by')->constrained('users');
            $table->foreignId('updated_by')->constrained('users');
            $table->foreignId('workout_id')->constrained('workouts');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exercises');
    }
};
