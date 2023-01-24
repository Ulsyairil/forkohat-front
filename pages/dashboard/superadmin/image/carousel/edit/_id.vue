<template>
  <v-container>
    <div v-if="$fetchState.pending">Memuat...</div>
    <div v-else>
      <v-row>
        <v-col cols="12" sm="1" md="1" lg="1" xl="1">
          <v-btn
            class="align-self-center"
            color="primary"
            @click="$router.go(-1)"
            text
          >
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="12" sm="11" md="11" lg="11" xl="11">
          <span class="display-1 font-weight-bold">Ubah Carousel</span>
        </v-col>
      </v-row>

      <v-form ref="form" class="mt-5" lazy-validation>
        <div class="mb-5">
          <v-img
            :src="`${serverBaseUrl()}${data.image_url}`"
            max-height="240"
            max-width="320"
          ></v-img>
        </div>

        <v-file-input
          v-model="image"
          ref="image_input"
          accept="image/png, image/jpeg"
          label="Upload Gambar Carousel"
          prepend-icon="add_a_photo"
          :rules="[rules.maxUpload]"
          clearable
          outlined
        ></v-file-input>
        <v-text-field
          v-model="title"
          label="Judul Carousel"
          :rules="[rules.maxText]"
          outlined
        ></v-text-field>
        <v-textarea
          v-model="description"
          label="Deskripsi"
          outlined
        ></v-textarea>
        <v-checkbox v-model="showed" label="Tampilkan"></v-checkbox>
        <v-btn class="mt-5" type="button" color="primary" @click="submit">
          Simpan
        </v-btn>
      </v-form>
    </div>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'dashboard',
  middleware: ['superadmin'],
  title: `Ubah Carousel - ${this.$route.params.id}`,
  data() {
    return {
      data: {},
      image: null,
      title: '',
      description: '',
      showed: false,
      rules: {
        required: (v) => !!v || 'Harus Diisi',
        maxUpload: (v) =>
          !v || v.size < 5242880 || 'Ukuran File Gambar Harus Kurang Dari 5MB',
        maxText: (v) => !v || v.length <= 254 || 'Maksimal 254 Karakter',
      },
    }
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    async submit() {
      let payload = {
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        showed: this.showed,
        image: this.image,
      }

      const validate = this.$refs.form.validate()

      if (validate) {
        const response = await this.$store.dispatch(
          'superadmin/carousel/edit',
          payload
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data Berhasil Disimpan',
              confirmButtonText: 'Kembali',
              confirmButtonColor: 'red',
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              title: 'Kesalahan Pada Server',
              titleText: response.data.message,
              confirmButtonText: 'Kembali',
              confirmButtonColor: 'red',
            })
            break
        }
      }
    },
  },
  async fetch() {
    const response = await this.$store.dispatch(
      'superadmin/carousel/get',
      this.$route.params.id
    )

    console.log(response)

    switch (response.status) {
      case 200:
        this.data = response.data
        this.title = response.data.title
        this.description = response.data.description
        this.showed = response.data.showed
        break

      default:
        this.$nuxt.error({ statusCode: response.status })
        break
    }
  },
  mounted() {},
}
</script>
