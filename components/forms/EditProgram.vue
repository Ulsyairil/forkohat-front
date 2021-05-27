<template>
  <div>
    <b-form id="program-create-form">
      <div class="row">
        <div class="col-md-4">
          <img
            class="img-fluid mb-2 program-image"
            :src="program.form.image.current_url"
            data-action="zoom"
          />
        </div>
        <div class="col-md-8">
          <div
            class="table-responsive mt-3 order-container"
            v-if="order.current_value.length != 0"
          >
            <table class="table table-bordered table-hover">
              <thead>
                <tr>
                  <th scope="col">Nama Tatanan</th>
                  <th scope="col" class="text-center">Dihapus</th>
                  <th scope="col" class="text-center" width="120px">Aksi</th>
                </tr>
              </thead>
              <tbody v-for="(value, index) in order.current_value" :key="index">
                <tr>
                  <td>{{ value.name }}</td>
                  <td v-if="value.deleted_at == null" class="text-center">-</td>
                  <td v-else-if="value.deleted_at != null" class="text-center">
                    {{ value.deleted_at }}
                  </td>
                  <td class="text-center">
                    <b-button
                      type="button"
                      variant="warning"
                      v-b-modal="`modal-${index}`"
                      @click="getOrderStuff(value.id)"
                    >
                      <font-awesome-icon icon="edit" />
                    </b-button>
                    <b-button
                      type="button"
                      variant="danger"
                      v-if="value.deleted_at == null"
                      @click="orderDump(value.id)"
                    >
                      <font-awesome-icon icon="trash" />
                    </b-button>
                    <b-button
                      type="button"
                      variant="primary"
                      v-else-if="value.deleted_at != null"
                      @click="orderRestore(value.id)"
                    >
                      <font-awesome-icon icon="trash-restore" />
                    </b-button>

                    <b-modal
                      :id="`modal-${index}`"
                      size="xl"
                      title="Ubah Tatanan"
                      hide-footer
                      header-bg-variant="primary"
                      header-text-variant="light"
                      centered
                      scrollable
                    >
                      <input
                        type="hidden"
                        ref="input_order_id"
                        v-model="value.id"
                      />
                      <b-form-group
                        label="Judul Tatanan"
                        label-for="input-order-name"
                      >
                        <b-form-input
                          ref="input_order_name"
                          v-model="value.name"
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
                          ref="input_order_description"
                          v-model="value.description"
                          id="input-order-description"
                          placeholder="Masukkan deskripsi tatanan"
                          rows="3"
                          max-rows="10"
                          required
                          data-pristine-required-message="Deskripsi tatanan harus diisi"
                        ></b-form-textarea>
                      </b-form-group>
                      <b-button
                        type="submit"
                        variant="success"
                        @click="orderSubmit()"
                      >
                        <font-awesome-icon icon="save" />
                      </b-button>

                      <div
                        class="table-responsive mt-3"
                        v-if="order_stuff.length != 0"
                      >
                        <table class="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th scope="col">Nama Isi Tatanan</th>
                              <th scope="col" class="text-center">Dihapus</th>
                              <th scope="col" class="text-center" width="120px">
                                Aksi
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            v-for="(value, index) in order_stuff"
                            :key="index"
                          >
                            <tr>
                              <td>{{ value.name }}</td>
                              <td
                                v-if="value.deleted_at == null"
                                class="text-center"
                              >
                                -
                              </td>
                              <td
                                v-else-if="value.deleted_at != null"
                                class="text-center"
                              >
                                {{ value.deleted_at }}
                              </td>
                              <td>
                                <b-button
                                  type="button"
                                  variant="warning"
                                  @click="orderStuffEdit(value.id)"
                                >
                                  <font-awesome-icon icon="edit" />
                                </b-button>
                                <b-button
                                  type="button"
                                  variant="danger"
                                  v-if="value.deleted_at == null"
                                  @click="
                                    orderStuffDump(value.id, value.order_id)
                                  "
                                >
                                  <font-awesome-icon icon="trash" />
                                </b-button>
                                <b-button
                                  type="button"
                                  variant="primary"
                                  v-else-if="value.deleted_at != null"
                                  @click="
                                    orderStuffRestore(value.id, value.order_id)
                                  "
                                >
                                  <font-awesome-icon icon="trash-restore" />
                                </b-button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </b-modal>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
        <div>
          <img
            class="img-fluid mb-2 program-image"
            :src="program.form.image.url"
            data-action="zoom"
          />
        </div>
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
          data-pristine-required-message="Gambar program harus diunggah"
        ></b-form-file>
      </div>
      <div class="form-group">
        <label for="input-deleted_at">Tanggal Dihapus</label>
        <b-form-datepicker
          id="input-deleted_at"
          v-model="program.form.deleted_at"
          locale="id"
          placeholder="-"
          disabled
        ></b-form-datepicker>
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
      <b-button
        type="button"
        variant="warning"
        v-b-tooltip.hover
        title="Hapus"
        v-if="program.form.deleted_at == null"
        @click="programDump()"
      >
        <font-awesome-icon icon="trash" />
      </b-button>
      <b-button
        type="button"
        variant="primary"
        v-b-tooltip.hover
        title="Pulihkan"
        v-if="program.form.deleted_at != null"
        @click="programRestore()"
      >
        <font-awesome-icon icon="trash-restore" />
      </b-button>
      <b-button
        type="button"
        variant="danger"
        v-b-tooltip.hover
        title="Hapus Permanen"
        @click="programDelete()"
      >
        <font-awesome-icon icon="ban" />
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

