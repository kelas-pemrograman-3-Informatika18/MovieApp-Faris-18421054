<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div class="left blue"></div>
          </div>
          <div class="col">
            <q-banner inline-actions elevated class="bg-grey-3">
              <div class="text-h6">Data User</div>
              detail data user yang siap dijual
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-table
          title="Treats"
          :data="data"
          flat
          :columns="columns"
          row-key="name"
      >
        <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="username" :props="props">
                <q-badge color="green">
                  {{ props.row.username }}
                </q-badge>
              </q-td>
              <q-td key="namaLengkap" :props="props">
                <q-badge color="purple">
                  {{ props.row.namaLengkap }}
                </q-badge>
              </q-td>
              <q-td key="email" :props="props">
                <q-badge color="orange">
                  {{ props.row.email }}
                </q-badge>
              </q-td>
            </q-tr>
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'username', align: 'left', label: 'Username', field: 'username', sortable: true },
        { name: 'namaLengkap', align: 'left', label: 'Nama Lengkap', field: 'namaLengkap', sortable: true },
        { name: 'email', align: 'left', label: 'Email', field: 'email' }
      ],

      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('user/find')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left {
  width: 3px;
  height: 100%;
  background-color: rgb(131, 198, 224);
}
</style>
