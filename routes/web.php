<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\Guest\GuestExerciseController;
use App\Http\Controllers\Guest\GuestWorkoutController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkoutController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::redirect('/', '/dashboard');
Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::resource('workouts', GuestWorkoutController::class);
Route::resource('exercises', GuestExerciseController::class);

Route::get('dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('admin/workouts', [WorkoutController::class, 'index'])->name('workouts-admin.index');
    Route::get('admin/workouts/create', [WorkoutController::class, 'create'])->name('workouts-admin.create');
    Route::post('admin/workouts', [WorkoutController::class, 'store'])->name('workouts-admin.store');
    Route::get('admin/workouts/{workout}', [WorkoutController::class, 'show'])->name('workouts-admin.show');
    Route::get('admin/workouts/{workout}/edit', [WorkoutController::class, 'edit'])->name('workouts-admin.edit');
    Route::put('admin/workouts/{workout}', [WorkoutController::class, 'update'])->name('workouts-admin.update');
    Route::delete('admin/workouts/{workout}', [WorkoutController::class, 'destroy'])->name('workouts-admin.destroy');

    Route::get('admin/exercises', [ExerciseController::class, 'index'])->name('exercises-admin.index');
    Route::get('admin/exercises/create', [ExerciseController::class, 'create'])->name('exercises-admin.create');
    Route::post('admin/exercises', [ExerciseController::class, 'store'])->name('exercises-admin.store');
    Route::get('admin/exercises/{exercise}', [ExerciseController::class, 'show'])->name('exercises-admin.show');
    Route::get('admin/exercises/{exercise}/edit', [ExerciseController::class, 'edit'])->name('exercises-admin.edit');
    Route::put('admin/exercises/{exercise}', [ExerciseController::class, 'update'])->name('exercises-admin.update');
    Route::delete('admin/exercises/{exercise}', [ExerciseController::class, 'destroy'])->name('exercises-admin.destroy');

    Route::resource('admin/users', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
