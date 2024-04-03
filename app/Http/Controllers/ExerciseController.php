<?php

namespace App\Http\Controllers;

use App\Models\Exercise;
use App\Http\Requests\StoreExerciseRequest;
use App\Http\Requests\UpdateExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\UserResource;
use App\Models\User;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Exercise::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('createdBy')) {
            $query->where('created_by', request('createdBy'));
        }

        $exercises = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Exercises/Index', [
            'exercises' => ExerciseResource::collection($exercises),
            'users' => UserResource::collection(User::all()),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExerciseRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Exercise $exercise)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exercise $exercise)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExerciseRequest $request, Exercise $exercise)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exercise $exercise)
    {
        //
    }
}
