<template>
  <div class="container">
    <nav>
      <ul class="breadcrumb text-text-white-50">
        <li class="breadcrumb-item">
          <a href="/dashboard">Beranda</a>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard/berita">Berita</NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Ubah</a>
        </li>
      </ul>
    </nav>

    <div class="mt-2 d-flex">
      <a
        href="javascript:void(0)"
        class="align-self-center mr-2"
        @click="previousPage()"
      >
        <em class="icon ni ni-chevron-left-circle" style="font-size: 30px"></em>
      </a>
      <h3 class="text-black-50">Ubah Berita</h3>
    </div>

    <hr class="divider" />

    <img
      src="https://via.placeholder.com/150"
      alt="current-event-picture"
      class="rounded mb-2 zoom"
      style="height: auto; max-width: 300px !important"
    />

    <form id="add-arrangement-form" @submit.prevent="submitForm()">
      <div class="form-group">
        <label class="form-label" for="title">
          Judul Berita
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <input
            type="text"
            class="form-control"
            id="title"
            maxlength="254"
            required
            data-pristine-required-message="Nama Tatanan Harus Diisi"
            data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
          />
        </div>
      </div>

      <div class="mb-2">
        <label class="form-label">
          Tajuk Berita
          <span class="text-danger">*</span>
        </label>
        <div id="description-editor" class="bg-white"></div>
      </div>

      <img
        :src="form.previewImage"
        alt="arrangement-picture"
        class="rounded zoom"
        style="height: auto; max-width: 300px !important"
        data-zoomable
      />

      <button type="button" class="btn btn-primary ml-4" @click="deleteImage()">
        Hapus Gambar
      </button>

      <div class="form-group mt-3">
        <label class="form-label" for="upload-image">
          Unggah Gambar Berita
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <div class="custom-file" style="z-index: 0">
            <input
              type="file"
              class="custom-file-input"
              id="upload-image"
              accept="image/png, image/jpeg"
              @change="uploadImage($event)"
              required
              data-pristine-required-message="Gambar Harus Diunggah"
            />
            <label class="custom-file-label" for="upload-image">
              Unggah Gambar
            </label>
          </div>
        </div>
        <div class="text-danger help-text">{{ form.imageError }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>

<script>
import Validation from '../../../helpers/form-validation'

let quill = null
export default {
  layout: 'dashboard',
  head: {
    title: 'Buat Tatanan | Dasbor',
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        image: null,
        previewImage: 'https://via.placeholder.com/150',
        imageError: '',
      },
    }
  },
  mounted() {
    Validation('add-arrangement-form')

    // Init quill editor
    quill = new Quill('#description-editor', {
      theme: 'snow',
    })
  },
  methods: {
    previousPage() {
      this.$router.go(-1)
    },
    deleteImage() {
      this.form.imageError = ''
      this.form.image = null
      this.form.previewImage = 'https://via.placeholder.com/150'
    },
    uploadImage(event) {
      const file = event.target.files[0]
      if (file != undefined) {
        if (file.type != 'image/png' && file.type != 'image/jpeg') {
          this.deleteImage()
          return (this.form.imageError = 'Tipe Gambar Harus PNG, atau JPG')
        }

        if (file.size > 2097152) {
          this.deleteImage()
          return (this.form.imageError = 'Gambar Tidak Boleh Lebih Dari 2 MB')
        }

        this.form.imageError = ''
        this.form.image = file
        this.form.previewImage = URL.createObjectURL(file)
      }

      if (file === undefined) {
        this.deleteImage()
      }
    },
    async submitForm() {
      console.log(this.form)
      const validate = Validation('add-arrangement-form').validate()

      if (!validate) {
        return
      }
    },
  },
}
</script>