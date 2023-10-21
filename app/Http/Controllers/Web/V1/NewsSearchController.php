<?php

namespace App\Http\Controllers\Web\V1;

use App\Http\Controllers\Controller;
use App\Models\V1\NewsSearch;
use Illuminate\Http\Request;
use App\Http\Requests\V1\NewsSearchRequest;

class NewsSearchController extends Controller
{
    public function __construct(
        protected NewsSearch $news = new NewsSearch()
    ) { 
        // $this->middleware("auth:sanctum");
    }

    public function search(NewsSearchRequest $request)
    {
        $data = $this->news
            ->search($request->input("query"));
        return compact("data");
    }
}
