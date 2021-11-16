<template>
  <div class="container">
    <nav>
      <ul class="breadcrumb text-text-white-50">
        <li class="breadcrumb-item">
          <a href="/dashboard">Beranda</a>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard/program">Program</NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Tambah</a>
        </li>
      </ul>
    </nav>

    <div class="mt-2">
      <h3 class="text-black-50">Tambah Program</h3>
    </div>

    <hr class="divider" />

    <form id="add-program-form" @submit.prevent="submitForm()">
      <div class="form-group">
        <label class="form-label" for="title">
          Nama Program
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <input
            type="text"
            class="form-control"
            id="title"
            maxlength="254"
            required
            data-pristine-required-message="Nama Program Harus Diisi"
            data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="description">
          Deskripsi Singkat Program
        </label>
        <div class="form-control-wrap">
          <textarea class="form-control" id="description"></textarea>
        </div>
      </div>

      <img
        :src="form.previewImage"
        alt="program-picture"
        class="rounded"
        style="height: auto; max-width: 300px !important"
      />

      <button type="button" class="btn btn-primary ml-4" @click="deleteImage()">
        Hapus Gambar
      </button>

      <div class="form-group mt-3">
        <label class="form-label" for="upload-image">
          Unggah Logo Program
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <div class="custom-file">
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
              Unggah Logo
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

export default {
  layout: 'dashboard',
  head: {
    title: 'Buat Program | Dashbor Balikpapan',
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
    Validation('add-program-form')
  },
  methods: {
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
      const validate = Validation('add-program-form').validate()

      if (!validate) {
        return
      }
    },
  },
}
</script>