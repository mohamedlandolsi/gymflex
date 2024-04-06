<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateExerciseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'image'],
            'video' => ['nullable', 'file'],
            'description' => ['nullable', 'string'],
            'sets' => ['required', 'integer', 'min:1'],
            'rep_range' => ['required', 'string'],
            'rest_period' => ['nullable', 'integer', 'min:0'],
            'muscle_group' => ['required', Rule::in(['chest', 'back', 'shoulders', 'legs', 'arms', 'core'])],
            'equipment' => ['required', Rule::in(['barbell', 'dumbbell', 'kettlebell', 'cable', 'machine', 'bodyweight'])],
            'workout_id' => ['nullable', 'integer', 'exists:workouts,id'],
        ];
    }
}
