<?php
require 'core.php';

$pdo = require 'db.php';

$id = isset($_GET['id']) ? $_GET['id'] : null;

// Kita pakai HTTP request method sesuai spek RESTful:
// - GET untuk ambil semua data
// - GET dengan parameter id untuk ambil satu data
// - POST untuk tambah data
// - PATCH untuk ubah data
// - DELETE untuk hapus data
switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        if ($id === null) {
            // Ambil semua data
            response($pdo->query('SELECT * FROM user')->fetchAll());
        } else {
            // Ambil data dengan $id bersangkutan
            $stmt = $pdo->prepare('SELECT * FROM user WHERE id = :id');
            $stmt->execute(compact('id'));

            response($stmt->fetch());
        }
        break;

    case 'POST':
        // Filter data yang masuk dengan parse_input(), untuk memastikan
        // hanya atribut 'nama', 'email' dan 'alamat' yang boleh masuk
        $input = parse_input(['nama', 'email', 'alamat']);

        // Simpan data
        $stmt = $pdo->prepare('INSERT INTO user (nama, email, alamat) VALUES (:nama, :email, :alamat)');
        $stmt->execute($input);

        response(['message' => 'Data user berhasil ditambahkan.'], 201);
        break;

    case 'PATCH':
        // Filter data yang masuk dengan parse_input(), untuk memastikan
        // hanya atribut 'nama', 'email' dan 'alamat' yang boleh masuk
        $input = parse_input(['nama', 'email', 'alamat']);

        // Tambahkan $id ke $input
        $input['id'] = $id;

        // Simpan perubahan data
        $stmt = $pdo->prepare('UPDATE user SET nama = :nama, email = :email, alamat = :alamat WHERE id = :id');
        $stmt->execute($input);

        response(['message' => 'Data user berhasil diubah.'], 200);
        break;

    case 'DELETE':
        // Simpan perubahan data
        $stmt = $pdo->prepare('DELETE FROM user WHERE id = :id');
        $stmt->execute(compact('id'));

        response(['message' => 'Data user berhasil dihapus.'], 200);
        break;

    case 'OPTIONS':
        // Metode HTTP OPTIONS biasa dipakai di cross-site request dan RESTful.
        // Untuk sementara, berikan respon kosong (204 No Content)
        response(null, 204);
        break;

    default:
        response(['message' => 'Metode HTTP tidak bisa diterima.'], 405);
}
