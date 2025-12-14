<?php

namespace App\Http\Controllers;

use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    // Semua user bisa lihat berita
    public function index()
    {
        $news = News::with('user:id,name,email')->latest()->get();
        return response()->json($news);
    }

    // Hanya user login bisa upload
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $news = News::create([
            'title' => $validated['title'],
            'content' => $validated['content'],
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Berita berhasil ditambahkan',
            'news' => $news,
        ], 201);
    }
}
