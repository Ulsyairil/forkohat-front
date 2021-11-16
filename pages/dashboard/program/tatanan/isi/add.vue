<template>
  <div class="container">
    <nav>
      <ul class="breadcrumb text-text-white-50">
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard">Beranda</NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink to="/dashboard/program">Program</NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink
            :to="`/dashboard/program/tatanan?program_id=${this.$route.query.program_id}`"
          >
            Tatanan
          </NuxtLink>
        </li>
        <li class="breadcrumb-item">
          <NuxtLink
            :to="`/dashboard/program/tatanan/isi?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}`"
          >
            Isi Tatanan
          </NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Buat</a>
        </li>
      </ul>
    </nav>

    <div class="mt-2">
      <h3 class="text-black-50">Buat Isi Tatanan</h3>
    </div>

    <hr class="divider" />

    <form id="add-arrangement-item-form" @submit.prevent="submitForm()">
      <div class="form-group">
        <label class="form-label" for="title">
          Nama Berkas
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <input
            type="text"
            class="form-control"
            id="title"
            maxlength="254"
            required
            data-pristine-required-message="Nama Berkas Harus Diisi"
            data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
          />
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="description">
          Deskripsi Singkat Berkas
        </label>
        <div class="form-control-wrap">
          <textarea class="form-control" id="description"></textarea>
        </div>
      </div>

      <div class="form-group mt-3">
        <label class="form-label" for="upload-file">
          Unggah Berkas
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <div class="custom-file">
            <input
              type="file"
              class="custom-file-input"
              id="upload-file"
              accept="application/pdf"
              @change="uploadFile($event)"
              required
              data-pristine-required-message="Berkas Harus Diunggah"
            />
            <label class="custom-file-label" for="upload-file">
              Unggah Berkas
            </label>
          </div>
        </div>
        <div class="text-danger help-text">{{ form.fileError }}</div>
      </div>

      <div class="form-group">
        <label class="form-label" for="showed">
          Ditunjukkan
          <span class="text-danger">*</span>
        </label>
        <select class="form-control" id="showed" v-model="form.showed.selected">
          <option
            v-for="option in form.showed.options"
            :key="option"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>

<script>
import Validation from '../../../../../helpers/form-validation'

export default {
  layout: 'dashboard',
  head: {
    title: 'Buat Isi Tatanan | Dashbor Balikpapan',
  },
  data() {
    return {
      form: {
        title: '',
        description: '',
        file: null,
        fileError: '',
        showed: {
          selected: 'public',
          options: [
            {
              value: 'public',
              text: 'Publik',
            },
            {
              value: 'member',
              text: 'Member',
            },
            {
              value: 'private',
              text: 'Privat',
            },
          ],
        },
      },
    }
  },
  mounted() {
    Validation('add-arrangement-item-form')
  },
  methods: {
    deleteFile() {
      this.form.fileError = ''
      this.form.file = null
    },
    uploadFile(event) {
      const file = event.target.files[0]
      if (file != undefined) {
        if (file.type != 'application/pdf') {
          this.deleteFile()
          return (this.form.fileError = 'Tipe File Harus PDF')
        }

        if (file.size > 10485760) {
          this.deleteFile()
          return (this.form.fileError = 'File Tidak Boleh Lebih Dari 10 MB')
        }

        this.form.fileError = ''
        this.form.file = file
      }

      if (file === undefined) {
        this.deleteFile()
      }
    },
    async submitForm() {
      console.log(this.form)
      const validate = Validation('add-arrangement-item-form').validate()

      if (!validate) {
        return
      }
    },
  },
}
</script>