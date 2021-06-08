<template>
  <div>
    <b-form id="news-create-form" @submit.prevent="formSubmit()">
      <b-row>
        <b-col md="6">
          <img
            class="img-fluid mb-2 banner-image"
            :src="form.image.current_url"
            data-action="zoom"
          />
        </b-col>
        <b-col md="6" class="mt-4 mt-md-0">
          <div v-if="form.file.current_value.length > 0">
            <label>Berkas pendukung</label>
          </div>
          <div class="container file-container">
            <b-row v-if="form.file.current_value.length > 0">
              <div
                class="col-3 col-md-3 col-lg-3 text-center position-relative file-hover m-2"
                v-for="(value, index) in form.file.current_value"
                :key="index"
              >
                <div v-if="value.mime == 'jpeg'">
                  <a
                    class="file-close text-danger"
                    href="javascript:void(0)"
                    @click="destroyFile(value.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </a>
                  <img
                    class="img-fluid mb-2 file-image"
                    :src="getImageURL(value.url)"
                    alt="file_image"
                    data-action="zoom"
                  />
                  <br />
                  <a
                    href="javascript:void(0)"
                    @click="getFile(value.url)"
                    class="text-break"
                  >
                    {{ value.name }}
                  </a>
                </div>
                <div v-else-if="value.mime == 'jpg'">
                  <a
                    class="file-close text-danger"
                    href="javascript:void(0)"
                    @click="destroyFile(value.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </a>
                  <img
                    class="img-fluid mb-2 file-image"
                    :src="getImageURL(value.url)"
                    alt="file_image"
                    data-action="zoom"
                  />
                  <br />
                  <a
                    href="javascript:void(0)"
                    @click="getFile(value.url)"
                    class="text-break"
                  >
                    {{ value.name }}
                  </a>
                </div>
                <div v-else-if="value.mime == 'png'">
                  <a
                    class="file-close text-danger"
                    href="javascript:void(0)"
                    @click="destroyFile(value.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </a>
                  <img
                    class="img-fluid mb-2 file-image"
                    :src="getImageURL(value.url)"
                    alt="file_image"
                    data-action="zoom"
                  />
                  <br />
                  <a
                    href="javascript:void(0)"
                    @click="getFile(value.url)"
                    class="text-break"
                  >
                    {{ value.name }}
                  </a>
                </div>
                <div v-else>
                  <a
                    class="file-close text-danger"
                    href="javascript:void(0)"
                    @click="destroyFile(value.id)"
                  >
                    <font-awesome-icon icon="trash" />
                  </a>
                  <font-awesome-icon icon="file" size="2x" />
                  <br />
                  <a
                    @click="getFile(value.url)"
                    class="text-break"
                    target="__blank"
                  >
                    {{ value.name }}
                  </a>
                </div>
              </div>
            </b-row>
          </div>
        </b-col>
      </b-row>
      <b-form-group label="Judul berita" label-for="input-title">
        <b-form-input
          v-model="form.title"
          id="input-title"
          type="text"
          placeholder="Masukkan judul berita"
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
      <div class="form-group">
        <label for="input-image">Unggah Tajuk Berita</label>
        <br />
        <img
          class="img-fluid mb-2 news-image"
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
          accept=".jpg, .jpeg, .png"
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
            <div class="title font-weight-bold text-break">
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
      <div class="form-group">
        <label for="input-deleted_at">Tanggal Dihapus</label>
        <b-form-datepicker
          id="input-deleted_at"
          v-model="form.deleted_at"
          locale="id"
          placeholder="-"
          disabled
        ></b-form-datepicker>
      </div>
      <b-button
        class="mt-3"
        type="submit"
        variant="success"
        v-b-tooltip.hover
        title="Simpan"
      >
        <font-awesome-icon icon="save" />
      </b-button>
      <b-button
        class="mt-3"
        type="button"
        variant="warning"
        v-b-tooltip.hover
        title="Hapus"
        v-if="form.deleted_at == null"
        @click="dumpNews(form.id)"
      >
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button
        class="mt-3"
        type="button"
        variant="primary"
        v-b-tooltip.hover
        title="Pulihkan"
        v-if="form.deleted_at != null"
        @click="restoreNews(form.id)"
      >
        <font-awesome-icon icon="trash-restore" />
      </b-button>
      <b-button
        class="mt-3"
        type="button"
        variant="danger"
        v-b-tooltip.hover
        title="Hapus Permanen"
        @click="deleteNews(form.id)"
      >
        <font-awesome-icon icon="ban" />
      </b-button>
    </b-form>
  </div>
</template>

<style lang="scss">
.banner-image {
  max-width: 300px;
  max-height: 300px;
  padding: 5px auto;
}

.news-image {
  max-width: 300px;
  max-height: 200px;
}

.file-image {
  max-width: 80px;
  max-height: 40px;
}

.file-container {
  overflow-y: auto;
  max-height: 300px;
}

