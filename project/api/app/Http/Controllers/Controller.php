<?php

namespace App\Http\Controllers;

use Elastic\Elasticsearch\ClientBuilder;
use Elastic\Elasticsearch\Exception\ClientResponseException;
use Elastic\Elasticsearch\Exception\ServerResponseException;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use OpenApi\Annotations as OA;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    /**
     * @OA\Get(
     *     path="/api",
     *     tags={"Home"},
     *     summary="Home",
     *     description="Home",
     *     operationId="home",
     *     @OA\Response(
     *          response=200,
     *          description="Successful connection",
     *     ),
     *     @OA\Response(
     *          response=500,
     *          description="Server error",
     *     ),
     * )
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function home() {
        return response()->json([
            'message' => 'Successful connection.'
        ]);
    }

    public function elasticsearch() {
        $client = ClientBuilder::create()
            ->setHosts([getenv('ELASTICSEARCH_HOSTS')])
            ->build();

        try {
            $response = $client->ping();
            $info = $client->info();

            if ($response) {
                return response()->json([
                    'status' => 'success',
                    'message' => 'Successfully connected to Elasticsearch server.',
                    'version' => $info['version']['number']
                ]);
            } else {
                return response()->json(['status' => 'error', 'message' => 'Failed to connect to Elasticsearch server.']);
            }
        } catch (\Exception $e) {
            return response()->json(['status' => 'error', 'message' => 'Exception: ' . $e->getMessage()]);
        }
    }

    public function elasticsearchSearch(Request $request)
    {
        $query = $request->input('query');
        echo $query;

        $client = ClientBuilder::create()
            ->setHosts([getenv('ELASTICSEARCH_HOSTS')])
            ->build();

        $params = [
            'index' => 'les-gorgones_*/',
            'body' => [
                'query' => [
                    'multi_match' => [
                        'type' => 'best_fields',
                        'query' => $query,
                    ]
                ]
            ]
        ];

        try {
            $response = $client->search($params);
            return response()->json($response);

        } catch (ClientResponseException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Client error: ' . $e->getMessage()
            ]);
        } catch (ServerResponseException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Server error: ' . $e->getMessage()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Exception: ' . $e->getMessage()
            ]);
        }

    }

    public function routeError() {
        return response()->json([
            'message' => 'No route matches the incoming request.'
        ], 404);
    }
}
