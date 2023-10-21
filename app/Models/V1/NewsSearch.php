<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;

class NewsSearch extends Model
{
    use HasFactory;
    use Tappable;

    protected $fillable = [];
}
