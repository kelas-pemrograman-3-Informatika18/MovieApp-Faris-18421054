<template>
  <q-layout view="lHh LpR fFf">
    <q-toolbar unelevated style="height: 60px;" class="bg-blue-grey-14 text-white">
      <div class="text-h5 q-ml-lg">Movie App</div>

      <q-space />

      <div v-if="$q.screen.md || $q.screen.md || $q.screen.lg || $q.screen.xl">
        <q-btn size="medium" :to="{ name: 'homeuser' }" flat>home</q-btn>
        <q-btn size="medium" :to="{ name: 'myorder' }" flat>order</q-btn>
        <q-btn size="medium" flat>about</q-btn>
        <q-btn size="medium" flat @click="logout()">logout</q-btn>
      </div>
      <q-btn size="medium" icon="shopping_cart" round flat/>
      <q-btn flat @click="drawer = !drawer" v-if="$q.screen.xs || $q.screen.xl" icon="menu" round/>
    </q-toolbar>
    <q-drawer
        v-model="drawer"
        :width="200"
        side="right"
        :breakpoint="500"
        bordered
        content-class="bg-blue-grey-14"
      >
        <q-scroll-area class="fit">
          <q-list>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
                Home
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
  data () {
    return {
      drawer: false
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
