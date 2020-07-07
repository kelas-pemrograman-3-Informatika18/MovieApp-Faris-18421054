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
              <div class="text-h6">Edit DVD</div>
              input dvd yang baru
            </q-banner>
          </div>
        </div>
      </div>
    </div>
    <q-card flat>
      <q-card-section class="row">
        <q-form
          @submit="onSubmit()"
          class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
        >
          <q-input
            filled
            v-model="form.judulfilm"
            label="Title *"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="form.harga"
            type="number"
            label="Product Price *"
            :rules="[ val => val > 0 || 'Please insert price']"
          />

          <q-input
            filled
            v-model="form.tahun"
            label="Release Date *"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-select filled v-model="form.genre" :options="option" label="Pilih Genre" />

          <div class="flex q-gutter-md">
            <div class="items-center">Rate the product</div>
            <q-rating
              v-model="form.rating"
              size="2em"
              :max="5"
              color="blue"
            />
          </div>

          <q-input v-model="form.deskripsi" filled type="textarea" label="Description"/>

          <q-file accept=".jpg, image/*" color="blue" filled v-model="image" label="Upload Image">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
          </q-file>

          <div>
            <q-btn label="Submit" type="submit" color="blue-grey-13"/>
            <q-btn label="Reset" type="reset" color="blue-grey-13" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        judulfilm: null,
        harga: 0,
        tahun: null,
        genre: null,
        rating: 0,
        deskripsi: null
      },
      option: [
        'Action',
        'Romance',
        'Comedy',
        'Slice of Life',
        'Fantasy'
      ],
      image: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get(`movie/getbyid/${this.$route.params.id}`)
        .then(res => {
          if (res.data.sukses) {
            this.form = res.data.data
          } else {
            this.$showNotif(res.data.pesan, 'negative')
            this.$router.push({ name: 'datadvd' })
          }
        })
    },
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.put(`movie/edit/${this.$route.params.id}`, formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'datadvd' })
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
