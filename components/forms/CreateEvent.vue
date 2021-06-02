<template>
  <div>
    <b-form id="event-create-form" @submit.prevent="formSubmit()">
      <b-form-group label="Nama Event" label-for="input-name">
        <b-form-input
          v-model="form.name"
          id="input-name"
          type="text"
          placeholder="Masukkan nama event"
          required
        ></b-form-input>
      </b-form-group>
      <div class="form-group">
        <label>Konten</label>
        <vue-editor
          v-model="form.content"
          :editor-toolbar="editor.customToolbar"
        />
      </div>
      <b-row>
        <b-col>
          <div class="form-group">
            <label for="input-registration">Tanggal Registrasi</label>
            <b-form-datepicker
              id="input-registration"
              v-model="form.registration"
              locale="id"
            ></b-form-datepicker>
          </div>
        </b-col>
        <b-col>
          <div class="form-group">
            <label for="input-expired">Tanggal Berakhir</label>
            <b-form-datepicker
              id="input-expired"
              v-model="form.expired"
              locale="id"
            ></b-form-datepicker>
          </div>
        </b-col>
      </b-row>
      <div class="form-group">
        <label for="input-image">Unggah Brosur Event</label>
        <br />
        <img
          class="img-fluid mb-2 event-image"
          :src="form.image.url"
          data-action="zoom"
        />
        <b-form-file
          id="input-image"
          ref="image"
          v-model="form.image.value"
          placeholder="Pilih brosur atau letakkan di sini"
          drop-placeholder="Letakkan file di sini"
          accept=".jpg, .jpeg, .png"
          browse-text="Telusuri"
          @input="handleImageBeforeUpload"
          no-traverse
          required
        ></b-form-file>
      </div>
      <div class="form-group">
        <label for="input-image">Unggah Berkas Pendukung</label>
        <b-form-file
          id="file-image"
          ref="file"
          v-model="form.file.value"
          placeholder="Pilih berkas atau letakkan di sini"
          drop-placeholder="Letakkan file di sini"
          browse-text="Telusuri"
          @input="handleFileBeforeUpload()"
          :file-name-formatter="formatNames"
          no-traverse
          multiple
        >
        </b-form-file>
      </div>
      <div v-for="(file, index) in form.file.value" :key="index">
        <div class="row">
          <div class="col-2 align-self-center text-center">
            <div v-if="file.type == 'image/png'">
              <img
                class="img-fluid mb-2 file-image"
                :src="filesURL(file)"
                alt="file_image"
                data-action="zoom"
              />
            </div>
            <div v-else-if="file.type == 'image/jpeg'">
              <img
                class="img-fluid mb-2 file-image"
                :src="filesURL(file)"
                alt="file_image"
                data-action="zoom"
              />
            </div>
            <div v-else>
              <font-awesome-icon icon="file" size="2x" />
            </div>
          </div>
          <div class="col-6 align-self-center">
            <div class="title font-weight-bold">
              {{ file.name }}
            </div>
            <div>
              size: {{ convertFileSize(file.size) }}, type: {{ file.type }}
            </div>
          </div>
          <div class="col-4 align-self-center">
            <a
              href="javascript:void(0)"
              class="text-danger"
              @click="deleteFile(index)"
            >
              <font-awesome-icon icon="trash" size="lg" />
            </a>
          </div>
        </div>
      </div>
      <b-button class="mt-3" type="submit" variant="primary">Tambah</b-button>
    </b-form>
  </div>
</template>

<style lang="scss">
.event-image {
  max-width: 300px;
  max-height: 200px;
}

.file-image {
  max-width: 100px;
  max-height: 50px;
}
</style>

<script>
import Swal from 'sweetalert2'
import filesize from 'filesize'

export default {
  data() {
    return {
      auth: {
        token: this.$auth.$storage.getCookie('token'),
        user: this.$auth.$storage.getCookie('user'),
      },
      baseurl: this.$config.baseurl,
      editor: {
        customToolbar: [
          [{ header: [false, 1, 2, 3, 4, 5, 6] }],
          ['bold', 'italic', 'underline', 'strike'],
          [
            { align: '' },
            { align: 'center' },
            { align: 'right' },
            { align: 'justify' },
          ],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ color: [] }, { background: [] }],
          [{ direction: 'rtl' }],
          ['clean'],
        ],
      },
      form: {
        name: '',
        content: '',
        registration: '',
        expired: '',
        image: {
          url:
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
          max: 5242880,
          type: ['image/jpg', 'image/jpeg', 'image/png'],
          value: null,
        },
        file: {
          max: 2097152,
          value: [],
        },
      },
    }
  },
  mounted() {
    this.formValidation('event-create-form')
  },
  methods: {
    resetForm() {
      this.form.name = ''
      this.form.content = ''
      this.form.registration = ''
      this.form.expired = ''
      this.form.image.url =
        'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
      this.$refs.image.reset()
      this.$refs.file.reset()
    },
    async formSubmit() {
      try {
        $.LoadingOverlay('show')
        const formData = new FormData()
        let validate = this.formValidation('event-create-form').validate()

        if (!validate) {
          return
        }

        if (this.form.registration == '') {
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Tanggal registrasi harus diisi',
          })
        }

        if (this.form.expired == '') {
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Tanggal berakhir harus diisi',
          })
        }

        if (this.form.content == '') {
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Konten harus diisi',
          })
        }

        formData.append('name', this.form.name)
        formData.append('content', this.form.content)
        formData.append('registration_date', this.form.registration)
        formData.append('expired_date', this.form.expired)
        formData.append('image', this.form.image.value)

        for (let index = 0; index < this.form.file.value.length; index++) {
          formData.append(`files[${index}]`, this.form.file.value[index])
        }

        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/event`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/event`
        } else {
          url = `${this.baseurl}/employee/event`
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
      console.log(this.form.image.value)

      this.form.image.url =
        'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
      if (this.form.image.value != null) {
        this.form.image.url = URL.createObjectURL(this.form.image.value)

        if (this.form.image.value.size >= this.form.image.max) {
          this.$refs.image.reset()
          this.form.image.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar tidak boleh melebihi dari 5 MB',
          })
        }

        if (!this.form.image.type.includes(this.form.image.value.type)) {
          this.$refs.image.reset()
          this.form.image.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar yang diupload harus jpeg, jpg, dan png',
          })
        }
      }
    },
    formatNames(files) {
      if (files.length === 1) {
        return files[0].name
      } else {
        return `${files.length} berkas terpilih`
      }
    },
    filesURL(file) {
      return URL.createObjectURL(file)
    },
    convertFileSize(size) {
      return filesize(size)
    },
    deleteFile(index) {
      this.form.file.value.splice(index, 1)
    },
    handleFileBeforeUpload() {
      console.log(this.form.file.value.length)
      if (this.form.file.value.length != 0) {
        this.form.file.value.forEach((value) => {
          if (value.size >= this.form.file.max) {
            this.$refs.file.reset()
            return Swal.fire({
              icon: 'warning',
              title: 'Peringatan',
              text: 'File yang diupload tidak boleh melebihi dari 2 MB',
            })
          }
        })
      }
    },
  },
}
</script>
