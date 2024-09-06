<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $fillable = [
        'statusName',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'statusId');
    }
}