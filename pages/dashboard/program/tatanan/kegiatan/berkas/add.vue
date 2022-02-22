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
        <li class="breadcrumb-item">
          <NuxtLink
            :to="`/dashboard/program/tatanan/kegiatan/berkas?program_id=${this.$route.query.program_id}&tatanan_id=${this.$route.query.tatanan_id}&kegiatan_id=${this.$route.query.kegiatan_id}`"
          >
            Berkas
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
      <h3 class="text-black-50">Tambah Berkas / Gambar</h3>
    </div>

    <hr class="divider" />

    <form id="add-event-files-form" @submit.prevent="submitForm()">
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
import Validation from '../../../../../../helpers/form-validation'

export default {
  layout: 'dashboard',
  head: {
    title: 'Tambah Berkas / Gambar Kegiatan | Dasbor',
  },
  data() {
    return {
      fileRecords: [],
      fileRecordsForUpload: [], // pertahankan antrian unggah
    }
  },
  mounted() {
    Validation('add-event-files-form')
  },
  methods: {
    previousPage() {
      this.$router.go(-1)
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
      const validate = Validation('add-event-files-form').validate()

      console.log(this.fileRecords)
      console.log(this.fileRecordsForUpload)

      if (!validate) {
        return
      }
    },
  },
}
</script>