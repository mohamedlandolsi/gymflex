<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExerciseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'image_path' => $this->image_path,
            'video_path' => $this->video_path,
            'sets' => $this->sets,
            'rep_range' => $this->rep_range,
            'rest_period' => $this->rest_period,
            'muscle_group' => $this->muscle_group,
            'equipment' => $this->equipment,
            'workout' => new WorkoutResource($this->workout),
            'createdBy' => new UserResource($this->createdBy),
            'updatedBy' => new UserResource($this->updatedBy),
            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),
        ];
    }
}
