<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Core\BusinessCard\BusinessCard;
use App\Http\Resources\BusinessCardResource;

class BusinessCardController extends Controller
{
    public function __construct(BusinessCard $businessCard)
    {
        $this->businessCard = $businessCard;
    }

    public function getById(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'icd' => 'required',
            'enum' => 'required'
        ]);

        if ($validator->fails()) {    
            return response()->json($validator->messages(), 400);
        }

        $cards = $this->businessCard->getById($request->icd, $request->enum);

        return response()->json($cards);
    }
    
    public function getByName($name, Request $request)
    {
        
        if (!$name) {    
            return response()->json($validator->messages(), 400);
        }

        $cards = $this->businessCard->getByName($name);

        return response()->json($cards);
    }

    public function searchByName(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'search' => 'required'
        ]);
        
        if ($validator->fails()) {    
            return response()->json($validator->messages(), 400);
        }

        $cards = $this->businessCard->searchByName($request->search);

        return response()->json($cards);
    }

}
