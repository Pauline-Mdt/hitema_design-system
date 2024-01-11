<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use OpenApi\Annotations as OA;

class ListUserController extends Controller
{
    /**
     * @OA\Get(
     *     path="/api/users",
     *     tags={"Users"},
     *     summary="List all users",
     *     description="List all users",
     *     operationId="listUsers",
     *     @OA\Response(
     *          response=200,
     *          description="Success",
     *          @OA\JsonContent(
     *              type="array",
     *              @OA\Items       (ref="#/components/schemas/User"))
     *      ),
     *     @OA\Response(
     *          response=401,
     *          description="Unauthenticated",
     *     ),
     *     @OA\Response(
     *     response=403,
     *     description="Forbidden"
     *    ),
     * )
     *
     *
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        $users = User::all();

        foreach ($users as $user) {
            $user['tattooist'] = $user->tattooist;
            $user['documents'] = $user->documents;
        }

        return response()->json($users);
    }
}
