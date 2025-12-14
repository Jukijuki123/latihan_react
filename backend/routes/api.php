<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NewsController;

// ✅ ENDPOINT PUBLIC (tidak butuh token)
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('/news', [NewsController::class, 'index']); // public
Route::middleware('auth:sanctum')->post('/news', [NewsController::class, 'store']); // only login

// ✅ ENDPOINT YANG BUTUH TOKENl
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/edukasi', function (Request $request) {
        return response()->json([
            'title' => 'Belajar Investasi untuk Pemula',
            'content' => 'Ini konten edukasi yang hanya boleh diakses user yang sudah login.',
            'user' => $request->user(),
        ]);
    });
});
