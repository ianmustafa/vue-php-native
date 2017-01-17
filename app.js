// Ubah URL dibawah sesuai endpoint project Anda
axios.defaults.baseURL = 'https://demo.ianmustafa.com/vue-php-native'

// Siapkan route components disini
// - Route: LihatUser
const LihatUser = {
  template: '#lihat-user',

  // Guard ini dipakai untuk memanggil ulang ambilDataUser() setiap kali
  // route ini diakses, untuk memastikan data selalu diperbarui
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$parent.ambilSemuaUser()
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

  // Guard ini dipakai untuk memanggil ambilUser() ketika route ini diakses,
  // agar data user bisa terisi sesuai dengan id user yang disertakan
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$parent.ambilUser(to.params.id_user)
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
      // Cukup pakai looping ke users, tanpa perlu akses ke API server
      for (var i = 0; i < this.users.length; i++) {
        if (this.users[i].id == userId) this.user = this.users[i]
      }
    },

    // Tambahkan user baru ke API server
    tambahUser() {
      axios.post('/user.php', this.user)
        .then(response => {
          // Set pesan sesuai respon dari API server
          this.message = response.data.message

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

            // Refresh halaman lihat-user
            this.$router.go({ name: 'lihat-user' })
          })
      }
    }
  },

  // Hook ini akan dijalankan ketika Vue selesai dinisialisasi,
  // bertugas memanggil ambilSemuaUser() untuk pertama kali
  created() {
    this.ambilSemuaUser()
  }
})
