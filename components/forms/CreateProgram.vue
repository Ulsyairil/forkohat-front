<template>
  <div>
    <b-form id="program-create-form">
      <b-form-group label="Nama Program" label-for="input-program-name">
        <b-form-input
          v-model="program.form.name"
          id="input-program-name"
          type="text"
          placeholder="Masukkan nama program"
          required
          data-pristine-required-message="Nama program harus diisi"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Deskripsi Program"
        label-for="input-program-description"
      >
        <b-form-textarea
          v-model="program.form.description"
          id="input-program-description"
          placeholder="Masukkan deskripsi program"
          rows="3"
          max-rows="10"
          required
          data-pristine-required-message="Deskripsi program harus diisi"
        ></b-form-textarea>
      </b-form-group>
      <div class="form-group">
        <label for="input-image">Unggah Gambar Program</label>
        <br />
        <picture>
          <img
            class="img-fluid mb-2 program-image"
            :src="program.form.image.url"
            data-action="zoom"
          />
        </picture>
        <b-form-file
          id="input-image"
          ref="image"
          v-model="program.form.image.value"
          placeholder="Pilih gambar atau letakkan di sini"
          drop-placeholder="Letakkan file di sini"
          accept=".jpg, .jpeg, .png"
          browse-text="Telusuri"
          @input="handleImageBeforeUpload()"
          no-traverse
          required
          data-pristine-required-message="Gambar program harus diunggah"
        ></b-form-file>
      </div>
    </b-form>

    <hr class="border-dark" />

    <b-form id="order-create-form">
      <h3>Buat Tatanan</h3>
      <b-form-group label="Nama Tatanan" label-for="input-order-name">
        <b-form-input
          v-model="order.form.name"
          id="input-order-name"
          type="text"
          placeholder="Masukkan nama tatanan"
          required
          data-pristine-required-message="Nama tatanan harus diisi"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Deskripsi Tatanan"
        label-for="input-order-description"
      >
        <b-form-textarea
          v-model="order.form.description"
          id="input-order-description"
          placeholder="Masukkan deskripsi tatanan"
          rows="3"
          max-rows="10"
          required
          data-pristine-required-message="Deskripsi tatanan harus diisi"
        ></b-form-textarea>
      </b-form-group>
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

    <div class="table-responsive mt-3" v-if="order.value.length != 0">
      <table class="table table-bordered table-hover">
        <thead>
          <tr>
            <th scope="col">Nama Tatanan</th>
            <th scope="col">Deskripsi</th>
            <th scope="col" class="text-center">Hapus</th>
          </tr>
        </thead>
        <tbody v-for="(value, index) in order.value" :key="index">
          <tr>
            <td>{{ value.name }}</td>
            <td>{{ value.description }}</td>
            <td class="text-center">
              <b-button
                type="button"
                variant="danger"
                @click="deleteOrder(index)"
              >
                <font-awesome-icon icon="trash" />
              </b-button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="scss">
.program-image {
  max-width: 300px;
  max-height: 200px;
}
</style>

<script>
import Swal from 'sweetalert2'

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
      program: {
        form: {
          name: '',
          description: '',
          image: {
            url:
              'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
            max: 5242880,
            type: ['image/jpg', 'image/jpeg', 'image/png'],
            value: null,
          },
        },
      },
      order: {
        form: {
          name: '',
          description: '',
        },
        value: [],
      },
    }
  },
  mounted() {
    this.formValidation('program-create-form')
    this.formValidation('order-create-form')
  },
  methods: {
    async formSubmit() {
      try {
        $.LoadingOverlay('show')

        let validate = this.formValidation('program-create-form').validate()

        if (!validate) {
          return
        }

        if (this.order.value.length == 0) {
          $.LoadingOverlay('hide')

          return Swal.fire({
            icon: 'warning',
            title: 'Tatanan harus dibuat',
          })
        }

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/program`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/program`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let formData = new FormData()
        formData.append('name', this.program.form.name)
        formData.append('description', this.program.form.description)
        formData.append('image', this.program.form.image.value)

        const program = await this.$axios.$post(url, formData, config)
        console.log(program)

        this.order.value.forEach(async (value) => {
          let payload = {
            program_id: program.id,
            name: value.name,
            description: value.description,
          }

          if (this.auth.user.rule_id == 1) {
            url = `${this.baseurl.dev}/superadmin/order`
          } else if (this.auth.user.rule_id == 2) {
            url = `${this.baseurl.dev}/admin/order`
          }

          const order = await this.$axios.$post(url, payload, config)
          console.log(order)
        })

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
    addOrder() {
      let validate = this.formValidation('order-create-form').validate()

      if (!validate) {
        return
      }

      let payload = {
        name: this.order.form.name,
        description: this.order.form.description,
      }

      this.order.value.push(payload)

      console.log(this.order.value)
    },
    deleteOrder(index) {
      this.order.value.splice(index, 1)
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
      console.log(this.program.form.image.value)

      this.program.form.image.url =
        'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
      if (this.program.form.image.value != null) {
        this.program.form.image.url = URL.createObjectURL(
          this.program.form.image.value
        )

        if (this.program.form.image.value.size >= this.program.form.image.max) {
          this.$refs.image.reset()
          this.program.form.image.url =
            'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70'
          return Swal.fire({
            icon: 'warning',
            title: 'Peringatan',
            text: 'Gambar tidak boleh melebihi dari 5 MB',
          })
        }

        if (
          !this.program.form.image.type.includes(
            this.program.form.image.value.type
          )
        ) {
          this.$refs.image.reset()
          this.program.form.image.url =
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
