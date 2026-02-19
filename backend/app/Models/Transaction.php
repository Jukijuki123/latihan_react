<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'kode',
        'jenis',
        'jumlah',
        'lokasi',
        'tanggal',
        'waktu',
        'total_harga',
        'status'
    ];
}