.file-close {
  position: absolute;
  top: -5px;
  right: 2px;
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
      domain: this.$config.domain,
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
        id: '',
        title: '',
        content: '',
        image: {
          url: '/images/image_not_uploaded.gif',
          current_url: '',
          max: 5242880,
          type: ['image/jpg', 'image/jpeg', 'image/png'],
          value: null,
        },
        file: {
          max: 2097152,
          type: ['image/jpg', 'image/jpeg', 'image/png'],
          value: [],
          current_value: [],
        },
        deleted_at: '',
      },
    }
  },
  async fetch() {
    try {
      let url
      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl}/superadmin/news?id=${this.$route.params.id}`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl}/admin/news?id=${this.$route.params.id}`
      } else {
        url = `${this.baseurl}/employee/news?id=${this.$route.params.id}`
      }

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      const res = await this.$axios.$get(url, config)
      console.log(res)

      this.form.id = res.id
      this.form.title = res.title
      this.form.content = res.content
      this.form.deleted_at = res.deleted_at
      this.form.file.current_value = null
      this.form.file.current_value = []

      res.newsFiles.forEach((value) => {
        if (value.type == 'banner') {
          this.form.image.current_url = `${this.domain}${value.url}`
        }

        if (value.type == 'files') {
          this.form.file.current_value.push(value)
        }
      })
    } catch (error) {
      console.log(error)
      return this.$notify({
        group: 'app',
        type: 'error',
        title: 'Kesalahan Internal Server',
        text: error,
      })
    }
  },
  mounted() {
    this.formValidation('news-create-form')
  },
  methods: {
    async deleteNews(id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/news`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/news`
        } else {
          url = `${this.baseurl}/employee/news`
        }

        let payload = {
          id: id,
        }
        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        const res = await this.$axios.$delete(url, config)
        console.log(res)

        $.LoadingOverlay('hide')

        this.$router.push('/dashboard/news')

        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berita berhasil dihapus permanen',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Berita gagal dihapus permanen',
          text: error,
        })
      }
    },
    async restoreNews(id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/news/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/news/restore`
        } else {
          url = `${this.baseurl}/employee/news/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }
        let payload = {
          id: id,
        }

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        this.$nuxt.refresh()
        $.LoadingOverlay('hide')

        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berita berhasil dipulihkan',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Berita gagal dipulihkan',
          text: error,
        })
      }
    },
    async dumpNews(id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/news/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/news/dump`
        } else {
          url = `${this.baseurl}/employee/news/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }
        let payload = {
          id: id,
        }

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        this.$nuxt.refresh()
        $.LoadingOverlay('hide')

        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berita berhasil dihapus',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Berita gagal dihapus',
          text: error,
        })
      }
    },
    async destroyFile(id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/news/file`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/news/file`
        } else {
          url = `${this.baseurl}/employee/news/file`
        }

        let payload = {
          file_id: id,
        }
        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        const res = await this.$axios.$delete(url, config)
        console.log(res)

        this.$nuxt.refresh()
        $.LoadingOverlay('hide')

        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berkas berhasil dihapus',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Berkas gagal dihapus',
          text: error,
        })
      }
    },
    getFile(url) {
      return window.open(`${this.domain}${url}`, '_blank')
    },
    getImageURL(url) {
      return this.domain + url
    },
    resetForm() {
      this.form.title = ''
      this.form.content = ''
      this.form.image.url = '/images/image_not_uploaded.gif'
      this.$refs.image.reset()
      this.$refs.file.reset()
    },
    async formSubmit() {
      try {
        $.LoadingOverlay('show')
        const formData = new FormData()
        let validate = this.formValidation('news-create-form').validate()

        if (!validate) {
          return
        }

        if (this.form.content == '') {
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Konten harus diisi',
          })
        }

        formData.append('id', this.$route.params.id)
        formData.append('title', this.form.title)
        formData.append('content', this.form.content)

        if (this.form.image.value != '' || this.form.image.value != null) {
          formData.append('image', this.form.image.value)
        }

        for (let index = 0; index < this.form.file.value.length; index++) {
          formData.append(`files[${index}]`, this.form.file.value[index])
        }

        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/news`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/news`
        } else {
          url = `${this.baseurl}/employee/news`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }
        const res = await this.$axios.$put(url, formData, config)

        console.log(res)

        this.$nuxt.refresh()

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

      this.form.image.url = '/images/image_not_uploaded.gif'
      if (this.form.image.value != null) {
        this.form.image.url = URL.createObjectURL(this.form.image.value)

        if (this.form.image.value.size >= this.form.image.max) {
          this.$refs.image.reset()
          this.form.image.url = '/images/image_not_uploaded.gif'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar tidak boleh melebihi dari 5 MB',
          })
        }

        if (!this.form.image.type.includes(this.form.image.value.type)) {
          this.$refs.image.reset()
          this.form.image.url = '/images/image_not_uploaded.gif'
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

          if (!this.form.file.type.includes(value.type)) {
            this.$refs.file.reset()
            return Swal.fire({
              icon: 'warning',
              title: 'Peringatan',
              text: 'Gambar yang diupload harus jpeg, jpg, dan png',
            })
          }
        })
      }
    },
  },
}
</script>