.order-container {
  overflow-y: visible;
  max-height: 400px;
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
      domain: {
        dev: this.$config.domain.dev,
        prod: this.$config.domain.prod,
      },
      program: {
        form: {
          name: '',
          description: '',
          image: {
            current_url: '',
            url:
              'https://place-hold.it/1280x720?text=Gambar Belum Diunggah&fontsize=70',
            max: 5242880,
            type: ['image/jpg', 'image/jpeg', 'image/png'],
            value: null,
          },
          deleted_at: '',
        },
      },
      order: {
        form: {
          name: '',
          description: '',
        },
        current_value: [],
        value: [],
      },
      order_stuff: [],
    }
  },
  async fetch() {
    try {
      let url
      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl.dev}/superadmin/program?program_id=${this.$route.params.id}`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl.dev}/admin/program?program_id=${this.$route.params.id}`
      }

      const config = {
        headers: {
          Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
        },
      }

      const programData = await this.$axios.$get(url, config)
      console.log(programData)

      if (this.auth.user.rule_id == 1) {
        url = `${this.baseurl.dev}/superadmin/orders`
      } else if (this.auth.user.rule_id == 2) {
        url = `${this.baseurl.dev}/admin/orders`
      }

      let payload = {
        program_id: this.$route.params.id,
      }

      const orderData = await this.$axios.$post(url, payload, config)
      console.log(orderData)

      this.program.form.name = programData.name
      this.program.form.description = programData.description
      this.program.form.deleted_at = programData.deleted_at
      programData.programFiles.forEach((value) => {
        this.program.form.image.current_url = this.domain.dev + value.url
      })

      this.order.current_value = orderData
      this.order.current_value.sort((a, b) => {
        if (a.id < b.id) {
          return -1
        }

        if (a.id > b.id) {
          return 1
        }

        return 0
      })

      console.log(this.order.current_value)
    } catch (error) {
      console.log(error)
      return this.$notify({
        group: 'app',
        type: 'error',
        title: 'Kesalahan pada server',
        text: error,
      })
    }
  },
  mounted() {
    this.formValidation('program-create-form')
    this.formValidation('order-create-form')
  },
  methods: {
    orderStuffEdit(id) {
      this.$router.push(`/dashboard/program/order/edit/${id}`)
    },
    async orderStuffRestore(id, order_id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/stuff/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/stuff/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          id: id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        this.getOrderStuff(order_id)

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
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async orderStuffDump(id, order_id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/stuff/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/stuff/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          id: id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

        this.getOrderStuff(order_id)

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
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async orderRestore(id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          id: id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

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
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async orderDump(id) {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          id: id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
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
          type: 'error',
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async orderSubmit() {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          id: this.$refs.input_order_id[0].value,
          program_id: this.$route.params.id,
          name: this.$refs.input_order_name[0].value,
          description: this.$refs.input_order_description[0].value,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
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
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async getOrderStuff(id) {
      try {
        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/order/stuffs?order_id=${id}`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/order/stuffs?order_id=${id}`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        const res = await this.$axios.$get(url, config)
        console.log(res)

        this.order_stuff = null
        this.order_stuff = res
      } catch (error) {
        console.log(error)
        return this.$notify({
          group: 'app',
          type: 'error',
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async programDelete() {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/program`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/program`
        }

        let payload = {
          program_id: this.$route.params.id,
        }
        console.log(payload)

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
          data: payload,
        }

        const res = await this.$axios.$delete(url, config)
        console.log(res)

        this.$router.push('/dashboard/program/')

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
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async programRestore() {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/program/restore`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/program/restore`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          program_id: this.$route.params.id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
        console.log(res)

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
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async programDump() {
      try {
        $.LoadingOverlay('show')

        let url
        if (this.auth.user.rule_id == 1) {
          url = `${this.baseurl.dev}/superadmin/program/dump`
        } else if (this.auth.user.rule_id == 2) {
          url = `${this.baseurl.dev}/admin/program/dump`
        }

        const config = {
          headers: {
            Authorization: `${this.auth.token.type} ${this.auth.token.token}`,
          },
        }

        let payload = {
          program_id: this.$route.params.id,
        }
        console.log(payload)

        const res = await this.$axios.$put(url, payload, config)
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
          type: 'error',
          title: 'Kesalahan pada server',
          text: error,
        })
      }
    },
    async formSubmit() {
      try {
        $.LoadingOverlay('show')

        let validate = this.formValidation('program-create-form').validate()

        if (!validate) {
          return
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
        formData.append('program_id', this.$route.params.id)
        formData.append('name', this.program.form.name)
        formData.append('description', this.program.form.description)
        if (this.program.form.image.value != null) {
          formData.append('image', this.program.form.image.value)
        }

        const program = await this.$axios.$put(url, formData, config)
        console.log(program)

        this.order.value.forEach(async (value) => {
          let payload = {
            program_id: this.$route.params.id,
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
          title: 'Kesalahan pada server',
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
