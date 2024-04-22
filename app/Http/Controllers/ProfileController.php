<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    // public function update(ProfileUpdateRequest $request, User $user)
    // {
    //     // Update user data
    //     $user->fill($request->validated());

    //     // Reset email verification if email is updated
    //     if ($user->isDirty('email')) {
    //         $user->email_verified_at = null;
    //     }

    //     // Handle profile photo upload
    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         if ($user->profile_photo_path) {
    //             Storage::disk('public')->delete($user->profile_photo_path);
    //         }
    //         $user->profile_photo_path = $image->store('user/' . Str::random(), 'public');
    //     }

    //     // Save user changes
    //     $request->user()->save();

    //     // Redirect to edit profile page
    //     return redirect()->route('profile.edit');
    // }


    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
