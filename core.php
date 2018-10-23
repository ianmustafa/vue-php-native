<?php

// Dump and Die
function dd($value, $export = false)
{
    echo '<pre>';
    $export ? var_export($value) : var_dump($value);
    exit('</pre>');
}

// Membuat RESTful response
function response($data, $status_code = 200)
{
    // List kode status HTTP yang sering dipakai
    $statuses = [
        200 => 'OK',
        201 => 'Created',
        204 => 'No Content',
        206 => 'Partial Content',

        301 => 'Moved Permanently',
        302 => 'Found',

        400 => 'Bad Request',
        401 => 'Unauthorized',
        403 => 'Forbidden',
        404 => 'Not Found',
        405 => 'Method Not Allowed',
        409 => 'Conflict',
        413 => 'Payload Too Large',
        415 => 'Unsupported Media Type',
        422 => 'Unprocessable Entity',
        429 => 'Too Many Requests',
    ];

    // RESTful: selalu berikan kode status yang tepat!
    header("{$_SERVER['SERVER_PROTOCOL']} {$status_code} {$statuses[$status_code]}");
    // RESTful: selalu berikan tipe konten!
    header('Content-Type: application/json');

    // Jika datanya null, jangan tampilkan apapun
    echo $data === null ? null : json_encode($data);
}

// Parse input HTTP request sesuai dengan atribut yang diinginkan.
// Dengan cara ini, input dari HTTP request dengan method
// selain GET dan POST tetap bisa diambil
function parse_input($attributes)
{
    $input = json_decode(file_get_contents('php://input'), true);

    // Filter data yang masuk untuk memastikan tidak ada atribut
    // ilegal yang disertakan dalam request, lalu return
    return array_filter($input, function ($key) use ($attributes) {
        return in_array($key, $attributes);
    }, ARRAY_FILTER_USE_KEY);
}
