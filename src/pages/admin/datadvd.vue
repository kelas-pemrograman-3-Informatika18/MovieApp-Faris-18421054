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
              <div class="text-h6">Daftar Data DVD</div>
              kumpulan data dvd yang telah terdaftar
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-table
          title="list"
          :data="data"
          flat
          :columns="columns"
          row-key="name"
      >
        <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="judulfilm" :props="props">
                {{ props.row.judulfilm }}
              </q-td>
              <q-td key="harga" :props="props">
                <q-badge color="green">
                  {{ props.row.harga }}
                </q-badge>
              </q-td>
              <q-td key="tahun" :props="props">
                <q-badge color="purple">
                  {{ props.row.tahun }}
                </q-badge>
              </q-td>
              <q-td key="genre" :props="props">
                <q-badge color="orange">
                  {{ props.row.genre }}
                </q-badge>
              </q-td>
              <q-td key="rating" :props="props">
                <q-badge color="primary">
                  {{ props.row.rating }}
                </q-badge>
              </q-td>
              <q-td key="deskripsi" :props="props">
                <div class="ellipsis" style="max-width: 100px;">
                  {{ props.row.deskripsi }}
                </div>
              </q-td>
              <q-td key="gambar" :props="props">
                <q-img
                  :src="`${$baseImageURL}/${props.row.image}`"
                  spinner-color="white"
                />
              </q-td>
              <q-td key="aksi" :props="props">
                <div class="row q-gutter-md">
                  <q-btn label="edit" size="sm" icon="edit" :to="{ name: 'editdvd', params: { id: props.row._id } }" color="orange-6" unelevated />
                  <q-btn label="delete" size="sm" icon="delete" color="negative" unelevated @click="deleteMovie(props.row._id)" />
                </div>
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
        { name: 'tahun', align: 'center', label: 'Tahun', field: 'tahun', sortable: true },
        { name: 'genre', align: 'center', label: 'Genre', field: 'genre', sortable: true },
        { name: 'rating', align: 'center', label: 'Rating', field: 'rating', sortable: true },
        { name: 'deskripsi', align: 'center', label: 'Deskripsi', field: 'deskripsi' },
        { name: 'gambar', align: 'center', label: 'Gambar', field: 'gambar' },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],

      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('movie/getall')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteMovie (id) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'this is a permanent delete, are you sure?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.delete(`movie/delete/${id}`)
          .then(res => {
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
