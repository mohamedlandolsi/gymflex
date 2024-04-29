<?php

namespace Database\Seeders;

use App\Models\Exercise;
use App\Models\User;
use App\Models\Workout;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Mohamed',
        //     'email' => 'mohamed@example.com',
        //     'password' => bcrypt('Azerty123*'),
        //     'email_verified_at' => time(),
        // ]);

        Exercise::factory()
            ->count(10)
            ->create();
    }
}
