<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreWorkoutRequest extends FormRequest
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
            'description' => ['nullable', 'string'],
            'exercises' => ['required', 'array'],
            'exercises.*.id' => ['required', 'integer', 'exists:exercises,id'],
            // 'exercises.*.sets' => ['nullable', 'integer'],
            // 'exercises.*.rep_range' => ['nullable', 'string'],
            // 'exercises.*.rest_period' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
