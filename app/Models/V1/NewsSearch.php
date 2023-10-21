<?php

namespace App\Models\V1;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Traits\Tappable;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Support\Facades\Log;

class NewsSearch extends Model
{
    use HasFactory;
    use Tappable;

    protected $fillable = [];

    public function search(string $query) {
        try {
            $client = new Client();

            $response = $client->request(
                'GET', 
                'https://'.config("app.rapid_api_host").'/news?q='.$query, 
                ['headers' => [
                        'X-RapidAPI-Host' => config("app.rapid_api_host"),
                        'X-RapidAPI-Key' => config("app.rapid_api_key"),
                ]]
            );

            return json_decode(
                $response->getBody(),
                true
            );
        } catch (RequestException $exception) {
            Log::error($exception->getMessage());
            return false;
        }
    }
}
