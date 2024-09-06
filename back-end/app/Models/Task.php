<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'userId',
        'task',
        'statusId',
        'dueDate',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'statusId');
    }
}
