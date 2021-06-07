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
      <div class="form-group">
        <label for="input-pdf">Unggah Berkas PDF</label>
        <br />
        <b-form-file
          id="input-pdf"
          v-model="order_file.form.file.value"
          placeholder="Pilih berkas pdf atau letakkan di sini"
          drop-placeholder="Letakkan file di sini"
          accept=".pdf"
          browse-text="Telusuri"
          @input="handlePdfBeforeUpload()"
          no-traverse
          required
          data-pristine-required-message="Berkas harus diunggah"
        ></b-form-file>
      </div>
    </b-form>

    <div>
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
          file: {
            type: ['application/pdf'],
            value: null,
          },
        },
      },
    }
  },
  async fetch() {
    try {
      let url
      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl}/superadmin/programs`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl}/admin/programs`
      }

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      const data = await this.$axios.$post(url, {}, config)
      console.log(data)

      this.order_stuff.form.program.options = null
      this.order_stuff.form.program.options = []
      this.order_stuff.form.program.options.push({
        value: '',
        text: 'Pilih program',
      })
      data.forEach((value) => {
        this.order_stuff.form.program.options.push({
          value: value.id,
          text: value.name,
        })
      })
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
    this.formValidation('order-stuff-create-form')
  },
  methods: {
    async formSubmit() {
      try {
        let validate = this.formValidation('order-stuff-create-form').validate()

        if (!validate) {
          return
        }

        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/order/stuff`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/order/stuff`
        }

        let payload = {
          order_id: this.order_stuff.form.order.selected,
          name: this.order_stuff.form.name,
          description: this.order_stuff.form.description,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$post(url, payload, config)
        console.log(data)

        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/order/stuff/file`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/order/stuff/file`
        }

        let formData = new FormData()
        formData.append('order_stuff_id', data.id)
        formData.append('file', this.order_file.form.file.value)

        const res = await this.$axios.$post(url, formData, config)
        console.log(res)

        for (var pair of formData.entries()) {
          console.log(pair[0] + ', ' + pair[1])
        }

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
    async findOrder() {
      try {
        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl}/superadmin/orders`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl}/admin/orders`
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
    handlePdfBeforeUpload() {
      console.log(this.order_file.form.file.value)
      if (this.order_file.form.file.value != null) {
        if (
          !this.order_file.form.file.type.includes(
            this.order_file.form.file.value.type
          )
        ) {
          this.$refs.file.reset()
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Berkas PDF yang diupload harus pdf',
          })
        }
      }
    },
  },
}
</script>
