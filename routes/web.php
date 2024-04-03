<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkoutController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::redirect('/', '/dashboard');
Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('welcome');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth', 'verified')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
    Route::resource('workouts', WorkoutController::class);
    Route::resource('exercises', ExerciseController::class);
    Route::resource('users', UserController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
