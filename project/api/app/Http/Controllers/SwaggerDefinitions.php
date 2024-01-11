<?php

namespace App\Http\Controllers;

use OpenApi\Annotations as OA;

/**
 * @OA\Info(
 *      version="1.0.0",
 *     title="Tattoo API",
 *     description="Tattoo API",
 *     @OA\Contact(
 *          email="paulinemaudet.dev@gmail.com"
 *     )
 * )
 *
 * @OA\Schema(
 *     schema="User",
 *     type="object",
 *     title="User",
 *     description="User",
 *     @OA\Property(
 *          property="id",
 *          type="integer",
 *          description="User id"
 *    ),
 *     @OA\Property(
 *          property="name",
 *          type="string",
 *          description="User name"
 *      ),
 *     @OA\Property(
 *          property="email",
 *          type="string",
 *     ),
 *     @OA\Property(
 *          property="email_verified_at",
 *          type="string",
 *     ),
 * )
 *
 */
class SwaggerDefinitions
{

}
