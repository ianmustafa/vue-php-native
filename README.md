![Vue.js + PHP Native](https://ianmustafa.github.io/vue-php-native/cover.jpg)

# Vue.js dengan Back-end PHP Native
Belajar hal baru selalu asyik. Disini, saya mencoba [Vue.js](https://vuejs.org)
untuk pertama kalinya. Dipadukan dengan [Vue Router](https://router.vuejs.org/en)
dan [Axios](https://github.com/mzabriskie/axios), saya harap contoh sederhana
ini bisa memberi gambaran bagi kita, aplikasi interaktif yang _powerful_
nggak harus ribet. 😊

## [Demo](https://ianmustafa.github.io/vue-php-native/)

## Bagaimana cara agar bisa jalan di lokal?
Cara untuk menjalankan proyek ini cukup sederhana
### 1. Download proyek ini

Ada beberapa cara sederhana untuk download proyek ini baik melalui [github](https://github.com/ianmustafa/vue-php-native) ataupun [composer](https://getcomposer.org/).

Untuk clone dari github, langkahnya:
```bash
$ git clone https://github.com/ianmustafa/vue-php-native.git ./lokasi/folder/proyek/vue-php-native
```
Anda juga dapat mendownloadnya sebagai ZIP disini: [Download zip](https://github.com/ianmustafa/vue-php-native/archive/master.zip)

Adapun kalau melalui composer:
```bash
$ composer create-project ianmustafa/vue-php-native ./lokasi/folder/proyek/vue-php-native
```

### 2. Setup Database
Di proyek ini telah ada file database bernama `vue-php-native.sql`.
- Silahkan Anda buat database baru dengan configurasi terserah Anda, bebas.
- Import database `vue-php-native.sql` ke database Anda tersebut.
- Buka `db.php` lalu sesuaikan konfigurasi database dengan database yang Anda buat tadi.

### 3. Pengaturan API URL
Secara default, kami mengarahkan AJAX API ke url `http://localhost:8000`.
Akan tetapi Anda dapat mengubah url tersebut sesuka Anda.
Caranya:
Buka `app.js` dan sesuaikan `axios.defaults.baseURL` ke URL proyek di server lokal Anda.

### 4. Jalankan di browser
Jika anda telah melakukan pengaturan sesuai petunjuk diatas, maka langkah terakhir adalah memastikan bahwa proyek aplikasi ini telah berjalan di browser.
Caranya gampang, Anda bisa langsung jalankan proyek ini menggunakan perintah:
```bash
$ php -S localhost:8000
```
atau jika Anda ingin yang lebih powerfull, Anda dapat menggunakan [http-server](https://www.npmjs.com/package/http-server)
Langkah awal untuk instal http-server adalah:
```bash
$ npm install http-server -g
```
Kemudian untuk menjalankan aplikasi kita:
```bash
$ http-server -p 8000
```

## Menemukan Bug?
Silakan buat [_issue_ baru](https://github.com/ianmustafa/vue-php-native/issues/new). Saya harap _issue_-nya berkaitan dengan proyek saya, bukan berupa pertanyaan umum tentang Vue, Vue Resource atau Axios. Untuk hal ini silakan berkonsultasi ke [Google](https://googel.co.id).

## Ingin Berkontribusi?
1. Fork repo ini, lalu clone dari repo hasil fork Anda.
2. Lakukan modifikasi sesuai keinginan Anda.
3. Kirimkan _pull request_ ke repo ini.

## Ada pertanyaan?
Anda bisa menghubungi saya via Facebook [@iianmustafa](https://fb.me/iianmustafa), Twitter [@iianmustafa](https://twitter.com/iianmustafa) atau Telegram [@ianmustafa](https://telegram.me/ianmustafa).

## Lisensi
[MIT](http://opensource.org/licenses/MIT).

Copyright © 2017 Ian Mustafa.
