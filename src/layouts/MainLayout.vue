<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-grey-14">
      <q-toolbar>
        <q-btn dense flat round @click="leftDrawerOpen = !leftDrawerOpen" icon="menu" />
        <q-space></q-space>
        <q-btn flat round>
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="logout()">
                <q-item-section>Log Out</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="bg-blue-grey-10 text-white"
    >
      <q-scroll-area class="fit">
        <q-list bordered separator>
          <q-item class="justify-center text-center q-mt-md">
            <div>
              <q-avatar size="100px">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
              <div class="text-weight-bold q-mt-sm text-h6">{{ $q.localStorage.getItem('dataUser').namaLengkap }}</div>
              <div>Aplikasi Penjualan Film</div>
            </div>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dashboardAdmin' }">
            <q-item-section avatar>
              <q-icon name="dashboard"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dashboard</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'datadvd' }">
            <q-item-section avatar>
              <q-icon name="inbox"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Data DVD</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'inputbarang' }">
            <q-item-section avatar>
              <q-icon name="input"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Input DVD</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable active-class="active" v-ripple exact :to="{ name: 'datauser' }">
            <q-item-section avatar>
              <q-icon name="supervisor_account"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Data User</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$q.localStorage.remove('dataUser')
      this.$router.push({ name: 'loginpage' })
    }
  }
}
</script>
<style scoped>
.active {
  color: #000;
  background-color: rgb(255, 255, 255);
  padding-right: 20px;
}
</style>
