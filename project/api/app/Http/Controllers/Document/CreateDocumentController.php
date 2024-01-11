<?php

namespace App\Http\Controllers\Document;

use App\Http\Controllers\Controller;
use App\Http\Requests\DocumentDataRequest;
use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CreateDocumentController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(DocumentDataRequest $request)
    {
        $document = new Document();

        foreach ($request->safe()->except('document') as $key => $value) {
            ($key == 'user_id' && empty($user[$key])) ? $user[$key] = null : $document[$key] = $value;
        }

        $document['name'] = $request->file('document')->hashName();
        $document['extension'] = ".".$request->file('document')->extension();
        Storage::putFile('documents', $request->file('document'));

        $document->save();

        return response()->json($document, 201);
    }
}
