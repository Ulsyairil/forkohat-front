<template>
  <div>
    <b-form id="order-stuff-create-form">
      <div class="form-group">
        <label for="input-program">Pilih Program</label>
        <b-form-select
          id="input-program"
          v-model="order_stuff.form.program.selected"
          :options="order_stuff.form.program.options"
          @change="findOrder()"
          required
        ></b-form-select>
      </div>
      <div class="form-group">
        <label for="input-program">Pilih Tatanan</label>
        <b-form-select
          id="input-program"
          :disabled="order_stuff.form.program.selected == ''"
          v-model="order_stuff.form.order.selected"
          :options="order_stuff.form.order.options"
          required
        ></b-form-select>
      </div>
      <b-form-group label="Judul" label-for="input-order-stuff-name">
        <b-form-input
          v-model="order_stuff.form.name"
          id="input-order-stuff-name"
          type="text"
          placeholder="Masukkan judul"
          required
          data-pristine-required-message="Judul harus diisi"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Deskripsi" label-for="input-order-stuff-description">
        <b-form-textarea
          v-model="order_stuff.form.description"
          id="input-order-stuff-description"
          placeholder="Masukkan deskripsi"
          rows="3"
          max-rows="10"
          required
          data-pristine-required-message="Deskripsi harus diisi"
        ></b-form-textarea>
      </b-form-group>
    </b-form>

    <hr class="border-dark" />

    <div
      class="mt-3 border-top page-saved"
      v-if="order_file.form.current_value.length != 0"
    >
      <div class="mt-2 mb-4">
        <h4>Halaman Tersimpan</h4>
      </div>
      <div v-for="(value, index) in order_file.form.current_value" :key="index">
        <div class="row">
          <div class="col-2 align-self-center text-center">
            <div v-if="value.mime == 'png'">
              <img
                class="img-fluid mb-2 preview-image"
                :src="domain.dev + value.url"
                data-action="zoom"
              />
            </div>
            <div v-else-if="value.mime == 'jpeg'">
              <img
                class="img-fluid mb-2 preview-image"
                :src="domain.dev + value.url"
                data-action="zoom"
              />
            </div>
            <div v-else-if="value.mime == 'jpg'">
              <img
                class="img-fluid mb-2 preview-image"
                :src="domain.dev + value.url"
                data-action="zoom"
              />
            </div>
          </div>
          <div class="col-6 align-self-center">
            <div class="title font-weight-bold">Halaman : {{ value.page }}</div>
            <div>type: {{ value.mime }}</div>
          </div>
          <div class="col-4 align-self-center">
            <a
              href="javascript:void(0)"
              class="text-warning"
              v-b-modal="`modal-edit-page-${index}`"
              @click="validationEditFormTrigger()"
            >
              <font-awesome-icon icon="edit" size="lg" />
            </a>
            <a
              href="javascript:void(0)"
              class="text-danger"
              @click="deleteFile(value.id)"
            >
              <font-awesome-icon icon="trash" size="lg" />
            </a>

            <b-modal
              :id="`modal-edit-page-${index}`"
              size="xl"
              title="Ubah Halaman"
              hide-footer
              header-bg-variant="primary"
              header-text-variant="light"
              centered
              scrollable
            >
              <img
                class="img-fluid mb-2 order-file-image"
                :src="domain.dev + value.url"
                data-action="zoom"
              />

              <b-form id="order-edit-file-create-form">
                <input
                  type="hidden"
                  ref="input_edit_page_id"
                  :value="value.id"
                />
                <b-form-group
                  label="Nomor Halaman"
                  label-for="input-edit-order-file-page"
                >
                  <b-form-input
                    v-model="value.page"
                    ref="input_edit_page_number"
                    id="input-edit-order-file-page"
                    type="number"
                    placeholder="Masukkan nomor halaman"
                    required
                    data-pristine-required-message="Nomor halaman harus diisi"
                  ></b-form-input>
                </b-form-group>
                <div class="form-group">
                  <label for="input-edit-image">Unggah Gambar Halaman</label>
                  <br />
                  <img
                    class="img-fluid mb-2 order-file-image"
                    ref="edit_order_preview_image"
                    src="https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70"
                    data-action="zoom"
                  />
                  <b-form-file
                    id="input-edit-image"
                    ref="edit_image"
                    placeholder="Pilih gambar atau letakkan di sini"
                    drop-placeholder="Letakkan file di sini"
                    accept=".jpg, .jpeg, .png"
                    browse-text="Telusuri"
                    @input="handleEditImageBeforeUpload()"
                    no-traverse
                    required
                    data-pristine-required-message="Gambar halaman harus diunggah"
                  ></b-form-file>
                </div>

                <div class="mt-3">
                  <b-button
                    type="button"
                    variant="success"
                    v-b-tooltip.hover
                    title="Simpan"
                    @click.prevent="editPageForm()"
                  >
                    <font-awesome-icon icon="save" />
                  </b-button>
                </div>
              </b-form>
            </b-modal>
          </div>
        </div>
      </div>
    </div>

    <b-form id="order-file-create-form">
      <h3>Buat Halaman</h3>
      <b-form-group label="Nomor Halaman" label-for="input-order-file-page">
        <b-form-input
          v-model="order_file.form.page"
          id="input-order-file-page"
          type="number"
          placeholder="Masukkan nomor halaman"
          required
          data-pristine-required-message="Nomor halaman harus diisi"
        ></b-form-input>
      </b-form-group>
      <div class="form-group">
        <label for="input-image">Unggah Gambar Halaman</label>
        <br />
        <img
          class="img-fluid mb-2 order-file-image"
          :src="order_file.form.image.url"
          data-action="zoom"
        />
        <b-form-file
          id="input-image"
          ref="image"
          v-model="order_file.form.image.value"
          placeholder="Pilih gambar atau letakkan di sini"
          drop-placeholder="Letakkan file di sini"
          accept=".jpg, .jpeg, .png"
          browse-text="Telusuri"
          @input="handleImageBeforeUpload()"
          no-traverse
          required
          data-pristine-required-message="Gambar halaman harus diunggah"
        ></b-form-file>
      </div>
    </b-form>

    <div>
      <b-button
        type="button"
        variant="primary"
        v-b-tooltip.hover
        title="Tambah Topik Pertanyaan"
        @click="addOrder()"
      >
        <font-awesome-icon icon="plus-square" />
      </b-button>
      <b-button
        type="submit"
        variant="success"
        v-b-tooltip.hover
        title="Simpan"
        @click.prevent="formSubmit()"
      >
        <font-awesome-icon icon="save" />
      </b-button>
    </div>

    <div class="mt-3 border-top" v-if="order_file.form.value.length != 0">
      <div class="mt-2 mb-4">
        <h4>Pratinjau</h4>
      </div>
      <div v-for="(value, index) in order_file.form.value" :key="index">
        <div class="row">
          <div class="col-2 align-self-center text-center">
            <div v-if="value.image.type == 'image/png'">
              <img
                class="img-fluid mb-2 preview-image"
                :src="filesURL(value.image)"
                data-action="zoom"
              />
            </div>
            <div v-else-if="value.image.type == 'image/jpeg'">
              <img
                class="img-fluid mb-2 preview-image"
                :src="filesURL(value.image)"
                data-action="zoom"
              />
            </div>
          </div>
          <div class="col-6 align-self-center">
            <div class="title font-weight-bold">Halaman : {{ value.page }}</div>
            <div>
              size: {{ convertFileSize(value.image.size) }}, type:
              {{ value.image.type }}
            </div>
          </div>
          <div class="col-4 align-self-center">
            <a
              href="javascript:void(0)"
              class="text-danger"
              @click="deleteOrder(index)"
            >
              <font-awesome-icon icon="trash" size="lg" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.order-file-image {
  max-width: 300px;
  max-height: 200px;
}

