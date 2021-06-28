<template>
  <div>
    <b-button type="button" variant="primary" @click="$router.back()">
      <font-awesome-icon icon="arrow-left" />
      Kembali
    </b-button>

    <div class="mt-2">
      <h3>Tambah Carousel</h3>
      <hr class="border-dark" />
    </div>

    <form id="carousel-form" @submit.prevent="formSubmit()">
      <div class="form-group">
        <label>Nama Gambar</label>
        <input
          type="text"
          class="form-control"
          v-model="carousel_name"
          required
        />
      </div>

      <div class="form-group">
        <label>Deskripsi Singkat Gambar</label>
        <input type="text" class="form-control" v-model="carousel_desc" />
      </div>

      <div class="form-group">
        <label for="input-image">Unggah Gambar</label>
        <br />
        <img
          class="img-fluid mb-2"
          :src="picture.url"
          style="max-width: 300px; max-height: 200px"
          data-action="zoom"
        />

        <b-form-file
          id="input-image"
          ref="image"
          v-model="picture.value"
          placeholder="Pilih brosur atau letakkan di sini"
          drop-placeholder="Letakkan file di sini"
          accept=".jpg, .jpeg, .png"
          browse-text="Telusuri"
          @input="handleImageBeforeUpload()"
          no-traverse
          required
        ></b-form-file>
      </div>

      <b-button type="submit" variant="success">
        <font-awesome-icon icon="save" />
      </b-button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: this.$config.baseurl,
      carousel_name: '',
      carousel_desc: '',
      picture: {
        url:
          'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
        max: 5242880,
        type: ['image/jpg', 'image/jpeg', 'image/png'],
        value: null,
      },
    }
  },
  mounted() {
    this.formValidation('carousel-form')
  },
  methods: {
    async formSubmit() {
      try {
        $.LoadingOverlay('show')
        const formData = new FormData()
        const validate = this.formValidation('carousel-form').validate()

        if (!validate) {
          return
        }

        formData.append('carousel_name', this.carousel_name)
        formData.append('carousel_description', this.carousel_desc)
        formData.append('image', this.picture.value)

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/carousel`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/carousel`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }
        const res = await this.$axios.$post(url, formData, config)
        console.log(res)

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil disimpan',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Gagal disimpan',
          text: error,
        })
      }
    },
    formValidation(form_id) {
      var form = document.getElementById(form_id)
      var config = {
        classTo: 'form-group',
        errorClass: 'text-danger',
        successClass: 'text-success',
        errorTextParent: 'form-group',
        errorTextTag: 'div',
        errorTextClass: 'help-text',
      }
      var pristine = new Pristine(form, config)
      return pristine
    },
    handleImageBeforeUpload() {
      console.log(this.picture.value)

      this.picture.url =
        'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
      if (this.picture.value != null) {
        this.picture.url = URL.createObjectURL(this.picture.value)

        if (this.picture.value.size >= this.picture.max) {
          this.$refs.image.reset()
          this.picture.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar tidak boleh melebihi dari 5 MB',
          })
        }

        if (!this.picture.type.includes(this.picture.value.type)) {
          this.$refs.image.reset()
          this.picture.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar yang diupload harus jpeg, jpg, dan png',
          })
        }
      }
    },
  },
}
</script>
