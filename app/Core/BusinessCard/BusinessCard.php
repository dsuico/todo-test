<?php

namespace App\Core\BusinessCard;

use SimpleXMLElement;

class BusinessCard {

    public function __construct()
    {
        $this->xml = new SimpleXMLElement(file_get_contents(public_path('directory-export-business-cards.xml')));
    }

    public function getByName($name)
    {
        if(!$name)
            return;

        $name   = strtoupper(str_replace('_',' ', $name));
        $card   = $this->xml->xpath("//*[@name='$name']/..")[0];

        $res['countrycode'] = (string)$card->attributes()['countrycode'];
        $res['name']        = (string)$card->name->attributes()['name'];

        return $res;
    }

    public function getById($icd, $enum)
    {
        if(!$icd || !$enum)
            return;

        $id     = $icd .':'. $enum;
        $card   = $this->xml->xpath("//*[@value='$id']/..")[0];

        $res['countrycode'] = (string)$card->entity->attributes()['countrycode'];
        $res['name']        = (string)$card->entity->name->attributes()['name'];

        return $res;
    }

    public function searchByName($name)
    {
        if(!$name)
            return;

        $name   = strtoupper(str_replace('_',' ', $name));
        $cards  = $this->xml->xpath("//*[contains(@name,'$name')]/parent::*");

        foreach($cards as $card)
        {
            $res[] = [
                'countrycode'   => (string)$card->attributes()['countrycode'],
                'name'          => (string)$card->name->attributes()['name']
            ];
        }

        return $res;
    }
}

