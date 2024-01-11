<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertSuccessful();
    }

    public function test_api_home_route()
    {
        $response = $this->get('/api');

        $response->assertSuccessful();
        $response->assertSimilarJson(['message' => 'Successful connection.']);
    }
}
