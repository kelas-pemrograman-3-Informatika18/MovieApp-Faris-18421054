<template>
  <q-layout class="bg-light-blue-2" view="lHh Lpr Lff">
    <q-page-container>
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pa-md">
            <q-card flat>
              <div class="row items-center">
                <div class="col-md-6 col-sm-12 col-xs-12">
                  <div class="row q-py-md">
                    <div class="col-md-8 offset-2">
                      <q-img src="login.png"></q-img>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <q-card flat bordered>
                    <q-card-section>
                      <div class="text-h4 text-weight-bold">MovieApp</div>
                      <div>Login Page</div>
                    </q-card-section>
                    <q-form @submit="login">
                      <q-card-section>
                        <q-input v-model="username" label="input username"/>
                        <q-input v-model="password" type="password" label="input password"/>
                      </q-card-section>
                      <q-card-section>
                        <q-btn class="full-width" type="submit" unelevated color="blue-grey-13" label="Login" />
                        <q-btn class="full-width q-mt-md" :to="{ name: 'registerpage' }" flat unelevated color="blue-grey-13" label="Register" />
                      </q-card-section>
                    </q-form>
                  </q-card>
                </div>
              </div>
            </q-card>
          </div>
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
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('dataUser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dashboardAdmin' })
          } else {
            this.$router.push({ name: 'homeuser' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
