// Ubah URL dibawah sesuai endpoint project Anda
axios.defaults.baseURL = 'http://localhost:8000'

// Siapkan route components disini
// - Route: LihatUser
const LihatUser = {
  template: '#lihat-user',

  // Guard beforeRouteEnter() selalu dipanggil sebelum route diakses.
  // Kita bisa memakainya untuk me-reset nilai data user.
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root.user = { nama: '', email: '', alamat: '' }
    })
  },
}
// - Route: TambahUser
const TambahUser = {
  template: '#tambah-user',
}
// - Route: UbahUser
const UbahUser = {
  template: '#ubah-user',

  // Kita pakai guard ini untuk memanggil ambilUser() ketika route diakses,
  // agar data user bisa terisi sesuai dengan id user yang disertakan
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$root.ambilUser(to.params.id_user)
    })
  },
}


// Mulai Vue App
const app = new Vue({
  el: '#app',

  data: {
    users: [],
    user: { nama: '', email: '', alamat: '' },
    message: '',
  },

  // Routing memakai Vue Router
  router: new VueRouter({
    // Routes yang dipakai bisa didefinisikan disini
    routes: [
      { path: '/', component: LihatUser, name: 'lihat-user' },
      { path: '/user/tambah', component: TambahUser, name: 'tambah-user' },
      { path: '/user/:id_user/ubah', component: UbahUser, name: 'ubah-user' },
    ]
  }),

  // Methods yang nantinya dipakai berulang bisa didefinisikan disini
  methods: {
    // Ambil semua data user dari API server
    ambilSemuaUser() {
      axios.get('/user.php')
        .then(response => {
          this.users = response.data
      })
    },

    // Ambil data user berdasarkan ID
    ambilUser(userId) {
      // Cukup pakai method find() yang tersedia untuk array
      this.user = this.users.find(function (item) { return item.id == userId })
    },

    // Tambahkan user baru ke API server
    tambahUser() {
      axios.post('/user.php', this.user)
        .then(response => {
          // Set pesan sesuai respon dari API server
          this.message = response.data.message

          // Tambahkan data user yang baru ke this.users
          this.users.push(this.user)

          // Redirect kembali ke lihat-user
          this.$router.push({ name: 'lihat-user' })
        })
    },

    // Tambahkan user baru ke API server
    ubahUser(userId) {
      axios.patch('/user.php?id=' + userId, this.user)
        .then(response => {
          // Set pesan sesuai respon dari API server
          this.message = response.data.message

          // Ambil indeks dari user dengan id bersangkutan dari
          // this.users, untuk dipakai dalam method splice()
          // untuk menindih data user di this.users
          var i = this.users.findIndex(function (item) { return item.id == userId })
          // Tindih data user lama dengan data yang baru. Indeks
          // yang diambil sebelumnya dipakai sebagai parameter
          // pertama dalam method splice()
          this.users.splice(i, 1, this.user)

          // Redirect kembali ke lihat-user
          this.$router.push({ name: 'lihat-user' })
        })
    },

    // Tambahkan user baru ke API server
    hapusUser(userId) {
      if (confirm('Yakin ingin menghapus data user ini?')) {
        axios.delete('/user.php?id=' + userId)
          .then(response => {
            // Set pesan sesuai respon dari API server
            this.message = response.data.message

            // Ambil indeks dari user dengan id bersangkutan dari
            // this.users, untuk dipakai dalam method splice()
            // untuk menghapus data user dari this.users
            var i = this.users.findIndex(function (item) { return item.id == userId })
            // Hapus data user lama. splice() tetap digunakan,
            // namun tanpa parameter ketiga karena
            // tidak ada pergantian data
            this.users.splice(i, 1)
          })
      }
    }
  },

  // Hook created() akan dijalankan ketika Vue selesai dinisialisasi.
  // Kita bisa gunakan hook ini untuk memanggil
  // ambilSemuaUser() untuk pertama kali
  created() {
    this.ambilSemuaUser()
  }
})
