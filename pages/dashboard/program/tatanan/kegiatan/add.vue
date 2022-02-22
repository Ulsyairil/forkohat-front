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
            :to="`/dashboard/program/tatanan/kegiatan?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}`"
          >
            Kegiatan
          </NuxtLink>
        </li>
        <li class="breadcrumb-item active">
          <a href="javascript:void(0)">Tambah</a>
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
      <h3 class="text-black-50">Tambah Kegiatan</h3>
    </div>

    <hr class="divider" />

    <form id="add-event-form" @submit.prevent="submitForm()">
      <div class="form-group">
        <label class="form-label" for="title">
          Nama Kegiatan
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <input
            type="text"
            class="form-control"
            id="title"
            maxlength="254"
            required
            data-pristine-required-message="Nama Kegiatan Harus Diisi"
            data-pristine-maxlength-message="Tidak Boleh Lebih Dari 254 Karakter"
            v-model="form.title"
          />
        </div>
      </div>

      <div class="mb-2">
        <label class="form-label">
          Deskripsi Kegiatan
          <span class="text-danger">*</span>
        </label>
        <div id="description-editor" class="bg-white"></div>
      </div>

      <div class="form-group">
        <label class="form-label">Tanggal Registrasi</label>
        <div class="form-control-wrap">
          <div class="input-daterange date-picker-range input-group">
            <input
              type="text"
              class="form-control bg-white"
              id="registration_date"
              v-model="form.registration_date"
              readonly
            />
            <div class="input-group-addon text-black">Sampai</div>
            <input
              type="text"
              class="form-control bg-white"
              id="end_registration_date"
              v-model="form.end_registration_date"
              readonly
            />
          </div>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label" for="url-registration">
          URL Registrasi
        </label>
        <div class="form-control-wrap">
          <input
            type="url"
            class="form-control"
            id="url-registration"
            v-model="form.url_registration"
          />
        </div>
      </div>

      <img
        :src="form.previewImage"
        alt="arrangement-picture"
        class="rounded zoom"
        style="height: auto; max-width: 300px !important"
      />

      <button type="button" class="btn btn-primary ml-4" @click="deleteImage()">
        Hapus Gambar
      </button>

      <div class="form-group mt-3">
        <label class="form-label" for="upload-image">
          Unggah Gambar Kegiatan
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

      <div class="form-group">
        <label class="form-label" for="showed">
          Ditunjukkan
          <span class="text-danger">*</span>
        </label>
        <select class="form-control" id="showed" v-model="form.showed.selected">
          <option
            v-for="(option, index) in form.showed.options"
            :key="index"
            :value="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">
          Kegiatan Berakhir
          <span class="text-danger">*</span>
        </label>
        <div class="form-control-wrap">
          <input
            type="text"
            class="form-control date-picker bg-white"
            data-date-format="yyyy/mm/dd"
            id="end_date"
            required
            data-pristine-required-message="Kegiatan Berakhir Harus Diisi"
            readonly
            v-model="form.end_date"
          />
        </div>
        <div class="form-note">Format Tanggal <code>yyyy/mm/dd"</code></div>
      </div>

      <div class="form-group">
        <label class="form-label" for="showed">
          Unggah Berkas / Gambar Kegiatan
        </label>
        <VueFileAgent
          ref="vueFileAgent"
          class="mb-2"
          :theme="'list'"
          :multiple="true"
          :deletable="true"
          :meta="true"
          :accept="'.png,.jpg,.pdf'"
          :maxSize="'10MB'"
          :maxFiles="10"
          :helpText="'Unggah JPG, PNG atau PDF'"
          :errorText="{
            type: 'Jenis berkas tidak valid. Hanya JPG, PNG, dan PDF yang Diizinkan',
            size: 'Berkas tidak boleh lebih dari 10 MB',
          }"
          @select="filesSelected($event)"
          @beforedelete="onBeforeDelete($event)"
          @delete="fileDeleted($event)"
          v-model="fileRecords"
        ></VueFileAgent>
      </div>

      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>

<script>
import Validation from '../../../../../helpers/form-validation'

let quill = null
export default {
  layout: 'dashboard',
  head: {
    title: 'Buat Kegiatan | Dasbor',
  },
  data() {
    return {
      form: {
        title: '',
        registration_date: '',
        end_registration_date: '',
        url_registration: '',
        image: null,
        previewImage: 'https://via.placeholder.com/150',
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
          ],
        },
        end_date: '',
      },
      fileRecords: [],
      fileRecordsForUpload: [], // pertahankan antrian unggah
    }
  },
  mounted() {
    // Validating Form
    Validation('add-event-form')

    // Init date
    $('#registration_date').datepicker({
      clearBtn: true,
    })
    $('#end_registration_date').datepicker({
      clearBtn: true,
    })
    $('#end_date').datepicker({
      clearBtn: true,
    })

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

    // Example for multi upload using file-agent
    uploadFiles: function () {
      this.$refs.vueFileAgent.upload(
        this.uploadUrl,
        this.uploadHeaders,
        this.fileRecordsForUpload
      )
      this.fileRecordsForUpload = []
    },
    deleteUploadedFile: function (fileRecord) {
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      )
    },
    filesSelected: function (fileRecordsNewlySelected) {
      var validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      )
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords)
    },
    onBeforeDelete: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
        var k = this.fileRecords.indexOf(fileRecord)
        if (k !== -1) this.fileRecords.splice(k, 1)
      } else {
        if (confirm('Are you sure you want to delete?')) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord)
        }
      }
    },
    fileDeleted: function (fileRecord) {
      var i = this.fileRecordsForUpload.indexOf(fileRecord)
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1)
      } else {
        this.deleteUploadedFile(fileRecord)
      }
    },
    // End for using file-agent

    async submitForm() {
      const validate = Validation('add-event-form').validate()

      console.log(quill.getContents())
      console.log(this.fileRecords)
      console.log(this.fileRecordsForUpload)

      if (!validate) {
        return
      }
    },
  },
}
</script>