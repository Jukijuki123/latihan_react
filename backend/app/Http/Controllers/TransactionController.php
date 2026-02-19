<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    // CREATE TRANSACTION
    public function store(Request $request)
    {
        $validated = $request->validate([
            'jenis' => 'required|string',
            'jumlah' => 'required|integer|min:1',
            'lokasi' => 'required|string',
            'tanggal' => 'required|date',
            'waktu' => 'required|string'
        ]);

        $hargaPerKg = [
            'Plastik' => 5000,
            'Kertas' => 3000,
            'Logam' => 15000,
            'Kaca' => 2000,
            'Organik' => 1000,
        ];

        $total = $validated['jumlah'] * ($hargaPerKg[$validated['jenis']] ?? 0);

        $kode = 'TRX-' . strtoupper(Str::random(8));

        $transaction = Transaction::create([
            'kode' => $kode,
            'jenis' => $validated['jenis'],
            'jumlah' => $validated['jumlah'],
            'lokasi' => $validated['lokasi'],
            'tanggal' => $validated['tanggal'],
            'waktu' => $validated['waktu'],
            'total_harga' => $total,
        ]);

        return response()->json($transaction, 201);
    }

    // GET BY KODE (SCAN)
    public function showByKode($kode)
    {
        $transaction = Transaction::where('kode', $kode)->first();

        if (!$transaction) {
            return response()->json([
                'message' => 'Transaksi tidak ditemukan'
            ], 404);
        }

        return response()->json($transaction);
    }

    // VERIFY
    public function verify($kode)
    {
        $transaction = Transaction::where('kode', $kode)->first();

        if (!$transaction) {
            return response()->json(['message' => 'Not found'], 404);
        }

        $transaction->status = 'completed';
        $transaction->save();

        return response()->json([
            'message' => 'Transaksi berhasil diverifikasi'
        ]);
    }
}
