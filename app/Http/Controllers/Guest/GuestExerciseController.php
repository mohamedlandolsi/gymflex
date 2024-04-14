<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Exercise;
use App\Http\Requests\StoreExerciseRequest;
use App\Http\Requests\UpdateExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class GuestExerciseController extends Controller
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

        return inertia('Guest/Exercises/Index', [
            'exercises' => ExerciseResource::collection($exercises),
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
        return inertia('Guest/Exercises/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExerciseRequest $request)
    {
        $data = $request->validated();
        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        if ($image) {
            $data['image_path'] = $image->store('exercise/' . Str::random(), 'public');
        }

        Exercise::create($data);

        return to_route('exercises.index')->with('success', 'Exercise created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Exercise $exercise)
    {
        return inertia('Guest/Exercises/Details', [
            'exercise' => new ExerciseResource($exercise),
            'users' => UserResource::collection(User::all()),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exercise $exercise)
    {
        return inertia('Guest/Exercises/Edit', [
            'exercise' => new ExerciseResource($exercise),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateExerciseRequest $request, Exercise $exercise)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        if ($image) {
            if ($exercise->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($exercise->image_path));
            }
            $data['image_path'] = $image->store('exercise/' . Str::random(), 'public');
        }

        $exercise->update($data);

        return to_route('exercises.index')
            ->with('success', "\"$exercise->name\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exercise $exercise)
    {
        $name = $exercise->name;
        $exercise->delete();

        if ($exercise->image_path) {
            Storage::disk('public')->deleteDirectory(dirname($exercise->image_path));
        }

        return to_route('exercises.index')->with('success', " \"$name\" deleted successfully.");
    }
}
