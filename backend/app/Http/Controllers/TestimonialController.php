<?php

namespace App\Http\Controllers;

use App\Models\Testimonials;
use Illuminate\Http\Request;

class TestimonialController extends Controller
{
    // GET testimonials
    public function index()
    {
        return response()->json(
            Testimonials::latest()->get()
        );
    }

    // POST testimonial
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required',
            'quote' => 'required',
        ]);

        $testimonial = Testimonials::create([
            'name' => $validated['name'],
            'username' => $request->username ?? null,
            'quote' => $validated['quote'],
            'color' => $request->color ?? 'blue',
            'avatar' => $request->avatar ?? null,
        ]);

        return response()->json($testimonial, 201);
    }
}

