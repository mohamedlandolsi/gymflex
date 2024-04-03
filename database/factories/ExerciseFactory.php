<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Exercise>
 */
class ExerciseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(),
            'description' => fake()->realText(),
            'image_path' => fake()->imageUrl(),
            'video_path' => fake()->url(),
            'sets' => fake()->numberBetween(1, 5),
            'rep_range' => fake()->randomElement(['1-5', '6-8', '5-10', '8-12', '10-15', '15-20']),
            'rest_period' => fake()->numberBetween(30, 600),
            'muscle_group' => fake()->randomElement(['Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core']),
            'equipment' => fake()->randomElement(['Bodyweight', 'Dumbbells', 'Barbell', 'Resistance Bands', 'Kettlebells', 'Machine', 'Cable']),
            'created_by' => 1,
            'updated_by' => 1,
            'workout_id' => 1,
        ];
    }
}
