<template>
  <q-layout>
    <q-page-container>
      <q-page padding class="bg-light-blue-2">
        <div class="row">
          <q-card class="fixed-center col-md-4 col-xs-12">
            <q-card-section>
              <div class="text-h6">
                Halaman Register
              </div>
              <q-form
              @submit="onSubmit"
              class="q-gutter-md">
                <q-input v-model="username"
                filled
                label="Username"
                :rules="[
                  val => val && val.length > 0 || 'PLease Insert Username'
                ]"
                />
                <q-input v-model="namalengkap" filled label="Nama Lengkap"
                :rules="[val => val && val.length > 0 || 'PLease Insert Your Name']"/>
                <q-input v-model="email" filled label="Email"
                :rules="[val => val && val.length > 0 || 'PLease Insert Your Email']"/>
                <q-input v-model="password" type="password" filled label="Password"
                :rules="[val => val && val.length > 0 || 'PLease Insert Password']"/>
                <div class="q-gutter-md">
                  <q-btn label="Register" type="submit" unelevated color="blue-grey-13" />
                  <q-btn label="Login" :to="{ name: 'loginpage' }" unelevated color="blue-grey-13" flat />
                </div>
              </q-form>
            </q-card-section>
          </q-card>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      username: null,
      namalengkap: null,
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        namaLengkap: this.namalengkap,
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.$router.push({ name: 'loginpage' })
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>

<style>
</style>
