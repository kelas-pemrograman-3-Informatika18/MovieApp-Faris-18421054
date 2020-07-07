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
              <div class="text-h6">Data Transaksi Pembelian</div>
              detail data transaksi anda
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
              <q-td key="judulfilm" :props="props">
                {{ props.row.dataMovie[0].judulfilm }}
              </q-td>
              <q-td key="harga" :props="props">
                {{ props.row.harga }}
              </q-td>
              <q-td key="jumlah" :props="props">
                {{ props.row.jumlah }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="orange" class="q-pa-sm">
                  Unconfirmed
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="brown" class="q-pa-sm">
                  On Way
                </q-badge>
                <q-badge v-else color="green" class="q-pa-sm">
                  Arrived
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn label="Accepted" :disable="props.row.status !== 2" @click="konfirmasi(props.row._id)" class="q-ml-md" unelevated color="green-4"/>
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
        { name: 'judulfilm', align: 'center', label: 'Judul Film', field: 'judulfilm', sortable: true },
        { name: 'harga', align: 'center', label: 'Harga', field: 'harga', sortable: true },
        { name: 'jumlah', align: 'center', label: 'Jumlah Beli', field: 'jumlah', sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`order/getorder/${this.$q.localStorage.getItem('dataUser')._id}`)
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    konfirmasi (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Are you sure your order has arrive?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put(`order/terima/${id}`)
          .then((res) => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
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
