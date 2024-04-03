<?php

namespace App\Http\Controllers;

use App\Models\Workout;
use App\Http\Requests\StoreWorkoutRequest;
use App\Http\Requests\UpdateWorkoutRequest;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\WorkoutResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class WorkoutController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Workout::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('createdBy')) {
            $query->where('created_by', request('createdBy'));
        }

        $workouts = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Workouts/Index', [
            'workouts' => WorkoutResource::collection($workouts),
            'users' => UserResource::collection(User::all()),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Workouts/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkoutRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('workout/' . Str::random(), 'public');
        }

        Workout::create($data);

        return to_route('workouts.index')->with('success', 'Workout created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Workout $workout)
    {
        $query = $workout->exercises();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('createdBy')) {
            $query->where('created_by', request('createdBy'));
        }

        $exercises = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Workouts/Details', [
            'workout' => new WorkoutResource($workout),
            'exercises' => ExerciseResource::collection($exercises),
            'users' => UserResource::collection(User::all()),
            'queryParams' => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Workout $workout)
    {
        return inertia('Workouts/Edit', [
            'workout' => new WorkoutResource($workout),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkoutRequest $request, Workout $workout)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($image) {
            if ($workout->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($workout->image_path));
            }
            $data['image_path'] = $image->store('workout/' . Str::random(), 'public');
        }

        $workout->update($data);

        return to_route('workouts.index')
            ->with('success', "\"$workout->name\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Workout $workout)
    {
        $name = $workout->name;
        $workout->delete();

        if ($workout->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($workout->image_path));
        }

        return to_route('workouts.index')->with('success', " \"$name\" deleted successfully.");
    }
}
