<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    public function index()
    {
        return response()->json(
            Testimonial::latest()->get()
        );
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'quote' => 'required|string|min:10',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        $testimonial = Testimonial::create([
            'user_id' => $user->id,
            'name' => $user->name,
            'username' => '@' . explode('@', $user->email)[0],
            'quote' => $validated['quote'],
            'rating' => $validated['rating'],
        ]);

        return response()->json($testimonial, 201);
    }
}
