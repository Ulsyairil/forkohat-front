<template>
  <v-container fluid>
    <v-data-iterator
      class="mt-2"
      :items="items.data"
      :items-per-page.sync="limit"
      :page.sync="page"
      :server-items-length="items.total"
      @update:items-per-page="fetchData()"
      @update:page="fetchData()"
      no-data-text="Data Kosong"
      no-results-text="Data Tidak Ditemukan"
      :footer-props="{
        'items-per-page-options': itemsPerPageArray,
        'items-per-page-text': 'Baris per halaman',
      }"
    >
      <template v-slot:header>
        <v-card class="mb-2">
          <v-card-title> Daftar FAQ </v-card-title>

          <v-container>
            <div class="d-flex flex-row flex-wrap">
              <v-btn
                type="button"
                class="mt-3 mr-3"
                color="primary"
                @click="addFaq.dialog = true"
              >
                <v-icon>add</v-icon>
                Tambah
              </v-btn>
              <v-select
                label="Urutkan"
                class="mr-sm-3 mr-md-3"
                style="width: 100px"
                :items="orderItems"
                v-model="order"
                @input="fetchData()"
                hide-details
                append-icon="sort"
              ></v-select>
              <v-text-field
                append-icon="mdi-magnify"
                class="mt-sm-1 mt-md-1"
                label="Cari"
                single-line
                hide-details
                clearable
                v-model="search"
                @input="fetchData()"
              ></v-text-field>
            </div>
          </v-container>
        </v-card>
      </template>
      <template v-slot:default="props">
        <v-container>
          <v-expansion-panels accordion>
            <v-expansion-panel
              v-for="(item, index) in props.items"
              :key="index"
            >
              <v-expansion-panel-header
                >{{ item.title }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <p>{{ item.description }}</p>

                <div class="mt-3">
                  <v-icon
                    class="mx-3"
                    color="orange lighten-2"
                    @click="openEditDialog(item.id)"
                    >edit</v-icon
                  >
                  <v-icon
                    class="mx-3"
                    color="red lighten-2"
                    @click="destroy(item.id)"
                    >delete_forever</v-icon
                  >
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-container>
      </template>
    </v-data-iterator>

    <v-dialog v-model="addFaq.dialog" max-width="1000px" persistent>
      <v-card>
        <v-card-title>Tambah FAQ</v-card-title>
        <v-container>
          <v-form
            ref="add_faq_form"
            @submit.prevent="submitFaq(false)"
            lazy-validation
          >
            <v-text-field
              label="Judul"
              v-model="addFaq.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>

            <v-textarea
              label="Deskripsi"
              v-model="addFaq.description"
            ></v-textarea>

            <div>
              <v-btn
                type="submit"
                color="primary"
                @click.prevent="submitFaq(false)"
                >Simpan</v-btn
              >
              <v-btn
                type="submit"
                color="primary"
                @click.prevent="submitFaq(true)"
                >Simpan & Tambah Lagi</v-btn
              >
              <v-btn type="button" @click="closeAddDialog()">Kembali</v-btn>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <v-dialog v-model="editFaq.dialog" max-width="1000px" persistent>
      <v-card>
        <v-card-title>Ubah FAQ</v-card-title>
        <v-container>
          <v-form
            ref="edit_faq_form"
            @submit.prevent="editFaq()"
            lazy-validation
          >
            <v-text-field
              label="Judul"
              v-model="editFaq.title"
              :rules="[validation.required, validation.maxTextDefault]"
            ></v-text-field>

            <v-textarea
              label="Deskripsi"
              v-model="editFaq.description"
              :rules="[validation.required]"
            ></v-textarea>

            <div>
              <v-btn
                type="submit"
                color="primary"
                @click.prevent="submitEditFaq()"
                >Simpan</v-btn
              >
              <v-btn type="button" @click="closeEditDialog()">Kembali</v-btn>
            </div>
          </v-form>
        </v-container>
      </v-card>
    </v-dialog>

    <vue-easy-lightbox
      :visible="lightBox.visible"
      :imgs="lightBox.img"
      :index="lightBox.index"
      @hide="handleHideImg()"
      :moveDisabled="true"
    ></vue-easy-lightbox>
  </v-container>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  layout: 'dashboard',
  head() {
    return {
      title: 'Daftar FAQ',
    }
  },
  data() {
    return {
      orderItems: [
        {
          text: 'DESC',
          value: 'desc',
        },
        {
          text: 'ASC',
          value: 'asc',
        },
      ],
      lightBox: {
        img: '',
        visible: false,
        index: 0,
      },
      itemsPerPageArray: [10, 25, 50, 75, 100],
      addFaq: {
        dialog: false,
        title: '',
        description: '',
      },
      editFaq: {
        dialog: false,
        id: null,
        title: '',
        description: '',
      },
      validation: {
        requiredFile: (v) => !!v || 'File harus diunggah',
        fileSize: (v) => {
          if (v) {
            if (v.size > 1048576) {
              return 'Maksimal ukuran file 1 MB'
            }
          }

          return true
        },
        required: (v) => !!v || 'Harus diisi',
        maxTextDefault: (v) => v.length <= 254 || 'Maksimal 254 karakter',
      },
    }
  },
  computed: {
    page: {
      get() {
        return this.$store.state.admin.faq.pagination.page
      },
      set(newValue) {
        this.$store.commit('superadmin/faq/exportPaginationPage', newValue)
      },
    },
    limit: {
      get() {
        return this.$store.state.admin.faq.pagination.limit
      },
      set(newValue) {
        this.$store.commit('superadmin/faq/exportPaginationLimit', newValue)
      },
    },
    order: {
      get() {
        return this.$store.state.admin.faq.pagination.order
      },
      set(newValue) {
        this.$store.commit('superadmin/faq/exportPaginationOrder', newValue)
      },
    },
    search: {
      get() {
        return this.$store.state.admin.faq.pagination.search
      },
      set(newValue) {
        this.$store.commit('superadmin/faq/exportPaginationSearch', newValue)
      },
    },
    items() {
      return this.$store.state.admin.faq.pagination.data
    },
  },
  methods: {
    serverBaseUrl() {
      return process.env.serverBaseUrl
    },
    fetchData() {
      this.$fetch()
    },
    showImg(index, img) {
      this.lightBox.index = index
      this.lightBox.img = img
      this.lightBox.visible = true
    },
    handleHideImg() {
      this.lightBox.visible = false
    },
    previewImage() {
      if (this.newsForm.file.value != null) {
        this.newsForm.file.preview = URL.createObjectURL(
          this.newsForm.file.value
        )
      } else {
        this.newsForm.file.preview = null
      }
    },
    closeAddDialog() {
      this.addFaq.dialog = false
      this.addFaq.title = ''
      this.addFaq.description = ''
      this.$refs.add_faq_form.resetValidation()
    },
    closeEditDialog() {
      this.editFaq.dialog = false
      this.editFaq.title = ''
      this.editFaq.description = ''
      this.$refs.edit_faq_form.resetValidation()
    },
    async submitFaq(more = Boolean) {
      const validate = this.$refs.add_faq_form.validate()

      console.log(validate)

      if (!validate) {
        return
      }

      let payload = {
        title: this.addFaq.title,
        description: this.addFaq.description,
      }

      const response = await this.$store.dispatch(
        'superadmin/faq/create',
        payload
      )

      switch (response.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            titleText: 'Data berhasil disimpan',
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break

        case 400 || 422:
          Swal.fire({
            icon: 'warning',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break

        default:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break
      }

      this.fetchData()

      if (more) {
        this.addFaq.title = ''
        this.addFaq.description = ''
      } else {
        this.closeAddDialog()
      }
    },
    async openEditDialog(id) {
      const response = await this.$store.dispatch('superadmin/faq/get', id)

      switch (response.status) {
        case 200:
          let data = response.data
          this.editFaq.id = data.id
          this.editFaq.title = data.title
          this.editFaq.description = data.description
          this.editFaq.dialog = true
          break

        case 400 || 422:
          Swal.fire({
            icon: 'warning',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break

        default:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break
      }
    },
    async submitEditFaq() {
      const validate = this.$refs.edit_faq_form.validate()

      console.log(validate)

      if (!validate) {
        return
      }

      let payload = {
        id: this.editFaq.id,
        title: this.editFaq.title,
        description: this.editFaq.description,
      }

      const response = await this.$store.dispatch(
        'superadmin/faq/edit',
        payload
      )

      switch (response.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            titleText: 'Data berhasil diubah',
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break

        case 400 || 422:
          Swal.fire({
            icon: 'warning',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break

        default:
          Swal.fire({
            icon: 'error',
            titleText: response.data.message,
            confirmButtonText: 'Kembali',
            confirmButtonColor: '#42a5f5',
          })
          break
      }

      this.fetchData()
      this.editFaq.dialog = false
    },
    async destroy(id) {
      const notif = await Swal.fire({
        icon: 'warning',
        titleText: 'Apakah anda yakin ?',
        confirmButtonText: 'Hapus!',
        confirmButtonColor: '#42a5f5',
        showCancelButton: true,
        cancelButtonText: 'Batal',
      })

      if (notif.isConfirmed) {
        const response = await this.$store.dispatch(
          'superadmin/faq/destroy',
          id
        )

        switch (response.status) {
          case 200:
            Swal.fire({
              icon: 'success',
              titleText: 'Data berhasil dihapus',
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })
            break

          case 400 || 422:
            Swal.fire({
              icon: 'warning',
              titleText: response.data.message,
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })
            break

          default:
            Swal.fire({
              icon: 'error',
              titleText: response.data.message,
              confirmButtonText: 'Kembali',
              confirmButtonColor: '#42a5f5',
            })
            break
        }
      }

      this.fetchData()
    },
  },
  async fetch() {
    await this.$store.dispatch('superadmin/faq/pagination', {
      page: this.page,
      limit: this.limit,
      order: this.order,
      search: this.search,
    })
  },
  mounted() {
    this.fetchData()
  },
}
</script>
