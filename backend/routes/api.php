<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\TransactionController;

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('/testimonials', [TestimonialController::class, 'index']);

Route::post('/transactions', [TransactionController::class, 'store']);
Route::get('/transactions/{kode}', [TransactionController::class, 'showByKode']);
Route::patch('/transactions/{kode}/verify', [TransactionController::class, 'verify']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::post('/testimonials', [TestimonialController::class, 'store']);

});
