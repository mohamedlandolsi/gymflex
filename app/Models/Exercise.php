<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'image_path',
        'video_path',
        'description',
        'sets',
        'rep_range',
        'rest_period',
        'muscle_group',
        'equipment',
        'created_by',
        'updated_by',
    ];

    public function workout()
    {
        return $this->belongsToMany(Workout::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
