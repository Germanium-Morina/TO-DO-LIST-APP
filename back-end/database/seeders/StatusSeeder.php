<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Status;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Status::create(['statusName' => 'Open']);
        Status::create(['statusName' => 'In Progress']);
        Status::create(['statusName' => 'Done']);
        Status::create(['statusName' => 'Closed']);

    }
}