.preview-image {
  max-width: 100px;
  max-height: 50px;
}

.page-saved {
  overflow-y: visible;
  max-height: 400px;
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
      baseurl: {
        dev: this.$config.baseurl.dev,
        prod: this.$config.baseurl.prod,
      },
      domain: {
        dev: this.$config.domain.dev,
        prod: this.$config.domain.prod,
      },
      order_stuff: {
        form: {
          program: {
            selected: '',
            options: [],
          },
          order: {
            selected: '',
            options: [],
          },
          name: '',
          description: '',
        },
      },
      order_file: {
        form: {
          page: 1,
          image: {
            url:
              'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
            max: 5242880,
            type: ['image/jpg', 'image/jpeg', 'image/png'],
            value: null,
          },
          value: [],
          current_value: [],
        },
      },
    }
  },
  async fetch() {
    try {
      let url

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl.dev}/superadmin/order/stuff?id=${this.$route.params.id}`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl.dev}/admin/order/stuff?id=${this.$route.params.id}`
      }

      const orderStuffData = await this.$axios.$get(url, config)
      console.log(orderStuffData)

      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl.dev}/superadmin/programs`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl.dev}/admin/programs`
      }

      const programData = await this.$axios.$post(url, {}, config)
      console.log(programData)

      this.order_stuff.form.program.options = null
      this.order_stuff.form.program.options = []
      this.order_stuff.form.program.options.push({
        value: '',
        text: 'Pilih program',
      })
      programData.forEach((value) => {
        this.order_stuff.form.program.options.push({
          value: value.id,
          text: value.name,
        })
      })

      this.order_stuff.form.program.selected = orderStuffData.orders.program_id
      if (this.order_stuff.form.program.selected != '') {
        this.findOrder()
        this.order_stuff.form.order.selected = orderStuffData.order_id
      }
      this.order_stuff.form.name = orderStuffData.name
      this.order_stuff.form.description = orderStuffData.description

      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl.dev}/superadmin/order/stuff/files?order_stuff_id=${this.$route.params.id}`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl.dev}/admin/order/stuff/files?order_stuff_id=${this.$route.params.id}`
      }

      const orderStuffFile = await this.$axios.$get(url, config)
      console.log(orderStuffFile)

      this.order_file.form.current_value = orderStuffFile
      this.order_file.form.current_value.sort((a, b) => {
        if (a.page < b.page) {
          return -1
        }

        if (a.page > b.page) {
          return 1
        }

        return 0
      })
      console.log(this.order_file.form.current_value)
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
    this.formValidation('order-stuff-create-form')
    this.formValidation('order-file-create-form')
  },
  methods: {
    async editPageForm() {
      try {
        let url
        let validate = this.formValidation(
          'order-edit-file-create-form'
        ).validate()

        if (!validate) {
          return
        }

        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/stuff/file`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/stuff/file`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let page_id = this.$refs.input_edit_page_id[0].value
        let page_number = this.$refs.input_edit_page_number[0].value
        let image_upload = this.$refs.edit_image[0].files[0]

        let formData = new FormData()
        formData.append('id', page_id)
        formData.append('page', page_number)
        formData.append('image', image_upload)

        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }

        $.LoadingOverlay('show')

        const res = this.$axios.$put(url, formData, config)
        console.log(res)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Gagal disimpan',
          text: error,
        })
      }
    },
    validationEditFormTrigger() {
      setTimeout(() => {
        this.formValidation('order-edit-file-create-form')
      }, 500)
    },
    async deleteFile(id) {
      try {
        let url

        $.LoadingOverlay('show')

        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/stuff/file`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/stuff/file`
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

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Gagal disimpan',
          text: error,
        })
      }
    },
    async formSubmit() {
      try {
        let url
        let validate = this.formValidation('order-stuff-create-form').validate()

        if (!validate) {
          return
        }

        $.LoadingOverlay('show')

        if (this.order_file.form.current_value.length == 0) {
          $.LoadingOverlay('hide')

          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Halaman isi tatanan kosong',
          })
        }

        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/stuff`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/stuff`
        }

        let payload = {
          id: this.$route.params.id,
          order_id: this.order_stuff.form.order.selected,
          name: this.order_stuff.form.name,
          description: this.order_stuff.form.description,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$put(url, payload, config)
        console.log(data)

        this.order_file.form.value.forEach(async (value) => {
          let url
          if (this.auth.user.rule_id == 1) {
            url = `${this.baseurl.dev}/superadmin/order/stuff/file`
          } else if (this.auth.user.rule_id == 2) {
            url = `${this.baseurl.dev}/admin/order/stuff/file`
          }

          let formData = new FormData()
          formData.append('order_stuff_id', data.id)
          formData.append('page', value.page)
          formData.append('image', value.image)

          const res = await this.$axios.$post(url, formData, config)
          console.log(res)

          for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1])
          }
        })

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
          type: 'success',
          title: 'Gagal disimpan',
          text: error,
        })
      }
    },
    async findOrder() {
      try {
        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/orders`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/orders`
        }

        let payload = {
          program_id: this.order_stuff.form.program.selected,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$post(url, payload, config)
        console.log(data)

        this.order_stuff.form.order.options = null
        this.order_stuff.form.order.options = []
        this.order_stuff.form.order.options.push({
          value: '',
          text: 'Pilih tatanan',
        })
        data.forEach((value) => {
          this.order_stuff.form.order.options.push({
            value: value.id,
            text: value.name,
          })
        })

        // Manual sort array
        this.order_stuff.form.order.options.sort((a, b) => {
          if (a.value < b.value) {
            return -1
          }

          if (a.value > b.value) {
            return 1
          }

          return 0
        })
      } catch (error) {
        console.log(error)
      }
    },
    addOrder() {
      let validate = this.formValidation('order-file-create-form').validate()

      if (!validate) {
        return
      }

      let validate_page = false

      if (this.order_file.form.value.length != 0) {
        this.order_file.form.value.forEach((value) => {
          if (this.order_file.form.page == value.page) {
            validate_page = true
          }
        })

        if (validate_page == true) {
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: `Halaman ${this.order_file.form.page} sudah ada, mohon dicek lagi`,
          })
        }
      }

      let payload = {
        page: this.order_file.form.page,
        image: this.order_file.form.image.value,
      }

      this.order_file.form.value.push(payload)
      this.order_file.form.value.sort((a, b) => {
        if (a.page < b.page) {
          return -1
        }

        if (a.page > b.page) {
          return 1
        }

        return 0
      })
      console.log(this.order_file.form.value)

      this.order_file.form.page++
    },
    deleteOrder(index) {
      this.order_file.form.value.splice(index, 1)
    },
    filesURL(file) {
      return URL.createObjectURL(file)
    },
    convertFileSize(size) {
      return filesize(size)
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
    handleEditImageBeforeUpload() {
      console.log(this.$refs.edit_image)
      console.log(this.$refs.edit_order_preview_image)
      let upload = this.$refs.edit_image[0]
      let image = this.$refs.edit_order_preview_image[0]

      if (upload.files.length != 0) {
        if (upload.files[0].size >= this.order_file.form.image.max) {
          Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar tidak boleh melebihi dari 5 MB',
          })
        }

        if (!this.order_file.form.image.type.includes(upload.files[0].type)) {
          Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar yang diupload harus jpeg, jpg, dan png',
          })
        }

        image.src = URL.createObjectURL(upload.files[0])
      } else {
        image.src =
          'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
      }
    },
    handleImageBeforeUpload() {
      console.log(this.order_file.form.image.value)

      this.order_file.form.image.url =
        'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
      if (this.order_file.form.image.value != null) {
        this.order_file.form.image.url = URL.createObjectURL(
          this.order_file.form.image.value
        )

        if (
          this.order_file.form.image.value.size >=
          this.order_file.form.image.max
        ) {
          this.$refs.image.reset()
          this.order_file.form.image.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar tidak boleh melebihi dari 5 MB',
          })
        }

        if (
          !this.order_file.form.image.type.includes(
            this.order_file.form.image.value.type
          )
        ) {
          this.$refs.image.reset()
          this.order_file.form.image.url =
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
