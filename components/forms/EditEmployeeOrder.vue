<template>
  <div>
    <b-form id="order-stuff-create-form">
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
        ></b-form-file>
      </div>
      <div class="form-group">
        <label for="input-deleted_at">Tanggal Dihapus</label>
        <b-form-datepicker
          id="input-deleted_at"
          v-model="order_stuff.form.deleted_at"
          locale="id"
          placeholder="-"
          disabled
        ></b-form-datepicker>
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
      <div
        class="_df_button btn btn-primary"
        v-b-tooltip.hover
        title="Lihat Berkas"
        :source="domain + order_file.form.current_value.url"
      >
        <font-awesome-icon icon="search-plus" />
      </div>
      <b-button
        type="button"
        variant="warning"
        v-b-tooltip.hover
        title="Hapus"
        v-if="order_stuff.form.deleted_at == null"
        @click="dumpOrderStuff()"
      >
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button
        type="button"
        variant="warning"
        v-b-tooltip.hover
        title="Pulihkan"
        v-if="order_stuff.form.deleted_at != null"
        @click="restoreOrderStuff()"
      >
        <font-awesome-icon icon="trash-restore" />
      </b-button>

      <b-button
        type="button"
        variant="danger"
        v-b-tooltip.hover
        title="Hapus Permanen"
        @click="deleteOrderStuff()"
      >
        <font-awesome-icon icon="ban" />
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
      domain: this.$config.domain,
      order_stuff: {
        form: {
          id: this.$route.params.id,
          order: this.$route.query.order_id,
          name: '',
          description: '',
          deleted_at: '',
        },
      },
      order_file: {
        form: {
          page: 1,
          file: {
            type: ['application/pdf'],
            value: null,
          },
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

      url = `${this.baseurl}/employee/order/stuff?id=${this.$route.params.id}`

      const orderStuffData = await this.$axios.$get(url, config)
      console.log(orderStuffData)

      this.order_stuff.form.name = orderStuffData.name
      this.order_stuff.form.description = orderStuffData.description
      this.order_stuff.form.deleted_at = orderStuffData.deleted_at

      url = `${this.baseurl}/employee/order/stuff/files?order_stuff_id=${this.$route.params.id}`

      const orderStuffFile = await this.$axios.$get(url, config)
      console.log(orderStuffFile)

      this.order_file.form.current_value = orderStuffFile
      console.log(this.order_file.form.current_value)
    } catch (error) {
      console.log(error)
    }
  },
  mounted() {
    this.formValidation('order-stuff-create-form')
  },
  methods: {
    async deleteOrderStuff() {
      try {
        let url
        $.LoadingOverlay('show')

        url = `${this.baseurl}/employee/order/stuff`

        let payload = {
          id: this.order_stuff.form.id,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        const data = await this.$axios.$delete(url, config)
        console.log(data)

        this.$router.back()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dihapus permanen',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Gagal hapus permanen',
          text: error,
        })
      }
    },
    async restoreOrderStuff() {
      try {
        let url
        $.LoadingOverlay('show')

        url = `${this.baseurl}/employee/order/stuff/restore`

        let payload = {
          id: this.order_stuff.form.id,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$put(url, payload, config)
        console.log(data)

        this.$nuxt.refresh()

        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'success',
          title: 'Berhasil dipulihkan',
        })
      } catch (error) {
        console.log(error)
        $.LoadingOverlay('hide')
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Gagal dipulihkan',
          text: error,
        })
      }
    },
    async dumpOrderStuff() {
      try {
        let url
        $.LoadingOverlay('show')

        url = `${this.baseurl}/employee/order/stuff/dump`

        let payload = {
          id: this.order_stuff.form.id,
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const data = await this.$axios.$put(url, payload, config)
        console.log(data)

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
          type: 'error',
          title: 'Gagal dihapus',
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

        url = `${this.baseurl}/employee/order/stuff`

        let payload = {
          id: this.order_stuff.form.id,
          order_id: this.order_stuff.form.order,
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

        if (this.order_file.form.file.value != null) {
          url = `${this.baseurl}/employee/order/stuff/file`

          let formData = new FormData()
          formData.append('id', this.order_file.form.current_value.id)
          formData.append('file', this.order_file.form.file.value)

          const res = await this.$axios.$put(url, formData, config)
          console.log(res)

          for (var pair of formData.entries()) {
            console.log(pair[0] + ', ' + pair[1])
          }

          this.order_file.form.file.value = null
        }

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
