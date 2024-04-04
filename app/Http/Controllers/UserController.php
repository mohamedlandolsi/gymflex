<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCrudResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", 'created_at');
        $sortDirection = request("sort_direction", 'desc');

        if (request('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }
        if (request('email')) {
            $query->where('email', 'like', '%' . request('email') . '%');
        }

        $users = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);

        return inertia('Users/Index', [
            'users' => UserCrudResource::collection($users),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();

        $data['email_verified_at'] = time();
        $data['password'] = bcrypt($data['password']);

        /** @var $image \Illuminate\Http\UploadedFile */
        $image = $data['image'] ?? null;

        if ($image) {
            $data['profile_photo_path'] = $image->store('user/' . Str::random(), 'public');
        }

        User::create($data);

        return to_route('users.index')->with('success', 'User created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia('Users/Edit', [
            'user' => new UserCrudResource($user),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();

        $image = $data['image'] ?? null;
        $data['updated_by'] = Auth::id();

        $password = $data['password'] ?? null;
        if ($password) {
            $data['password'] = bcrypt($password);
        } else {
            unset($data['password']);
        }

        if ($image) {
            if ($user->image_path) {
                Storage::disk('public')->deleteDirectory(dirname($user->profile_photo_path));
            }
            $data['profile_photo_path'] = $image->store('user/' . Str::random(), 'public');
        }

        $user->update($data);

        return to_route('users.index')
            ->with('success', "\"$user->name\" updated successfully.");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $name = $user->name;
        $user->delete();

        if ($user->profile_photo_path) {
            Storage::disk('public')->deleteDirectory(dirname($user->profile_photo_path));
        }

        return to_route('users.index')->with('success', " \"$name\" deleted successfully.");
    }
}
