<?php

Route::group(['prefix' => 'api/v1', 'middleware' => ['cors']], function() {

  Route::group(['prefix' => 'user'], function() {
    Route::get('login','API\SalesController@login');
  });
  
  Route::group(['prefix' => 'map'], function() {
    Route::get('data','API\MapController@data');
  });

  Route::group(['prefix' => 'sales'], function() {
    Route::get('getclients','API\SalesController@getClients');
    Route::post('checkin','API\SalesController@checkIn');
    Route::post('checkout','API\SalesController@checkOut');
  });

	Route::group(['prefix' => 'departments'], function() {
		Route::get('/', 'API\DepartmentController@index');
		Route::post('/', 'API\DepartmentController@store');
	});

	Route::group(['prefix' => 'territory'], function() {
		Route::get('/', 'API\TerritoryController@index');
		Route::post('/', 'API\TerritoryController@store');
		Route::delete('/', 'API\TerritoryController@destroy');
	});

  Route::group(['prefix' => 'clients'], function() {
    Route::get('/', 'API\ClientController@index');
    Route::post('/', 'API\ClientController@store');
    Route::delete('/', 'API\ClientController@destroy');
  });

  Route::group(['prefix' => 'users'], function() {
    Route::get('/', 'API\UserController@index');
    Route::get('/{role}', 'API\UserController@usersByRole');
    Route::post('/', 'API\UserController@store');
    Route::delete('/', 'API\UserController@destroy');
  });

  Route::group(['prefix' => 'tasks'], function() {
    Route::get('/', 'API\TaskController@index');
    Route::post('/', 'API\TaskController@store');
    Route::delete('/', 'API\TaskController@destroy');
  });

  Route::group(['prefix' => 'teams'], function() {
    Route::get('/', 'API\TeamController@index');
    Route::get('/salesmanager', 'API\TeamController@teamsByManager');
    Route::get('/{teamId}', 'API\TeamController@get');
    Route::post('/', 'API\TeamController@store');
    Route::delete('/', 'API\TeamController@destroy');
  });

});

Route::get('/', 'HomeController@index');
Route::post('login','Auth\LoginController@login');
Route::get('login','Auth\LoginController@showLoginForm')->name('login');
Route::post('logout','Auth\LoginController@logout')->name('logout');
Route::get('/{any}', 'HomeController@index')->where('any', '.*');
